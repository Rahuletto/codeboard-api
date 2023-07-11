/**
 * Access the future of code sharing platform with this first-party wrapper
 *
 * @export
 * @class CodeBoard
 * @typedef {CodeBoard}
 */
export declare class CodeBoard {
    /**
     * The API Key used to access the privileged endpoints like `save` and `fetch`.
     *
     * @private
     * @type {string}
     */
    private key;
    baseUrl: string;
    /**
     * Creates an instance of CodeBoard used to access all of the api.
     *
     * @constructor
     * @param {string} key The API Key. Can be generated from `/accounts` page
     */
    constructor(key: string);
    /**
     * ## `Only used by internal methods`
     * This function is used to validate a API Key whether its valid or not.
     *
     * @private
     * @async
     * @returns {Promise<boolean>}
     */
    private validate;
    /**
     * Get the ping latency of the api.
     * - Returns `One-way travel` API --> Client
     * - Multiply by 2 if you need `Two-way travel` Client <--> API
     *
     * @async
     * @returns {Promise<number>}
     */
    ping(): Promise<number>;
    /**
     * Im a teapot
     * A very old developers april joke. We won't let it fade away `;)`
     *
     * @async
     * @returns {Promise<"Im a teapot">}
     */
    teapot(): Promise<"Im a teapot">;
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
    fetch(id: string): Promise<FetchBody>;
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
    save(body: SaveBody): Promise<SaveResponse>;
}
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
declare type SaveBody = {
    name: string;
    description?: string;
    files: BoardFile[];
};
/**
 * Response body of Save endpoint
 *
 * @typedef {SaveResponse}
 */
declare type SaveResponse = {
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
declare type FetchBody = {
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
    status: number;
};
export {};
