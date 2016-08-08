# A simple example of nodejs api with authentication

### Tech stack
* **nodejs** - javascript runtime built on v8 engine
* **express** - minimalistic web api framework for nodejs
* **body-parser** - middleware for body parsing
* **morgan** - middleware for logging
* **jsonwebtoken** - jwt implementation for nodejs

### Getting started
* clone repo and `npm install`
* in the project directory, run either `node` or `node index.js`
* *optional:*
    * use **nodemon** to monitor for changes in your nodejs app and automatically restart the server
    * `npm install -g nodemon`
    * in the project directory run either `nodemon` or `nodemon index.js`

### Trying the APIs and authentication scenarios
* launch the browser and point to the baseurl `localhost:8081`
* access the unsecure api `/metacortex`
* everything behind `/api` is secure
* try accessing the secure api `/api/levrai`
* obtain a JWT token here `/authenticate.html`
    * enter application name(brutus) and password(winning)
    * the credentials are in a config file but you can pull from a DB as well
    * the response contains the JWT token (expiry is set to 60 seconds)
* when calling the secure api `/api/levrai`:
    * add the `Authorization` request header and set the jwt token from the previous step, like so
    * Authorization: Bearer \<token\>
