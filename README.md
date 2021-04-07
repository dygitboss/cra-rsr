## Create React App + Redux + Redux Requests boilerplate
This is a basic example of CRA application with some useful tools:

- `redux` for global store. React Context seems much more difficult to use rather that redux
- `@redux-requests/core` is for managing 'request' actions to convert them into API call and dispatch three possible
  variations of processed request action: <br/>
  -- `SUCCESS` - successful request <br/>
  -- `ERROR` - failed request <br/>
  -- `ABORT` - canceled request
- `@redux-requests/axios` is axios driver for redux-saga-requests
- `redux-thunk` to convert actions into promises, really useful in combination with request actions
- `reselect` lib for creating advanced memoized selectors, required peer dep of `@redux-requests/core`

## How to setup?

- Clone repo
- `npm i -g yarn`
- `yarn`

You can find node and npm versions in `package.json`

## How to run application?

1. Development:
    - `yarn start`
2. Production:
    - `yarn build` to build a production app and serve it with any HTTP server you like
