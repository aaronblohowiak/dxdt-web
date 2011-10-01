var exec = require('child_process').exec;

var Transitive = new (require("transitive"))();

var options = {};

//for nginx gzipping
var mime = require("mime");
mime.extensions["js"]="text/javascript";


if(process.env["NODE_ENV" == "production"]){
  options.port = 80;
}


//boot transitive, compiling everything and creating server 
(function(){
  Transitive.boot(this, options);
})();


Transitive.App = {};

console.log("Server started. listening on port " + Transitive.server.address().port);
