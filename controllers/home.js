var client = require("redis").createClient();
var formulate = require("formulate");

var Valid = require("../lib/valid.js");

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

  routes.get("/plans", function(req, res){
    marketing(req, res, "plans");
  });
  
  routes.get("/terms", function(req, res){
    marketing(req, res, "terms");
  });
  
  routes.get("/easiest-server-monitoring", function(req, res){
    marketing(req, res, "easy");
  });
  
  routes.get("/process-monitoring", function(req, res){
    marketing(req, res, "process-monitoring");
  });
  
  routes.post("/signup", function(req, res){
    formulate(req, res, function(err, fields, files){
      if(!fields.tos){fields.tos = false;} // stupid checkboxes.

      var errors = userValid.test(fields);
      if(errors){
        return marketing(req, res, "signup", {fields: fields, errors: errors});
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