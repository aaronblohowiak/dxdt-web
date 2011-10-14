fs = require("fs");

var accounts = require("redis").createClient(1337);
accounts.auth("3BBaMhMnc6CiD0ndPTkWdi0DX0IdnUwYfIbYbjFR1ku1cboRgHjwPZmWtYkAtlvjLiJUUYEYumU2t6pnslg1kn4v0hQNU3LXMsyAnKRlJrqJHNPAPU3P7LR6bl8Nt8mH4cHGo6ge7ccarBHNiApQaXuFgM4QOVdu3iz62sqGElDRAVlmZNvDsdFdztsiLx2gkO9oCrRVMdFNfLBOIOqSnTxjcMya0Zb7X0IfFvrjhuFF8s6ZzD54wQIJXGKj8EPbelh1w5TLSGqtingmuL4IGiJ7gS81sVtGIrZbBJYvB9QKxB1MSznUn4pgTw5x1sdTIGBI5UCo82JWOmg3lJQzbn3D6Nc1kAey2j3gxhhCRwFIZ14A5bcSU7SqXEO1iSkJvy0joWG6IwCT48Dy1ZEbcYmbeDnNG3L7dHsuLKAiEpvDSWCJlCyjAg6U9okXCOEj7lDzUeqb0XuJFbFHPgueGkEOD2UqqoSW8bD9giXlMIljvs52aCH2k7vVosx5S3SSVAygxBnRhCMK8TrbnhH6caC5UIzs7RDNIKPvKCa6UwgvSizunsZPJCtZUHueD4m7BCbL01JyIPJayVqfygDzIdd3PNlYKfow1g4caHYCVdSop60qHgOBr39UVB3sDHhQir6n70e8GaSE0k6hOyP3v8VnkkVrZe4jiDkz5CYzxHN1hgr3vnk1xhbgoZytGsnuYRixzwti1FsDpUePfz9QIRy05fU24Q653YLtyH9wJJtaf38nrlVfl3WjofqR3FR9jLK0WrbA0IFJkOR8op9XTmF2OKTpGhGhUuabiFiYsnUXLmAhfzHwZXBgJVJqacjQ2L0LsekrN9J9eeiAI2kUPDrMaPpmjhXaJ2P5YjbJttaHeDt4r1goQDkPgnZMOLZqaow3NXA2PG1SNSHFjxG6LE8jrGWcVB8P0SISeubsucZfnPku71ssQBSZOpNwGYBFozSb4iN2kRNZCX6guudM49v7D2ad5Px3op069ajsD");

var sessions = require("redis").createClient(1338);
sessions.auth("Gr6rLxtXRzIOJjlRTkrND671YtndJIIxg3dV7F3LEQFqIIEv9Gxqx2MYxO2o4FbdjUI5sO8biTbNYYCnWsoRQBXxHvEXGrHDvQ7bk35POKJEHdmZxwkygCYIVagbTl7NqLsGJ1yIweBcB01EYbwhNC1wADQGcRB7XZpTijFM1jC85LRPJVLtS01hH9daAegXmimUqS7kGPiJd8tXP3t8DAAC79Ano2r6oBdgpSjoeH4WM6IY0YO9bQwOD8FdHt35JNWiPPQSdsKF0VRNYpUPQY1hrcs183XoUmVSmndUGxEULxCS6QrAMEh0AkS6SVrDH3wkKpOP3KY1uJ2s3i3DEKyEiF2H8yOhCl23PFSttrtSRTUplBLNLEvSFcC635cyu9BkU7u1daKWG8bje8rq1efdt0TmmgFtdPUAgCftxKYIK1ERamSIrm85f3pQKIi7DLTvOS6KC9kdXxdTCaVxRXqQhgpOFxgZYRjEYQYQtYEQTh7dZ4QwcLjVFf4NhI05a0vDPxZLEcGYpcObZgTe79rNTQcypZEoJp1vYgk3l8OVBHzPp3aTgF4Fj1fxezzdfZWfbPzX0qTVNzBC328FIPH6UhB7FuaZ6cN8Zgtf45LtDJQxgzi9FXAIbV7fHkmVVlA7BOYGVnLsmJ0nm2aRQ3EiBA3i340G32EqxGVvarLlLjywpnbXCNNgiGkXw9IowXmiXJS7NUUAr5qvl9NyxLGGSUO7w0LVDlw4OeLYA34Spp0ZFmW7FpR4S1dlAigBKbWIhtLf3rDrjjTY694O0G9Ym2xzn6kgw8CWH5UrAeaYRaeWzJQ5ix1q5kUiqkaaBFNy56AJWea2y6q0iYSg81dKNnLMpS53oI1nL3QVKV4h1ZftYEXDoMDjPoE9CvrgJmG4AckhejjDvf5mmmJYjmDKvMBXW67hqO04fwepdTnFZVHwXHuc04P0GPcD8sOXVWActNmGMlETAk9DUvqVCKR9og4uYt0btjFtr1ze0");

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
    sessionsClient: sessions
  };

  Transitive.boot(this, options);
})();

console.log("Server started. listening on port " + Transitive.server.address().port);
