# asynchExpress

Simple Node/Express app to demonstrate calling an asyncronous function (like a http get or db lookup) in an express middleware function and setting a returned value in the request object so that all routes will have access to it.

## Other cool stuff

1. Uses ES6 via Babel
2. Uses Flow for type checking
3. Uses Jest for tests (even snapshot tests a JSON return value)
4. Uses Eslint

Let me know if you dig it :-)

## Quick start

This project was built with Node.js v9.3 and Yarn. If you have those installed, you should be able to run the following to get started:

```
git clone https://github.com/adamwysocki/asyncExpress.git
cd asyncExpress
yarn
```

## Available scripts

Run `yarn <script>`

* `build` - run bable and build the final app
* `coverage` - run test coverage
* `lint` - run linter
* `start` - run the server
* `test` - run the tests
* `typecheck` - run flow
