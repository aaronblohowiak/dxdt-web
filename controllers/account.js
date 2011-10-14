fs = require("fs");
var formulate = require("formulate");
var passwords = require("../lib/passwords.js");
var Cookies = require("cookies");
var sha1 = require("easyhash")('sha1');

module.exports = function(routes, Transitive){
  function renderAccount(res, template, locals){
    res.end(Transitive.Views.renderPage(template, locals));
  }
  
  status = JSON.parse(fs.readFileSync(Transitive.options.root+"/status.json"));

  var sessions = require("../lib/session")(Transitive.App.sessionsClient);
  var accounts = Transitive.App.accountsClient;

  function withSession(req, res, cb){
    sessions.withSession(req, res, function(err, session){
      if(Object.keys(session).length===0){
        res.writeHead(403, {
          'Content-Type': 'text/html', 
        });

        res.end(Transitive.Views.renderPage("account/login", {}, "minimal_layout"));
      }else{
        req.session = session;
        cb(req, res);
      }
    });
  }  
    
  function get(url, cb){
    routes.get(url, function(req, res){
      withSession(req, res, cb);
    });
  }

  get("/account/first", function(req, res){    
    renderAccount(res, "account/first", { status:status });
  });
  
  routes.get("/account", function(req, res){
    renderAccount(res, "account", {status:status});
  });
  
  routes.get("/environments/1", function(req, res){
    renderAccount(res, "environment/environment", {status:status});
  });
  
  routes.get("/server/123", function(req, res){
    renderAccount(res, "server/server", {status:status});
  });
  
  routes.get("/server/123/networking", function(req, res){
    renderAccount(res, "server/networking", {status:status});
  });
  
  routes.get("/process", function(req, res){
    renderAccount(res, "process", {status:status});
  });
  
  routes.post("/login", function(req, res){
    formulate(req, res, function(err, fields){
      accounts.get("/users/byemail/"+sha1(fields.email.toLowerCase()), function(err, id){
        accounts.hgetall(id, function(err, user){
          passwords.check(fields.password, user.password, function(err, matches){
            if(matches){
              sessions.createSession(req, res, {
                  user: user.id
                }, function(err){
                res.writeHead(302, {
                  'Content-Type': 'text/html',
                  'Location': '/account'
                });
                res.end("Thanks, redirecting to your account.");
              });
            }else{
              res.end("byeeeeeee");
            }
          });
        });
      });
    }, 10);

    //maybe i should use access tokens!
    // console.log("account", account);
    // createToken({
    //   account: account.id,
    //   user: user.id,
    //   level: "admin",
    //   ttl: 60 * 60 // one hour
    // });
  });
};