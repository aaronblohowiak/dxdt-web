var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('dxdt.io.key'),
  cert: fs.readFileSync('dxdt.io.crt')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);