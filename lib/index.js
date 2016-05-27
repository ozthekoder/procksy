var http = require('http');
var Procksy = (function() {
  function Procksy(config) {
    this.config = config;
    this.server = null;
    if (this.config.server) {
      this.server = http.createServer(this.proxy.bind(this));
    }
    this.proxyReq = null;
    this.headers = {};
  }

  Procksy.prototype.proxy = function(req, res) {
    req.pipe(this.prepareProxyReq(req, res));
  };

  Procksy.prototype.prepareProxyReq = function(req, res) {
    this.prepareProxyHeaders(req.headers);

    return proxyReq = http.request(
      {
        hostname: this.config.host,
        port: this.config.port,
        path: req.url,
        method: req.method,
        headers: req.headers
      },
      function (response) {
        res.writeHead(response.statusCode, response.headers);
        response.pipe(res);
      }
    );
  };

  Procksy.prototype.prepareProxyHeaders = function(headers) {
    var keys = Object.keys(headers);
    for(var i=0; i< headers.length; i++) {
      if (this.headers.add[keys[i]]) {
        headers[keys[i]] = this.headers.add[keys[i]];
      } else if (this.headers.remove[keys[i]]) {
        delete headers[keys[i]];
      }
    }
  };


  Procksy.prototype.addRequestHeaders = function(headers) {
    var keys = Object.keys(headers);
    for(var i=0; i< headers.length; i++) {
      this.headers.add[keys[i]] = headers[i];
      delete this.headers.remove[keys[i]];
    }
  };

  Procksy.prototype.removeRequestHeaders = function(headers) {
    var keys = Object.keys(headers);
    for(var i=0; i< headers.length; i++) {
      this.headers.remove[keys[i]] = true;
      delete this.headers.add[keys[i]];
    }
  };

  Procksy.prototype.listen = function(port, cb) {
    if(this.server) {
    this.server.listen(port, cb);
    } else {
      cb(new Error('No server found.'));
    }
  };

  return Procksy;

})();

module.exports = Procksy;

