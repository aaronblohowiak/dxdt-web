fs = require("fs");

var accounts = require("redis").createClient(1337);

var Transitive = new (require("transitive"))();

var options = {};

//for nginx gzipping
var mime = require("mime");
mime.extensions.js = "text/javascript";


if(process.env["NODE_ENV"] == "production"){
  
  options.port = 443;
  
  console.log(Transitive.boot);
  
  var parse = require('url').parse;
  require("http").createServer(function(req, res){
     res.writeHead(301, {
       'Content-Type': 'text/plain', 
       'Location':'https://'+req.headers.host+req.url,
       "Strict-Transport-Security": "max-age=604800"});
     res.end('Redirecting to SSL\n');
  }).listen(80);
  
  
  options.server = Transitive.connect.createServer({
    key: fs.readFileSync('ssl/dxdt.io.key'),
    cert: fs.readFileSync('ssl/dxdt.io.crt'),
    ca: fs.readFileSync('ssl/gd_bundle.crt')
  });
  
}


//boot transitive, compiling everything and creating server 
(function(){
  Transitive.boot(this, options);
})();


Transitive.App = {
  accountsClient: accounts
};

console.log("Server started. listening on port " + Transitive.server.address().port);
