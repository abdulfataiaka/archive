const Handle = require('./handle');
const Router = require('./router');
const assist = require('./assist');
const server = require('./server');
const base = require('../helper/base');
/**
 *
 * 
 * @description server application for venum
 *
 * @name Server
 * 
 */
class Server {
  /**
   * @description creates an instance of Server.
   * 
   * @memberof Server
   * 
   * @param { None }
   * 
   * @returns { this }
   * 
   */
  constructor() {
    this.config = {
      base: null,
      host: '127.0.0.1',
      port: 3000,
      assets: [],
      router: null
    }

    this.logs = [];
  }

  /**
   *
   * 
   * @description update default config
   *
   * @param { Object } config
   * 
   * @returns { None }
   * 
   * @memberof Server
   * 
   */
  setup(config) {
    const logs = assist.config(config);

    //++ update error log array
    if (logs.length !== 0) {
      this.logs = this.logs.concat(logs);
      return false;
    }
    
    //++ update default configurations
    let key;
    let value;
    for(key in config) {
      value = config[key];
      this.config[key] = value;
    }

    return true;
  }

  /**
   *
   * 
   * @description setup a router
   *
   * @param { Array } routes
   * 
   * @returns { None }
   * 
   * @memberof Server
   * 
   */
  router(routes) {
    //++ setup routes as router class
    if (!base.isarr(routes)) return;
    const router = new Router();
    router.pushall(routes);
    this.config.router = router;
  }

  /**
   *
   * 
   * @description listen for request
   *
   * @param { None }
   * 
   * @returns { None }
   * 
   * @memberof Server
   * 
   */
  listen(host, port) {
    const handler = new Handle(this.config);
    server.use((request, response) => {
      handler.respond_to_request(request, response);
    });
  
    server.listen(port, host, () => {
      console.log(`\nServer started at http://${host}:${port}\n`);
    });
  }

  /**
   *
   * 
   * @description start the server
   * 
   * @param { None }
   * 
   * @returns { None }
   *
   * @memberof Server
   * 
   */
  start() {
    const { base, host, port } = this.config;
    assist.startup(host, port);
    if (this.logs.length > 0) {
      assist.logerr('Setup error log', this.logs);
    }

    assist.checkfatal({ base: base });
    this.listen(host, port);
  }
}

module.exports = Server;
