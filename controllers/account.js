fs = require("fs");

module.exports = function(routes, Transitive){
  function renderAccount(res, template, locals){
    res.end(Transitive.Views.renderPage(template, locals));
  }
  
  status = JSON.parse(fs.readFileSync(Transitive.options.root+"/status.json"));
  
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
};