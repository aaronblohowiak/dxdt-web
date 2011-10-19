fs = require("fs");
var redis = require("redis").createClient;

var dxdtConf = JSON.parse(fs.readFileSync("/etc/dxdt.conf"));

var accountConf = dxdtConf.dbs.accounts;
var accounts = redis(accountConf.port, accountConf.host);
accounts.auth(accountConf.password);

var sessionConf = dxdtConf.dbs.sessions;
var sessions = redis(sessionConf.port, sessionConf.host);
sessions.auth(sessionConf.password);

var resqueConf = dxdtConf.dbs.workQueue;
resqueConf.timeout = 50;
var workQueue = require('coffee-resque').connect(resqueConf); //ideally, this would be optional.

var provConf = dxdtConf.dbs.provisioner;
var provisions = redis(provConf.port, provConf.host);
provisions.auth(provConf.password);

var provisioner = require("./lib/provisioner-client");
provisioner.provisionerdb = provisions;
provisioner.resque = workQueue;

var Transitive = new (require("transitive"))();

var options = {};

//for nginx gzipping
var mime = require("mime");
mime.extensions.js = "text/javascript";


if(process.env.NODE_ENV == "production"){
  
  options.port = 443;
  
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
  Transitive.App = {
    accountsClient: accounts,
    sessionsClient: sessions,
    workQueueClient: workQueue,
    provisionsClient: provisions,
    provisioner: provisioner,
    hostnames: dxdtConf.hostnames
  };

  Transitive.boot(this, options);
})();

console.log("Server started. listening on port " + Transitive.server.address().port);
