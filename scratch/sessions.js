var fs = require("fs");

var redis = require("redis").createClient;

var dxdtConf = JSON.parse(fs.readFileSync("/etc/dxdt.conf"));
var accountConf = dxdtConf.dbs.accounts;
var accounts = redis(accountConf.port, accountConf.host);
accounts.auth(accountConf.password);

var deref = fs.readFileSync("../lib/redis-scripts/deref.lua");

accounts.eval(deref, 1, "/users/ip91dMxZULkFEfGEc5an41", "accountId", function( err, data){
  console.log(arguments);
});

setTimeout(function(){
  process.exit();
}, 50)