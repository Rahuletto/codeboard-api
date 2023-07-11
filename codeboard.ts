import { https } from "simply-https";
import { APIError } from "./APIError";

/**
 * Access the future of code sharing platform with this first-party wrapper
 *
 * @export
 * @class CodeBoard
 * @typedef {CodeBoard}
 */
export class CodeBoard {
  /**
   * The API Key used to access the privileged endpoints like `save` and `fetch`.
   *
   * @private
   * @type {string}
   */
  private key: string;
  baseUrl: string;

  /**
   * Creates an instance of CodeBoard used to access all of the api.
   *
   * @constructor
   * @param {string} key The API Key. Can be generated from `/accounts` page
   */
  constructor(key: string) {
    if (!key)
      throw new APIError({
        function: "fetch",
        error: "Provide an API Key ! Received undefined",
      });

    this.key = key;
    this.baseUrl = "https://codeboard-git-supabase-rahuletto.vercel.app";
  }

  /**
   * ## `Only used by internal methods`
   * This function is used to validate a API Key whether its valid or not.
   *
   * @private
   * @async
   * @returns {Promise<boolean>}
   */
  private async validate(): Promise<boolean> {
    try {
      const res = await https(`${this.baseUrl}/api/validate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.key,
        },
      });

      if (res.status == 200) return res.valid;
      else throw new Error();
    } catch {
      throw new APIError({
        function: "Generic",
        error: `Invalid API Key ! Get your api key in\n\x1b[35m${this.baseUrl}/account\x1b[0m`,
      });
    }
  }

  /**
   * Get the ping latency of the api.
   * - Returns `One-way travel` API --> Client
   * - Multiply by 2 if you need `Two-way travel` Client <--> API
   *
   * @async
   * @returns {Promise<number>}
   */
  async ping(): Promise<number> {
    try {
      const start = Date.now();
      await https(`${this.baseUrl}/api/ping`, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "private, must-understand, max-age=600",
        },
      });
      return Math.ceil((Date.now() - start) / 2);
    } catch (err: any) {
      throw new APIError({
        function: "ping",
        error: err.message,
      });
    }
  }

  /**
   * Im a teapot
   * A very old developers april joke. We won't let it fade away `;)`
   *
   * @async
   * @returns {Promise<"Im a teapot">}
   */
  async teapot(): Promise<"Im a teapot"> {
    try {
      const res = await https(`${this.baseUrl}/api/teapot`, {
        method: "GET",
        headers: { "Content-Type": "text/plain" },
      });
      return res;
    } catch (err: any) {
      throw new APIError({
        function: "teapot",
        error: err.message,
      });
    }
  }
  
  /**
   * Fetch a board from the CodeBoard with a board id
   *
   * - Optional: `API Key` - will return a encrypted mess if not provided
   *
   * - ### Ratelimits: `40` per minute
   *
   * @async
   * @param {string} id The board id to fetch from our database
   * @returns {Promise<FetchBody>} The Board object
   */
  async fetch(id: string): Promise<FetchBody> {
    try {
      const res = await https(`${this.baseUrl}/api/fetch?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "private, must-understand, max-age=600",
          Authorization: this.key,
        },
      });
      res.url = `${this.baseUrl}/bin/${res.key}`;
      return res;
    } catch (err: any) {
      throw new APIError({
        function: "fetch",
        error: err.message,
      });
    }
  }

  /**
   * Save a board to the CodeBoard
   *
   * - ### Requires: `API Key`
   * - ### Ratelimits: `20` per minute
   *
   * @async
   * @param {SaveBody} body The Board object to save to our database.
   * @returns {Promise<SaveResponse>}
   */
  async save(body: SaveBody): Promise<SaveResponse> {
    await this.validate();

    try {
      if (
        !body ||
        !body.name ||
        !body.description ||
        !body.files ||
        !body.files[0]
      )
        throw new Error(
          "Provide a valid body. The one you've provided is invalid !"
        );
      for (let i = 0; i < body.files.length; i++) {
        if (!body.files[i].language || !body.files[i].name || !body.files[i].value)
          throw new Error(
            `Provide a valid file. The one you've provided is invalid !. \x1b[31mFile index: ${i}\x1b[0m`
          );
      }

      const res = await https(`${this.baseUrl}/api/save`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: this.key,
        },
        body: body,
      });

      res.url = `${this.baseUrl}${res.board}`

      return res;
    } catch (err: any) {
      throw new APIError({
        function: "save",
        error: err.message,
      });
    }
  }
}

// TYPES -------------------------------

/**
 * Files in a board. Useful for Save endpoint
 *
 * ## Limit of `2 files` per board
 *
 * @interface BoardFile
 * @typedef {BoardFile}
 */
interface BoardFile {
  name: string;
  language: string;
  /**
   * The program (code-snippet) shown in the specific file
   *
   * @type {string}
   */
  value: string;
}

/**
 * Request body of Save endpoint
 *
 * @typedef {SaveBody}
 */
type SaveBody = {
  name: string;
  description?: string;
  files: BoardFile[];
};

/**
 * Response body of Save endpoint
 *
 * @typedef {SaveResponse}
 */
type SaveResponse = {
  message: string;
  board: string;
  status: number;
  created: boolean;
  url: string;
};

/**
 * Response body of Fetch endpoint (Board Object)
 *
 * @typedef {FetchBody}
 */
type FetchBody = {
  name: string;
  description: string;
  files: BoardFile[];
  url: string;
  key: string;
  createdAt: number;
  encrypted: boolean;
  autoVanish: boolean;
  fork: {
    status: boolean;
    key: string;
    name: string;
  };
  author?: string | null;
  bot: boolean;
  status: number; // HTTP Status Code
};
// TYPES -------------------------------
