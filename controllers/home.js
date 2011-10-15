var formulate = require("formulate");

var Valid = require("../lib/valid.js");
var passwords = require("../lib/passwords.js");
var sha1 = require("easyhash")('sha1');
var exec = require("child_process").exec;

module.exports = function(routes, Transitive){
  var sessions = require("../lib/session")(Transitive.App.sessionsClient);
  var accounts = Transitive.App.accountsClient;
  
  function marketing(req, res, page, locals){
    if(!locals){ locals={}; }
    
    res.writeHead(200, { 
      'Content-Type': 'text/html',
      "Strict-Transport-Security": "max-age=604800"
    });
    
    res.end(Transitive.Views.renderPage("marketing/"+page,locals,"marketing/layout"));
  }
  
  //Home page.
  function home(req, res){ marketing(req, res, "landing"); }
  routes.get("/", home);
  routes.get("/index.html", home);

  var ary = "plans plans-real terms process-monitoring port-monitoring system-monitoring features event-streams".split(" ");
  ary.forEach(function(str){
    routes.get("/"+str, function(req, res){
      marketing(req, res, str);
    });
  });

  routes.get("/easiest-server-monitoring", function(req, res){
    marketing(req, res, "easy");
  });
  
  routes.post("/notify", function(req, res){
    formulate(req, res, function(err, fields, files){
      marketing(req, res, "notify", fields);
      Transitive.App.accountsClient.lpush("marketing/notify-me", JSON.stringify(fields));
      var cmd = "bash "+__dirname+"/../new_signup.sh "+escape(fields.email);
      console.log(cmd);
      exec(cmd, function(err, stderr, stdout){
        console.log(err);
        console.log(stderr);
      });
    }, 10);
  });
  
  routes.post("/signup", function(req, res){
    function fail(err){
      failure(req, res, err);
    }
    
    formulate(req, res, function(err, fields, files){
      if(!fields.tos){fields.tos = false;} // stupid checkboxes.

      var errors = userValid.test(fields);
      if(errors){
        console.dir(errors);
        return marketing(req, res, "signup", {fields: fields, errors: errors});
      }
      
      var email = fields.email.toLowerCase();
      accounts.get("/users/byemail/"+sha1(email), function(err, id){
        if(err){ return fail("couldn't check email for duplicate entry in accounts."); }
        
        if(id){
          res.end("An account already exists for that email address.  Email forgot@dxdt.io if you forgot your password.");
          return;
        }

        fields.accountId = "/accounts/"+newId(22);
        createUser(fields, function(err, user){
          if(err) return fail("could not create user");
          createAccount(fields, user, function(err, account){
            if(err) return fail("could not create account");
            setupDatabase(account, function(err, db){
              if(err) return fail(err);
              sessions.createSession(req, res, {
                  user: user.id
                }, function(err){
                res.writeHead(302, {
                  'Content-Type':'text/plain',
                  'Location':'/account/first'
                });
                res.end("Thanks, redirecting you to your account.");
              });
            });
          });
        }); 
      });
    }, 10);
  });
  
  function failure(req, res, err){
    res.end(err);
    console.log(err);
  }

  function setupDatabase(account, cb){
    Transitive.App.provisioner.provision(function(err, settings){
      if(err) return cb(err);
      console.log(settings);
      accounts.hset(account.id, "dbId", settings.id, cb);
    });
  }
  
  function createAccount(fields, user, cb){
    var account = {
      id: fields.accountId,
      primaryUserId: user.id,
      plan: fields.plan
    };

    accounts.hmset(account.id, account, function(err){
      cb(err, account);
    });
  }
  
  function createUser(fields, cb){
    var id = "/users/"+newId(22);
    passwords.toHash(fields.password, function(err, hsh){
      var user = {
        id: id,
        phone: fields.cell,
        tos: (new Date()).getTime(),
        email: fields.email,
        accountId: fields.accountId,
        password: hsh
      };
    
      accounts.set("/users/byemail/"+sha1(fields.email.toLowerCase()), id, function(err){
        if(err) return cb(err);
        accounts.hmset(id, user, function(err){
          cb(err, user);
        });
      });
    });
  }
};


var emailReg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

userValid = Valid.json({
  email: emailReg,
  password: Valid.notBlank().len(4, 80),
  tos: "on",
  cell: /.*/,
  plan: /.*/
});