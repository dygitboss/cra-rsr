## CRA + Redux + Saga + Saga Requests implementation
This is a basic example of CRA application with some useful tools:

- `redux` for global store. React Context seems much more difficult to use rather that redux
- `redux-saga` for managing redux actions
- `redux-saga-requests` is for managing 'request' actions to convert them into API call and dispatch three possible
 variations of dispatched request action: <br/>
  -- `SUCCESS` - successful request <br/>
  -- `ERROR` - failed request <br/>
  -- `ABORT` - canceled request
- `redux-saga-requests-axios` is axios driver for redux-saga-requests
- `redux-thunk` to convert actions into promises, really useful in combination with request actions
- `reselect` lib for advanced selectors implementation, usually not needed but required peer dep of redux-saga-requests

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
