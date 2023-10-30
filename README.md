# Fetch with concurrent limitation

This is a work in progress attempt at building a fetch wrapper that can limit the number of concurrent requests.

Though implemented here in a react application, it is agnostic to the framework used.

The FetchConcurrently class is located in `src/utils/FetchConcurrently.ts`.

## Installation
```bash
pnpm i -g json-server
```

## Usage

In two separate terminals, run:
```bash
pnpm run json
```
```bash
pnpm run dev
```