## A simple example of nodejs api with express and jwt authentication

### tech stack
* **nodejs** - javascript runtime built on v8 engine
* **express** - minimalistic web api framework for nodejs
* **body-parser** - middleware for body parsing
* **morgan** - middleware for logging
* **jsonwebtoken** - jwt implementation for nodejs

### getting started
* clone repo and `npm install`
* in the project directory, run either `node` or `node index.js`
* *optional:*
    * use **nodemon** to monitor for changes in your nodejs app and automatically restart the server
    * `npm install -g nodemon`
    * in the project directory run either `nodemon` or `nodemon index.js`

### api and authentication scenarios
* launch the browser and point to the baseurl `localhost:8081`
* access the unsecure api `/metacortex`
* everything behind `/api` is secure
* try accessing the secure api `/api/megacity`
* obtain a JWT token here `/authenticate.html`
    * enter program name:password (neo:keanu or morpheus:laurence)
    * the response contains a JWT token for that program (expiry is set to 60 seconds)
* use the token when calling secure api:
    * add the `Authorization` request header and set the jwt token, like so:
    * Authorization: Bearer \<token\>
* `/api/megacity` can be accessed with any valid token but `/api/levrai` can only be accessed with neo's token
