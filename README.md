# ⚡ @codeboard/api

API Wrapper of The future of code sharing platform.

> Codeboard is an open source code sharing platform thats better in every way.
> https://cdeboard.vercel.app/docs

## Why @codeboard/api ?

- First-party API Wrapper (Made by the same dev as CodeBoard)
- Much Efficient
- Easier approach
- Type safe
- Better Intellisense

## Documentation

> All Class functions/methods returns a Promise so you should await it and should be located inside an `async` function. Or your project should be configured to [`top-level await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)

### Summary

- [new CodeBoard()](#codeboard) (Class)
- - [ping()](#codeboard.ping)
- - [teapot()](#teapot)
- - [save()](#save)
- - [fetch()](#fetch)

---

## CodeBoard

Access the future of code sharing platform with this first-party wrapper

```js
const { CodeBoard } = require("@codeboard/api");

const board = new CodeBoard("API_KEY");
```

- Required: `API_KEY`

The API Key used to access the privileged endpoints like `save` and `fetch`. Get [your key here](https://cdeboard.vercel.app/account)

### Types

```ts
new CodeBoard(key: string): CodeBoard
```

---

## CodeBoard.ping()

Get the ping latency of the api.

- Returns `One-way travel` latency [API --> Client]
- Multiply the return value by 2 if you need `Two-way travel` latency [Client <--> API]

```js
const { CodeBoard } = require("@codeboard/api");

const board = new CodeBoard("API_KEY");

await board.ping();
```

> This returns a Promise so you should await it and should be located inside an `async` function. Or your project should be configured to [`top-level await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)

### Types

```ts
async ping(): Promise<number>
```

---

## CodeBoard.teapot()

Im a teapot

A very old developers april joke. We won't let it fade away `;)`

```js
const { CodeBoard } = require("@codeboard/api");

const board = new CodeBoard("API_KEY");

await board.teapot();
```

> This returns a Promise so you should await it and should be located inside an `async` function. Or your project should be configured to [`top-level await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)

### Types

```ts
async teapot(): Promise<"Im a teapot">
```

---

## CodeBoard.save()

Save a board to the CodeBoard

- #### Requires: `API Key`
- #### Ratelimits: `20` per minute

```js
const { CodeBoard } = require("@codeboard/api");

const board = new CodeBoard("API_KEY");

await board.save({
  name: "BOARD_NAME",
  description: "BOARD_DESC",
  files: [
    {
      name: "FILE_NAME",
      language: "FILE_LANGUAGE_IN_FULLNAME",
      value: "CODE_SNIPPET",
    },
  ],
});
```

> This returns a Promise so you should await it and should be located inside an `async` function. Or your project should be configured to [`top-level await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)

### Types

```ts
async save(body: SaveBody): Promise<SaveResponse>
```

- #### SaveBody

```ts
{
  name: string;
  description?: string;
  files: BoardFile[];
}
```

- #### SaveResponse

```ts
{
  message: string;
  board: string;
  status: number;
  created: boolean;
  url: string;
}
```

---

## CodeBoard.fetch()

Fetch a board from the CodeBoard with a board id

- #### Optional: `API Key` - will return a encrypted mess if not provided
- #### Ratelimits: `40` per minute

```js
const { CodeBoard } = require("@codeboard/api");

const board = new CodeBoard("API_KEY");

await board.fetch("BOARD_ID");
```

> This returns a Promise so you should await it and should be located inside an `async` function. Or your project should be configured to [`top-level await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)

### Types

```ts
async fetch(id: string): Promise<FetchBody>
```

- #### FetchBody

```ts
{
  name: string;
  description: string;
  files: BoardFile[]; // BoardFile type shown below
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
}
```

- #### BoardFile

```ts
{
  name: string;
  language: string;
  value: string;
}
```

---

# Support
https://cdeboard.vercel.app/support
Let's build a better community, together.