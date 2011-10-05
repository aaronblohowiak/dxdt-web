var client = require("redis").createClient();
var formulate = require("formulate");

var Valid = require("../lib/valid.js");
var passwords = require("../lib/passwords.js");

module.exports = function(routes, Transitive){
  
  function marketing(req, res, page, locals){
    if(!locals){ locals={}; }
    
    res.writeHead(200, { 
      'Content-Type': 'text/html'
    });
    
    res.end(Transitive.Views.renderPage("marketing/"+page,locals,"marketing/layout"));
  }
  
  //Home page.
  function home(req, res){ marketing(req, res, "landing"); }
  routes.get("/", home);
  routes.get("/index.html", home);

  var ary = "plans terms process-monitoring port-monitoring system-monitoring features".split(" ");
  ary.forEach(function(str){
    routes.get("/"+str, function(req, res){
      marketing(req, res, str);
    });
  });


  
  routes.get("/easiest-server-monitoring", function(req, res){
    marketing(req, res, "easy");
  });
  
  
  routes.post("/signup", function(req, res){
    formulate(req, res, function(err, fields, files){
      if(!fields.tos){fields.tos = false;} // stupid checkboxes.

      var errors = userValid.test(fields);
      if(errors){
        return marketing(req, res, "signup", {fields: fields, errors: errors});
      }else{
        passwords.toHash(fields.password, function(err, hsh){
          res.writeHead(200, { 
            'Content-Type': 'text/plain'
          });
          res.end(hsh);
        });
      }
      
      //check if email already exists
      //verify that plan is valid planId
      //create account!
      
    }, 10);
  });
};


emailReg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

userValid = Valid.json({
  email: emailReg,
  password: Valid.notBlank().len(4, 80),
  tos: "on",
  cell: /.*/
});