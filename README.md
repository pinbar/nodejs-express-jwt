## A simple example of nodejs api with express and jwt authentication

[![CircleCI](https://circleci.com/gh/pinbar/nodejs-express-jwt.svg?style=svg)](https://circleci.com/gh/pinbar/nodejs-express-jwt) 

[![Test Coverage](https://codeclimate.com/github/pinbar/nodejs-express-jwt/badges/coverage.svg)](https://codeclimate.com/github/pinbar/nodejs-express-jwt/coverage)  [![Code Climate](https://codeclimate.com/github/pinbar/nodejs-express-jwt/badges/gpa.svg)](https://codeclimate.com/github/pinbar/nodejs-express-jwt)  [![Issue Count](https://codeclimate.com/github/pinbar/nodejs-express-jwt/badges/issue_count.svg)](https://codeclimate.com/github/pinbar/nodejs-express-jwt)

### tech stack
* **nodejs** - javascript runtime built on v8 engine
* **express** - minimalistic web api framework for nodejs
* **body-parser** - middleware for body parsing
* **morgan** - middleware for http request/response logging
* **jsonwebtoken** - jwt implementation for nodejs
* **crypto** - cryptography module for nodejs
* **jasmine** - testing framework
* **jasmine-reporters** - test result reporters (using JUnit reporter for CircleCI)
* **istanbul** - module for test instrumentation and coverage
* **request** - module for testing end-points

### getting started
* clone repo and `npm install`
* in the project directory, run `node index.js`
* launch the browser and point to the baseurl `localhost:8081` (port can be changed in `config.js`)
* *optional:*
    * use **nodemon** to monitor for changes in your nodejs app and automatically restart the server
    * if you don't have nodemon, install it globally `npm install -g nodemon`
    * in the project directory run `nodemon`

### running tests
* tests are in the `spec` directory, which includes both `unit` and `integration` tests
* to run all the tests, run `npm test` in the project directory
* to run a single test, mark it with `fit` (use `fdescribe` to include the entire spec)
* to exclude a test, mark it with `xit` (use `xdescribe` to exclude the entire spec)
* **test coverage:** 
    * to run instrumented code and generage coverage reports, run `npm run test-with-coverage`
    * coverage reports are in `reports/coverage` directory (can be configured in `.istanbul.yml`)
* **reporter** runs a jasmine helper to produce JUnit formatted test results in `reports/junit`

### api and authentication scenarios
* access the unsecure api `GET /metacortex`
* all `/api/*` calls are secured with JWT authentication
* try accessing the secure api `GET /api/megacity` to see an auth error
* obtain a JWT token here `POST /authenticate.html`
    * enter program name:password (neo:keanu or morpheus:laurence)
    * the response contains a JWT token for that program
* use the token when calling any secure api (`/api/*`):
    * set the `Authorization` request header and add the jwt token, like so:
    * `Authorization: Bearer \<token\>`
* `GET /api/megacity` can be accessed with any token but `GET /api/levrai` can only be accessed with neo's token
* some information in the payload is encrypted for privacy

### chaos
* a middleware that introduces `500 - Internal Server Error` errors randomly for any `/oracle/*` api call
* this _chaos_ can be seen:
    * by repeatedly accessing `GET /oracle/choice` or 
    * by running this test: `/spec/integration/apiChaosSpec.js`
