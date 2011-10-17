fs = require("fs");
var formulate = require("formulate");
var passwords = require("../lib/passwords.js");
var Cookies = require("cookies");
var sha1 = require("easyhash")('sha1');
var timeseries = require("../lib/timeseries-db");

module.exports = function(routes, Transitive){
  function renderAccount(res, template, locals){
    res.end(Transitive.Views.renderPage(template, locals));
  }
  
  status = JSON.parse(fs.readFileSync(Transitive.options.root+"/status.json"));

  var sessions = require("../lib/session")(Transitive.App.sessionsClient);
  var accounts = Transitive.App.accountsClient;
  var provisions = Transitive.App.provisionsClient;

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

  toArray = Array.prototype.slice;

  function ccb(fn1, fn2){
    return function(){
      var ary = toArray.call(arguments);
      ary.push(fn2);
      fn1.call(null, ary);
    }
  };

  function withAccount(req, res, cb){
    withSession(req, res, function(req, res){
      accounts.hgetall(req.session.user, function(err, user){
        if(err) req.fail("could not load user");
        accounts.hgetall(user.accountId, function(err, account){
          if(err) req.fail("could not load account");
          req.user = user;
          req.account = account;
          cb(req, res);
        });

      });

    });
  }

  function get(url, cb){
    routes.get(url, function(req, res){
      withAccount(req, res, cb);
    });
  }

  function withTsDb(id, cb){
    provisions.hgetall(id, function(err, dbInfo){
      timeseries.createClient(dbInfo, cb);
    });  
  }

  var smemhashes_lua = fs.readFileSync(__dirname+"/../lib/redis-scripts/smemhashes.lua", "utf-8");
  function smemhashes(client, key, cb){
    client.eval(smemhashes_lua, 1, key, function(err, smemhash){
      if(err) return cb(err);
      var objects = {};
      var id;
      for (var i=0; i < smemhash.length; i++) {
        id = smemhash[i][1];
        objects[id] = {};
        for (var j=2; j < smemhash[i].length; j=j+2) {
          objects[id][smemhash[i][j]] = smemhash[i][j+1]
        };
      };
      cb(null, objects);
    }); 
  }

  
  function withEnvironments(client, cb){
    smemhashes(client, "/environments", cb);
  }

  get("/account/start-monitoring", function(req, res){
    withTsDb(req.account.dbId, function(err, client){
      if(err) return console.log(err);
      withEnvironments(client, function(err, environments){
        console.log(environments);
        renderAccount(res, "account/start-monitoring", { user:req.user, account:req.account, environments: environments });
      })
    });
  });
  
  get("/account", function(req, res){
    renderAccount(res, "account", {user:req.user, account:req.account});
  });
  
  routes.get("/environment/1", function(req, res){
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
        if(!id){ return res.end("No user found for that email address."); }
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
