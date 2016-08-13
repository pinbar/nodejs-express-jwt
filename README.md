## A simple example of nodejs api with express and jwt authentication

### tech stack
* **nodejs** - javascript runtime built on v8 engine
* **express** - minimalistic web api framework for nodejs
* **body-parser** - middleware for body parsing
* **morgan** - middleware for logging
* **jsonwebtoken** - jwt implementation for nodejs
* **crypto** - cryptography module for nodejs
* **node-jasmine** - jasmine tests for nodejs
* **request** - request module for testing nodejs/express end-points

### getting started
* clone repo and `npm install`
* in the project directory, run `node index.js`
* launch the browser and point to the baseurl `localhost:8081`
* *optional:*
    * use __nodemon__ to monitor for changes in your nodejs app and automatically restart the server
    * if you don't have nodemon, install it globally `npm install -g nodemon`
    * in the project directory run `nodemon`

### running tests
* to run all the tests, `npm test` in the project directory
* to run a single test, `./node_modules/jasmine-node/bin/jasmine-node <dir/file>`
* to run all unit tests, `./node_modules/jasmine-node/bin/jasmine-node spec/unit`
* to run all integration/api tests, `./node_modules/jasmine-node/bin/jasmine-node spec/integration`
* *note:* you need to have the server/app running in order to run integration tests 

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
* this _chaos_ can be seen by repeatedly accessing `GET /oracle/choice`
