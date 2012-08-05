fs = require("fs");
var formulate = require("formulate");
var passwords = require("../lib/passwords.js");
var sha1 = require("easyhash")('sha1');
var timeseries = require("../lib/timeseries-db");
var basicAuth = require("../lib/basic-auth");

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
      if(err) return cb(err);
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


  function publicAccountId(account){
    return accountId = account.dbId.slice(11)
  };
  
  get("/account/start-monitoring", function(req, res){
    withTsDb(req.account.dbId, function(err, client){
      if(err) return console.log(err);
      withEnvironments(client, function(err, environments){
        renderAccount(res, "account/start-monitoring", { 
          user:req.user, 
          account:req.account, 
          accountId: publicAccountId(req.account),
          environments: environments,
          hostnames: Transitive.App.hostnames
        });
      })
    });
  });
  
  routes.get("/install.sh", function(req, res){
    var auth = basicAuth(req);
    withTsDb("/databases/"+auth[0], function(err, client){
      if(err){
        res.writeHead(500,{'Content-Type':'text/plain'});
        res.end("Could not connect to account.");
        return;
      }
      client.hgetall("/tokens/"+auth[1], function(err, token){
        if(err){
          res.writeHead(500,{'Content-Type':'text/plain'});
          res.end("Could not connect to account.");
          return;
        }
        if(token && parseInt(token.level, 10) >=3){
          newInstall(Transitive, req, res, client, auth[0], token.on);
        }else{
          res.writeHead(403,{'Content-Type':'text/plain'});
          res.end("Invalid token.\n");
          return;
        }
      });
    });
  });


  function newInstall(Transitive, req, res, client, apiKey, environment){    
    createToken(client, environment, 2, function(err, token){
      var apiToken = token.id.slice(8);
      res.writeHead(200, {'Content-Type':'text/plain'});
      var machineId = newId(22, 62);
      res.end(Transitive.Views.render("agent/install.sh", {
        endpoint: Transitive.App.hostnames.api, 
        apiKey: apiKey,
        token: apiToken,
        machineId: machineId
      })); 


      Transitive.pushIt.publish('/accounts/'+apiKey+'/installer', {
        type: 'download',
        token: apiToken,
        machineId: machineId,
        ip: req.connection.socket.remoteAddress
      });
    });

  }

  function createToken(client, environment, level, cb){
    var tokenId = newId(32, 62);
    
    var token = {
      id: "/tokens/"+tokenId,
      on: environment,
      level: level, // none, read, write, admin!
      createdAt: Math.floor((new Date())/1000)
    }
    
    client.sadd(environment+"/tokens", "/tokens/"+tokenId, function(err, status){
      if(err) return cb(err);
      client.hmset("/tokens/"+tokenId, token, function(err, status){        
        cb(err, token);
      });
    });
  }
  
  
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
      console.log("login")
    formulate(req, res, function(err, fields){
      console.log("FORMULATE")
      accounts.get("/users/byemail/"+sha1(fields.email.toLowerCase()), function(err, id){
        console.log("byemail")
        
        if(!id){ return res.end("No user found for that email address."); }
        accounts.hgetall(id, function(err, user){
          console.log("getall")
          
          passwords.check(fields.password, user.password, function(err, matches){
            console.log("check")
            
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
