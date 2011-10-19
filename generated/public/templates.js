_browserifyRequire.modules["./templates.js"] = function () {
    var module = { exports : {} };
    var exports = module.exports;
    var __dirname = ".";
    var __filename = "./templates.js";
    
    var require = function (path) {
        return _browserifyRequire.fromFile("./templates.js", path);
    };
    
    (function () {
        module.exports={  "account/login": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<div class=\"login-box\"><h2>Please Log In</h2>Your session may have timed out.<div class=\"vspace\"></div><form action=\"/login\" method=\"POST\" class=\"form-stacked\">" + 
this.render("form/input", {label:"Email", name: "email", ti: 1, errMsg: " Please enter a valid email"}) +
this.render("form/input", {label:"Password", name: "password", ti: 2, type:"password", errMsg:"Must be between 4 and 80 letters"}) +
"&nbsp;<input type=\"submit\" value=\"Log In\" tabindex=\"3\" class=\"btn primary large\" /></form></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "account/start-monitoring": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";
this.crumbs = [["/account", "Account"], ["/account/start-monitoring", "Start Monitoring"]]
; _$output = _$output  +
"<div class=\"row\"><div class=\"span16\"><h1>Start Monitoring</h1><p style=\"font-size:16px\">Paste the command in your server's terminal, after logging in as <span class=\"highlight\">root.</span> <br /></p>" +
"";
accountId = account.dbId.slice(11)
function tokenId(token){
  return token.slice(8);
}
; _$output = _$output  +
(function () { var __result__ = [], __key__, environment; for (__key__ in environments) { if (environments.hasOwnProperty(__key__)) { environment = environments[__key__]; __result__.push(
"<div class=\"vspace\"></div><h2>" + 
this.escape(environment.name) + 
"</h2><input value=\"curl -l https://" +
this.escape(accountId) +
":" +
this.escape(tokenId(environment.token)) +
"@" +
this.escape(hostnames.api) +
"/install.sh | bash\" class=\"terminal\" />"
); } } return __result__.join(""); }).call(this) +
"<div class=\"vspace2\"></div></div><div class=\"span4\"><h3>Quick Help</h3><b>Why do I have to be root?</b><p>You have to be root so we can list all of the processes and open ports on the machine.</p><b>I get \"curl: command not found\" and nothing happens.</b><p>You must have the following commands available as root:  bash curl tar gzip lsof ps df netstat</p></div></div><div class=\"vspace2\"></div><style type=\"text/css\">\ninput.terminal{\n  width:100%;\n  border: none;\n  font-family:'Courier New', Courier, monospace;\n}\n</style>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "account": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";
this.crumbs = [["/account", "Account"]]
; _$output = _$output  +
"<div class=\"row\"><div class=\"span4 leftnav\"><div class=\"nav-category\"><h3><div class=\"ico\">♛</div><a href=\"/account\">Account</a></h3><div class=\"listing\"><a href=\"/account/start-monitoring\">Start Monitoring</a></div></div></div><div class=\"span12\"><h1>Account Information</h1><div class=\"row\"><div class=\"span11 column\"><h4>Database Id</h4>" +
this.escape(account.dbId) +
"<h4>Plan</h4>" +
this.escape(account.plan) +
"<div class=\"vspace2\"></div></div><div class=\"span11\"><h2>Primary User Info</h2><h4>Email</h4>" +
this.escape(user.email) +
"<h4>Cell Phone</h4>" +
this.escape(user.phone) + 
"</div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "admin/admin": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="hi";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "agent/install.sh": function anonymous(obj) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('#!/usr/bin/env bash\n\n##############################################################################\n#\n#              _______                     _______                \n#              \\  ___ `\'.                  \\  ___ `\'.             \n#               \' |--.\\  \\                  \' |--.\\  \\            \n#               | |    \\  \'                 | |    \\  \'      .|   \n#               | |     |  \' ____     _____ | |     |  \'   .\' |_  \n#               | |     |  |`.   \\  .\'    / | |     |  | .\'     | \n#               | |     \' .\'  `.  `\'    .\'  | |     \' .\'\'--.  .-\' \n#               | |___.\' /\'     \'.    .\'    | |___.\' /\'    |  |   \n#              /_______.\'/      .\'     `.  /_______.\'/     |  |   \n#              \\_______|/     .\'  .\'`.   `.\\_______|/      |  \'.\n#                           .\'   /    `.   `.              |   /  \n#                          \'----\'       \'----\'             `\'-\'  \n#\n#\n##############################################################################\n#\n#\n#   https://dxdt.io Server Monitoring\n#   This software is provided with NO WARRANTY,  express or implied.\n#   While we believe that it is a fine piece of code, we make no garauntees.\n#   It might destroy your computer, or launch nukes at the USSR.\n# \n#   By using this software, you agree to the terms and conditions at\n#     https://dxdt.io/terms\n#\n#\n##############################################################################\n\n\n\n##############################################################################\n#  Overview\n##############################################################################\n#\n#  This script does a few things:\n#  \n#    1. Check for all pre-requisite commands (grep, tar, lsof, ifconfig...)\n#    2. Create folder structure\n#    3. Install files into the appropriate location\n#    4. Report progress to dxdt\n#    5. Launch the stats collecting agent (dxdt-collectd)\n#\n#  If you have any questions about how this works, email questions@dxdt.io\n#\n##############################################################################\n\n\n##############################################################################\n# Environment Variables (Options)\n##############################################################################\n#\n# Set DXDT_MACHINE_ID to a unique url-safe string for each computer\n#  or to override default.\n#  Note: we use this to connect data to the machine, so if you change it,\n#  You will be creating a new machine!\n#\n# Set DXDT_BASE_DIR to the folder that you want DXDT to use as its root.\n#   by default it is /opt/dxdt\n#\n# Note that we still put the conf in /etc/dxdt.conf\n#\n##############################################################################\n\n##############################################################################\n# Begin critical section; exit if any line returns anything non 0\n##############################################################################\nset -e\n##############################################################################\n\n\n\n# This should never change unless you are a dxdt developer :)\nDXDT_ENDPOINT="', endpoint ,'";\n\n# This is your account API Key.  It is not a secret.\nDXDT_API_KEY="', apiKey ,'";\n\n#Tokens grant acess to a specific environment for a given account.\n#  Every time you download the install.sh script, we generate a new token for you\n#  this lets you revoke tokens in a fine-grained way.\n#  The tokens created have read+write access, but not GRANT access.\nDXDT_TOKEN="', token ,'";\n\n# Machine id MUST be unique per account.  A unique one is generated on download\n#  OR use the env var DXDT_MACHINE_ID if you want to override it.\n#    \n#  If you are going to re-use the install script you have downloaded, you MUST\n#    specify a new DXDT_MACHINE_ID for each new machine.\n\nif test "$DXDT_MACHINE_ID"\nthen DXDT_MACHINE_ID="$DXDT_MACHINE_ID"; #noop, but useful for readability.\nelse\n DXDT_MACHINE_ID="', machineId ,'" ;\nfi\n\n# Where to store the dxdt-collectd script\nif test "$DXDT_BASE_DIR"\nthen DXDT_BASE_DIR="$DXDT_BASE_DIR";\nelse DXDT_BASE_DIR="/opt/dxdt";\nfi\n\nfunction failedInstall {\n  #TODO: include PATH\n  code=`curl -d "machineid=$DXDT_MACHINE_ID" -d "failure=$1" --user "$DXDT_API_KEY:$DXDT_TOKEN" --write-out %{http_code} --silent --output /dev/null $DXDT_ENDPOINT/install-failed`;\n}\n\n# Start Capability Checks.\nif command -v md5 &>/dev/null; \n  then hshcommand="md5"; #BSD\n  else\n    if command -v md5sum &>/dev/null\n    then hshcommand="md5sum"; #LINUX\n    else failedInstall "Please install md5 or md5sum and make sure it is in the PATH.";\n    fi\nfi\n\nif command -v ifconfig &>/dev/null;\n  then networkConfiguration=`ifconfig -a`;\n  else failedInstall "Please install ifconfig and make sure it is in the PATH.";\nfi\n\n\nfunction testCommand {\n  if command -v $1 &>/dev/null;\n    then echo "Command found: $1";\n    else failedInstall "Please install $1 and make sure it is in the PATH.";\n  fi\n  return 0\n}\n\nfor command in date rm time tar grep uptime lsof df ifconfig mkdir\ndo\n  testCommand $command\ndone\n\n##############################################################################\n#  Create directories\n##############################################################################\n\n#TODO: Report failure if it should occur.\nmkdir -p $DXDT_BASE_DIR\n\n##############################################################################\n#  Write Config File\n##############################################################################\n\n(\ncat<<EOF\n#!/usr/bin/env bash\nexport DXDT_ENDPOINT="$DXDT_ENDPOINT"\nexport DXDT_API_KEY="$DXDT_API_KEY"\nexport DXDT_TOKEN="$DXDT_TOKEN"\nexport DXDT_MACHINE_ID="$DXDT_MACHINE_ID"\nexport DXDT_BASE_DIR="$DXDT_BASE_DIR"\nEOF\n)> /etc/dxdt-collectd.conf\n\n# we want to be able to execute it to set up our environment\nchmod +rx /etc/dxdt-collectd.conf\n\n\n');}return __p.join('');
}
,  "cpu": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<h3>% CPU Over Time</h3><div style=\"width:400px;height:200px\" class=\"flotGraph\"></div><div class=\"lastupdated\"></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "environment/environment": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";
this.crumbs = [["/environment/1", "Staging"]]
; _$output = _$output  +
"<div class=\"row\"><div class=\"span4 leftnav\"><div class=\"nav-category\"><h3><div class=\"ico\">♛</div><a href=\"/\">Staging</a></h3><div class=\"listing active\"> <a href=\"/\">Servers</a> </div><div class=\"listing\"> <a href=\"/\">Notes</a> </div></div></div><div class=\"span12\"><div class=\"page-header\"><h1>Staging <small class=\"strong\">3 Servers</small> </h1></div><div class=\"row\"><div class=\"span12\"><h3>Find Servers, Processes, Ports &amp; Notes</h3><input type=\"text\" placeholder=\"server or environment stats\" class=\"search\" /></div></div><div class=\"vspace2\"></div><div class=\"row\"><div class=\"span12\"><h2>Servers</h2><div class=\"server-list\"> <span class=\"label success\">OK</span>  <a href=\"/server/123\">Web Server 1</a> abpmba.local<br /> <span class=\"label notice\">Recovered</span>  <a href=\"/server/123\">DB Server Master</a> ec2-wjn24jn5kj3n3<br /> <span class=\"label warning\">High Load</span>  <a href=\"/server/123\">DB Server Slave</a> ec2-wjn24jn5kj3n3abpmba.local</div></div></div><div class=\"vspace\"></div><div class=\"row\"><div class=\"span12\"><h2>Events</h2><div class=\"row\"><div class=\"span4\"><h3>Wed Sep 14</h3></div><div class=\"span8\"><div class=\"alert-message\">9:22 AM UTC Began listening to port 3000</div></div></div><hr /><div class=\"row\"><div class=\"span4\"><h3>Mon Sep 12</h3></div><div class=\"span8\"><div class=\"alert-message success\">8:05 PM UTC CPU stayed below 80% for 2 Minutes</div><div class=\"alert-message error\">7:58 PM UTC CPU Exceeded 90%  for 2 Minutes</div><div class=\"alert-message\">2:22 PM UTC Process Started</div></div></div></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "footer": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<div class=\"container footer\"><div class=\"vspace\"></div><div class=\"row\"><div class=\"span4 darker\">Got questions? <a href=\"mailto:questions@dxdt.io\"> We're happy to help.</a> </div><div style=\"text-align:center\" class=\"span8 shhhh\">&copy; 2011  <a href=\"http://xitive.com\"><b>X</b>itive Inc</a> </div><div class=\"span4 shhhh\"> <a href=\"/terms\">Terms of Service</a> &nbsp;&nbsp; <a href=\"/privacy\">Privacy Policy</a> </div></div></div><div class=\"vspace\"></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "form/checkbox": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";if(!locals.type) locals.type="checkbox"; _$output = _$output  +
"";this.render("form/clean_input", locals)
; _$output = _$output  +
"<div class=\"" + this.escape("clearfix " + klass) + "\" style=\"" + this.escape(wrapperStyle) + "\">" + 
"<label>" + 
this.escape(label) + 
"</label><div class=\"inputs\"><ul class=\"inputs-list\"><li class=\"input\"><label>" +
" <input name=\"" + this.escape(name) + "\" tabindex=\"" + this.escape(ti) + "\" value=\"on\" type=\"" + this.escape(type) + "\" id=\"email\" /> " +
(function () { if (locals.additionalText) { return (
locals.additionalText
);} else { return ""; } }).call(this) + 
"</label>" +
"";if(errors){; _$output = _$output  +
"<span class=\"help-inline\">" + 
"";if(locals.errMsg){; _$output = _$output  +
this.escape(locals.errMsg) +
"";}else{; _$output = _$output  +
this.escape(errors.message) +
"";}      ; _$output = _$output  + 
"</span>" +
"";}; _$output = _$output  +
(function () { if (locals.tip) { return (
"<span class=\"help-block\">" + 
this.escape(locals.tip) + 
"</span>"
);} else { return ""; } }).call(this) + 
"</li></ul></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "form/clean_input": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";
if(locals.value===undefined){
  if(this.app.fields){
    locals.value = this.app.fields[name];
  }
}
if(locals.errors === undefined){
  if(this.app.errors){
    locals.errors = this.app.errors[name];
  }
}

if(locals.value===undefined){locals.value='';}
if(locals.errors===undefined){locals.errors=null;}
if(!locals.ti){locals.ti=null;}
if(!locals.type){locals.type="text";}
if(!locals.id){locals.id=""; }

locals.errors ? locals.klass="error" : locals.klass="";; _$output = _$output ;
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "form/input": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";this.render("form/clean_input", locals)
; _$output = _$output  +
"<div class=\"" + this.escape("clearfix " + klass) + "\">" + 
"<label>" + 
this.escape(label) + 
"</label><div class=\"input\">" +
" <input name=\"" + this.escape(name) + "\" tabindex=\"" + this.escape(ti) + "\" value=\"" + this.escape(value) + "\" type=\"" + this.escape(type) + "\" id=\"" + this.escape(locals.id) + "\" /> " +
(function () { if (locals.additionalText) { return (
locals.additionalText
);} else { return ""; } }).call(this) +
"";if(errors){; _$output = _$output  +
"<span class=\"help-inline\">" + 
"";if(locals.errMsg){; _$output = _$output  +
this.escape(locals.errMsg) +
"";}else{; _$output = _$output  +
this.escape(errors.message) +
"";}      ; _$output = _$output  + 
"</span>" +
"";}; _$output = _$output  +
(function () { if (locals.tip) { return (
"<span class=\"help-block\">" + 
this.escape(locals.tip) + 
"</span>"
);} else { return ""; } }).call(this) + 
"</div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "form/options": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output=(function () { var __result__ = [], __key__, option; for (__key__ in options) { if (options.hasOwnProperty(__key__)) { option = options[__key__]; __result__.push(
"<option value=\"" + this.escape(option[1]) + "\">" + 
this.escape(option[0]) + 
"</option>"
); } } return __result__.join(""); }).call(this);
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "layout": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html>" + 
'<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">' +
'<meta http-equiv="content-language" content="en">' +
"<head><link rel=\"stylesheet\" href=\"/app.css?" +
this.escape(q) +
"\" media=\"all\" /><script src=\"/transitive.js?" +
this.escape(q) +
"\"></script><script src=\"/templates.js?" +
this.escape(q) +
"\"></script>\n<script type=\"text/javascript\">\n//<![CDATA[\nTransitive = require(\"./transitive\");\nTransitive.Views.templates = require(\"./templates.js\");\njQuery = $;\nif(window.console){}else{\n  console = {};\n  console.log = function(){}\n}\n//]]>\n</script>\n<script src=\"/jquery.flot.js?" +
this.escape(q) +
"\"></script><script src=\"/jquery.flot.selection.js?" +
this.escape(q) +
"\"></script><!--[if lt IE 9]>" +
'<script src="https://html5shim.googlecode.com/svn/trunk/html5.js"></script>' +
"<![endif]--><title>dxdt.io Change over time</title></head><body><div class=\"topbar\"><div class=\"fill\"><div class=\"container\"><h3><a href=\"/account/dashboard\" class=\"logo\"><img src=\"/logotype-small.png\" width=\"52px\" height=\"22px\" /></a></h3><ul><li><a href=\"/account/dashboard\">Home</a></li>" +
(function () { if (this.crumbs) { return (
(function () { var __result__ = [], __key__, crumb; for (__key__ in this.crumbs) { if (this.crumbs.hasOwnProperty(__key__)) { crumb = this.crumbs[__key__]; __result__.push(
"<li><a class=\"skinny\">/</a></li><li>" + 
"<a href=\"" + this.escape(crumb[0]) + "\">" + 
this.escape(crumb[1]) + 
"</a></li>"
); } } return __result__.join(""); }).call(this)
);} else { return ""; } }).call(this) + 
"</ul><ul class=\"secondary-nav\"><li><form><input class=\"search\" /></form></li><li style=\"margin-left:10px\" class=\"dropdown\"><a href=\"/logout\">Log Out</a></li></ul></div></div></div><div class=\"app\"></div><div class=\"container main workspace\">" + 
content + 
"</div><center style=\"letter-spacing:1px\"><br /><br />&copy; 2011 <b>X</b>itive, Inc<br /><br /></center><div class=\"clear\"></div>\n<script type=\"text/javascript\">\n//<![CDATA[\n" +
etc +
"\nTransitive.boot();\n//]]>\n</script>\n</body></html>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/easy": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<style type=\"text/css\">\n.main ul.unstyled > li{\n  color: #333;\n  font-size:18px;\n  line-height:24px;\n}\n\n</style><div class=\"app\"></div><div class=\"home\"><div class=\"vspace\"></div><div class=\"body container rounded\"><div class=\"vspace\"></div><div class=\"container main\"><div class=\"row\"><div class=\"span8\"><h1>The Easiest Server Monitoring</h1><h2> <img src=\"/terminal.png\" style=\"vertical-align:top\" width=\"32px\" height=\"32px\" /> <b>One-Minute install:</b></h2><ul class=\"unstyled\"><li>1. Log In</li><li>2. Click \"Staging\" or \"Production\" to pick an environment for the server.</li><li>3. Copy the \"Server Setup Command\"</li><li>4. SSH into your server and paste the command.</li><li>5. You're done!</li></ul><p>Within a few seconds, you should see your server added to the environment and events added to the <a href=\"/event-streams\">event stream</a>.</p><div class=\"vspace\"></div><div style=\"text-align:center\" class=\"span8\"><a href=\"/plans\" class=\"btn primary\"><big><b>Start Your 30-day free trial »</b></big></a><br />  No Credit Card required.</div></div><div class=\"span8\"><h1>&nbsp;</h1><h2>Every Process and Port</h2><p>Just by installing the script, we start monitoring every <a href=\"/process-monitoring\">process</a> and <a href=\"/port-monitoring\">port.</a> You don't have to worry about installing any plugins or changing things as you add more services to a machine; all new services will be picked up automatically.</p><h2 style=\"margin-top:18px\">Automatic API Keys &amp; Security Tokens!</h2><p>The command you paste into your server downloads a script that is customized for your account and environment.</p><p>It includes an API Key and a Security Token <i>inside</i> the script so there is nothing to configure.</p></div></div><div class=\"vspace2\"></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/event-streams": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<style type=\"text/css\">\n.main ul.unstyled > li{\n  color: #333;\n  font-size:18px;\n  line-height:24px;\n}\n\n</style><div class=\"app\"></div><div class=\"home\"><div class=\"vspace\"></div><div class=\"body container rounded\"><div class=\"vspace\"></div><div class=\"container main\"><div class=\"row\"><div class=\"span16\"><h1>Event Streams</h1><div class=\"vspace\"></div><p>We're still in private Beta.  More details about event streams coming soon.</p><p>In the meantime, check out our other <a href=\"/features\">features.</a> This is the only blank page, promise!</p><div class=\"vspace\"></div></div></div><div class=\"vspace2\"></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/features": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<div class=\"app\"></div><div class=\"home\"><div class=\"vspace\"></div><div class=\"body container rounded\"><div class=\"vspace\"></div><div class=\"row\"><div class=\"span16\"><h1>Monitor All of Your Servers, Processes and Ports <small>From $49/mo for 4 servers</small> </h1><p><a href=\"/easiest-server-monitoring\">One-minute install</a>,  100% SSL, monitors every <a href=\"/process-monitoring\">process</a>: RAM, CPU, and open <a href=\"/port-monitoring\"> ports</a>, automatically.</p><p>Monitoring Linux in the Cloud and in the Colo.  <a href=\"/plans\">Try it now</a> for 30 days free. No credit card required.</p><div class=\"vspace\"></div><hr /><div class=\"row\"><div class=\"span8\"><h2><b>Every <a href=\"/process-monitoring\">Process</a> </b></h2><p>Just by installing the agent, you can easily search, graph and compare: processor and memory utilization, start &amp; end time, open ports, and custom events for <i>every process</i>, including ones that have <a href=\"/process-monitoring#terminated\">terminated.</a> </p><div style=\"text-align:right\" class=\"right\"> <a href=\"/process-monitoring\">Learn more about Process Monitoring »</a> </div><div class=\"vspace2\"></div></div><div class=\"span8\"><div style=\"padding:0 0px\"><h2><b>Every <a href=\"/port-monitoring\">Port</a> </b></h2><p>List all the open ports on all of your machines, and see which processes opened them.  No configuration required -- you just <a href=\"/easiest-server-monitoring\">install dxdt</a> and it all shows up, automatically.<br /><br /></p></div><div style=\"text-align:right\" class=\"right\"> <a href=\"/port-monitoring\">Learn more about Port Monitoring »</a> </div></div></div><div class=\"row\"><div class=\"span4\"><h2><b>Every <a href=\"/system-monitoring\">Machine</a> </b></h2><p>Load Average, RAM,<br />Disk Usage, Open Ports, Network Configuration,<br />and more.</p><div style=\"text-align:right\" class=\"right\"> <a href=\"/port-monitoring\">System Monitoring »</a> </div></div><div class=\"span4\"><h2><b>Every <a href=\"/event-streams\">Event</a> </b></h2><p>Everything important becomes and event that you can monitor and turn into SMS &amp; email alerts.</p><div style=\"text-align:right\" class=\"right\"> <a href=\"/event-streams\">Event Streams »</a> </div></div><div style=\"text-align:center\" class=\"span8\"><div class=\"vspace2\"></div><div class=\"vspace\"></div><a href=\"/plans\" class=\"btn primary\"><big><b>Start your 30-day FREE trial »</b></big><br />No Credit Card required.</a></div></div><div class=\"row\"><div class=\"vspace\"></div><div class=\"grayblock\"><h3>If you have any questions, please <a href=\"mailto:questions@dxdt.io\">email us</a> or call (877) 250-4337</h3></div><div class=\"vspace\"></div></div></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/landing": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";
this.crumbs = [["", "Features"], ["", "Pricing"], ["", "Contact"], ["", "Documentation"]]
; _$output = _$output  +
"<div class=\"home\"><div class=\"span16 top\"><div class=\"container\"><div class=\"row\"><div class=\"span8\"><!--%h1.everything --><!--Monitor, Alert, Graph, Resolve:--><!--%br--><!--Every Process. &nbsp;Every Port.--><!--%br--><!--Every--><!--%span.virtual> ( Virtual )--><!--Machine.--><!--%h1.everything --><!--Monitor Every Process,--><!--%br--><!--Port &amp;--><!--%span.virtual>--><!--Machine.--><!--%br--><!--%b No Configuration--><h1 class=\"everything\"><b>Monitor Everything.</b><br />No configuration.</h1></div><div class=\"span8\"><img src=\"/bigdxdtwhite.png\" height=\"100px\" /></div></div></div></div><div class=\"body container rounded-bottom\"><div class=\"container\"><div style=\"margin-bottom:20px; text-align:center\" class=\"row\"><div style=\"padding:20px 20px 10px 20px\" class=\"grayblock\"><div class=\"row\"><div class=\"span12\"><h2><a href=\"/easiest-server-monitoring\">One-minute install</a>. Start collecting data <b>before</b> there's a problem.</h2></div><div style=\"text-align:center\" class=\"span3\"><a href=\"/plans\" class=\"btn primary\"><big><b>30-day free trial »</b></big></a>  No Credit Card required.</div></div></div></div></div><div class=\"container main\"><div class=\"vspace\"></div><div class=\"row\"><div class=\"span16\"><div class=\"row\"><div class=\"span4\"><h2><b>Every Process</b></h2><p> <a href=\"/process-monitoring\">Monitor every process</a>  by default. No plugins needed.</p><p> <a href=\"/process-monitoring#terminated\">Search exited processes</a> for root cause analysis.</p></div><div class=\"span4\"><div style=\"padding:0 0px\"><h2>Every Port</h2><p> <a href=\"/port-monitoring\">Port Monitoring</a> tracks every hostname:port & process.</p><p>See which process is listening to a port.</p></div></div><div class=\"span4\"><h2>Every Machine</h2><p> <a href=\"/system-monitoring\">System monitoring</a> for Load, Disk Usage, RAM and more.</p><p>Drill deeper, inspecting <a href=\"/process-monitoring\">processes</a> and <a href=\"/port-monitoring\">ports.</a> </p></div><div class=\"span4\"><h2>Every Event</h2><p>The <a href=\"/event-streams\">event-streams</a> are \"Twitter for servers\".</p><p> <a href=\"/event-streams#notes\">Add your own notes</a> to any graph or server.</p></div></div><div class=\"vspace2\"></div></div></div><div style=\"text-align:center\" class=\"row call-to-action\"><div class=\"span4\">&nbsp;</div><div class=\"span8\"><p>We have the  <a href=\"/easiest-server-monitoring\">easiest server monitoring</a> in the world.</p><p>One line in the terminal. That's it.</p><br /><a href=\"/plans\" class=\"btn error\"><big><b>Sign Up Now »</b></big></a><br />&nbsp;No Credit Card required.</div><div class=\"clear\"></div></div><div class=\"vspace2\"></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/layout": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html>" + 
'<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">' +
'<meta http-equiv="content-language" content="en">' +
"<head><title>dxdt.io Change Over Time | Server Monitoring | Monitor Every Process, Port and Machine</title><link rel=\"stylesheet\" href=\"/app.css?" +
this.escape(q) +
"\" media=\"all\" /><script src=\"/transitive.js?" +
this.escape(q) +
"\"></script><script src=\"/templates.js?" +
this.escape(q) +
"\"></script>\n<script type=\"text/javascript\">\n//<![CDATA[\nTransitive = require(\"./transitive\");\nTransitive.Views.templates = require(\"./templates.js\");\njQuery = $;\nif(window.console){}else{\n  console = {};\n  console.log = function(){}\n}\n//]]>\n</script>\n<script src=\"/jquery.flot.js?" +
this.escape(q) +
"\"></script><script src=\"/jquery.flot.selection.js?" +
this.escape(q) +
"\"></script><script src=\"/twipsy.js?" +
this.escape(q) +
"\"></script><!--[if lt IE 9]>" +
'<script src="https://html5shim.googlecode.com/svn/trunk/html5.js"></script>' +
"<![endif]-->\n<script type=\"text/javascript\">\n//<![CDATA[\nvar _gaq = _gaq || [];\n_gaq.push(['_setAccount', 'UA-26084577-1']);\n_gaq.push(['_setDomainName', 'dxdt.io']);\n_gaq.push(['_trackPageview']);\n\n(function() {\n  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\n  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';\n  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\n})();\n\n\n//]]>\n</script>\n</head><body class=\"marketing\"><div class=\"topbar\"><div class=\"fill\"><div class=\"container\"><h3><a href=\"/\" style=\"letter-spacing:3px;\"><img src=\"/logotype-small.png\" width=\"52px\" height=\"22px\" /></a></h3><ul><li><a style=\"letter-spacing:2px\">(877) 250-4337</a></li></ul>" +
"";if(!this.app.hideTopNav){; _$output = _$output  +
"<ul><li><a href=\"/features\">Features</a></li><li><b><a href=\"/plans\">Plans & Pricing</a></b></li><li><a href=\"mailto:support@dxdt.io\">Support</a></li></ul><ul class=\"secondary-nav\"><li><form action=\"/login\" method=\"POST\" id=\"login-form\"><input placeholder=\"Email Address\" name=\"email\" class=\"username\" /><input placeholder=\"Password\" type=\"password\" name=\"password\" class=\"password\" /><a href=\"#\" onclick=\"$('#login-form').submit()\" class=\"login\">Log In</a><!--we need this for enter to 'just work'--><div style=\"position:absolute; left:-99999px\"><input type=\"submit\" /></div></form></li></ul>" +
"";}
; _$output = _$output  + 
"</div></div></div>" +
content +
this.render("footer") +
"\n<script type=\"text/javascript\">\n//<![CDATA[\n" +
etc +
"\nTransitive.boot();\n$(function () {\n  $(\"a[rel=twipsy]\").twipsy({\n    live: false,\n    animate: false\n  })\n});\n//]]>\n</script>\n</body></html>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/notify": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<style type=\"text/css\">\n.main ul.unstyled > li{\n  color: #333;\n  font-size:18px;\n  line-height:24px;\n}\n\n</style><div class=\"app\"></div><div class=\"home\"><div class=\"vspace\"></div><div class=\"body container rounded\"><div class=\"vspace\"></div><div class=\"container main\"><div class=\"row\"><div class=\"span16\"><h1>Thanks!</h1><h2>We'll be in touch.</h2><p>To confirm, your email address is: <span class=\"highlight\">" +
this.escape(email) +
".</span> </p><p>If this isn't right, just <a href=\"/plans\">sign up again</a>.</p></div></div><div class=\"vspace2\"></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/plans-real": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";
this.app.hideTopNav = true;
; _$output = _$output  +
"<div class=\"app\"></div><div class=\"home\"><div class=\"vspace\"></div><div class=\"body container rounded\"><div class=\"vspace\"></div><div class=\"container main\"><div class=\"row\"><div class=\"span8\"><div class=\"row\"><div class=\"span8 plans\"><h1>Plans <small>100% SSL. 4 Week data retention.</small> </h1><div class=\"row\"><div class=\"span4\"><h2>Small <div class=\"price\">$49<div class=\"price\">" + 
this.escape("/mo") + 
"</div></div> </h2><p><b>4</b> Servers</p></div><div class=\"span4\"><h2>Medium <div class=\"price\">$95<div class=\"price\">" + 
this.escape("/mo") + 
"</div></div> </h2><p><b>8</b> Servers</p></div></div><div class=\"vspace\"></div><div class=\"row\"><div class=\"span4\"><h2>Large <div class=\"price\">$195<div class=\"price\">" + 
this.escape("/mo") + 
"</div></div> </h2><p><b>18</b> Servers</p></div><div class=\"span4\"><h2>X-Large <div class=\"price\">$495<div class=\"price\">" + 
this.escape("/mo") + 
"</div></div> </h2><p><b>50</b> Servers</p></div></div></div></div><div class=\"row\"><div class=\"vspace2\"></div><div class=\"span8\"><div style=\"padding:0 0px\"><h2>Have more than 50 servers?</h2><p>We offer  <a href=\"mailto:custom@dxdt.io\">volume discounts.</a> </p></div></div></div></div><div class=\"span8\"><form method=\"POST\" action=\"/signup\" autocomplete=\"off\"><fieldset><legend>Monitor Everything<br />in One Minute</legend>" +
this.render("marketing/signup_fields") +
"<div style=\"background:none;border:none;margin-top:0px\" class=\"actions\"><button type=\"submit\" value=\"Create Account\" tabindex=\"6\" class=\"btn primary\"><b>Start FREE 30-Day Trial »</b></button><br /><br /><p> <span style=\"font-size:14px\" class=\"label\">Next:</span> Paste one line in your terminal.</p></div></fieldset></form></div></div><div class=\"row\"><div class=\"grayblock\"><h3>If you have any questions, please <a href=\"mailto:questions@dxdt.io\">email us</a> or call (877) 250-4337</h3></div><div class=\"vspace2\"></div><div class=\"span16\"><div class=\"row\"><div class=\"span8\"><h3>How does the 30-day trial work?</h3>Sign up and start monitoring servers.  A couple weeks before the end of your trial, we'll politely ask you to enter your billing information and you will be billed on the day after your trial ends for the following month.  If for some reason we aren't a good fit, then we'll put your account on hold until further notice.  If you get busy and forget to put in all your info, we have a grace period so you won't lose any data.<div class=\"vspace\"></div><h3>When will I be billed?</h3>You will be billed the day after your trial ends for the following month. You will be billed every month thereafter.<div class=\"vspace\"></div><h3>Do you take American Express?</h3>Yep.  We accept Visa, MasterCard, AmEx, and Discover. After you log in, you can add your card using the \"Account\" link at the top right of the page.  If none of these options work for you, we can accept check, purchase order and <a href=\"http://en.wikipedia.org/wiki/Fictional_currency\" target=\"_blank\">gold-pressed latinum</a> by special arrangement only. You may pay via check if you pre-pay for a year in advance. To pay via check, please <a href=\"mailto:payment@dxdt.io\">email us.</a></div><div class=\"span8\"><h3>What if I add more servers than my plan?</h3>If you start monitoring more servers than are in your plan, we'll politely email you and ask you to upgrade.  Don't worry! You won't lose any data or face any crazy fees.  We do business like people should.<div class=\"vspace\"></div><h3>Do you offer performance consulting?</h3>Yes, professional services are available starting at $150<span class=\"unit\">/hr.</span>  We can help you install, analyze your data, plan capacity, configure servers and advise you on best-practices.<div class=\"vspace\"></div><h3>Is there a minimum commitment?</h3>There is no long-term obligation; dxdt is a month-to-month service.  If you cancel, you will not be billed again.<div class=\"vspace\"></div><h3>Do you support Windows?</h3>Not yet. Please <a href=\"mailto:windows@dxdt.io\">email us</a> and we'll tell you when we add windows support.</div></div><div class=\"vspace2\"></div></div></div></div></div></div>\n<script type=\"text/javascript\">\n//<![CDATA[\n$(function(){\n  $('#email').focus();\n})\n//]]>\n</script>\n";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/plans": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";
this.app.hideTopNav = true;
; _$output = _$output  +
"<div class=\"app\"></div><div class=\"home\"><div class=\"vspace\"></div><div class=\"body container rounded\"><div class=\"vspace\"></div><div class=\"container main\"><div class=\"row\"><div class=\"span8\"><div class=\"row\"><div class=\"span8 plans\"><h1>Plans <small>100% SSL. 4 Week data retention.</small> </h1><div class=\"row\"><div class=\"span4\"><h2>Small <div class=\"price\">$49<div class=\"price\">" + 
this.escape("/mo") + 
"</div></div> </h2><p><b>4</b> Servers</p></div><div class=\"span4\"><h2>Medium <div class=\"price\">$95<div class=\"price\">" + 
this.escape("/mo") + 
"</div></div> </h2><p><b>8</b> Servers</p></div></div><div class=\"vspace\"></div><div class=\"row\"><div class=\"span4\"><h2>Large <div class=\"price\">$195<div class=\"price\">" + 
this.escape("/mo") + 
"</div></div> </h2><p><b>18</b> Servers</p></div><div class=\"span4\"><h2>X-Large <div class=\"price\">$495<div class=\"price\">" + 
this.escape("/mo") + 
"</div></div> </h2><p><b>50</b> Servers</p></div></div></div></div><div class=\"row\"><div class=\"vspace2\"></div><div class=\"span8\"><div style=\"padding:0 0px\"><h2>Have more than 50 servers?</h2><p>We offer  <a href=\"mailto:custom@dxdt.io\">volume discounts.</a> </p></div></div></div></div><div class=\"span8\"><form method=\"POST\" action=\"/notify\"><h1>Currently In Private Beta</h1><fieldset><legend>Keep in touch.</legend>" +
this.render("form/input", {label:"Email address", name: "email", ti: 1, errMsg: " Please enter a valid email"}) +
this.render("form/checkbox", {label:"Request Invite", name: "invite", ti: 2, additionalText: 'I would like to have early access to dxdt', wrapperStyle:"margin-bottom:0px"}) +
this.render("form/checkbox", {label:"Request Notification", name: "invite", ti: 2, additionalText: 'I would like an email when you launch.', wrapperStyle:"margin-bottom:0px"}) +
"<div style=\"background:none;border:none;margin-top:0px;text-align:left\" class=\"actions\"><button type=\"submit\" value=\"Create Account\" tabindex=\"6\" class=\"btn primary\"><b>Sign Up »</b></button><br /><br />We won't sell or abuse your email address.           </div></fieldset></form></div></div><div class=\"row\"><div class=\"grayblock\"><h3>If you have any questions, please <a href=\"mailto:questions@dxdt.io\">email us</a> or call (877) 250-4337</h3></div><div class=\"vspace2\"></div><div class=\"span16\"><div class=\"row\"><div class=\"span8\"><h3>How does the 30-day trial work?</h3>Sign up and start monitoring servers.  A couple weeks before the end of your trial, we'll politely ask you to enter your billing information and you will be billed on the day after your trial ends for the following month.  If for some reason we aren't a good fit, then we'll put your account on hold until further notice.  If you get busy and forget to put in all your info, we have a grace period so you won't lose any data.<div class=\"vspace\"></div><h3>When will I be billed?</h3>You will be billed the day after your trial ends for the following month. You will be billed every month thereafter.<div class=\"vspace\"></div><h3>Do you take American Express?</h3>Yep.  We accept Visa, MasterCard, AmEx, and Discover. After you log in, you can add your card using the \"Account\" link at the top right of the page.  If none of these options work for you, we can accept check, purchase order and <a href=\"http://en.wikipedia.org/wiki/Fictional_currency\" target=\"_blank\">gold-pressed latinum</a> by special arrangement only. You may pay via check if you pre-pay for a year in advance. To pay via check, please <a href=\"mailto:payment@dxdt.io\">email us.</a></div><div class=\"span8\"><h3>What if I add more servers than my plan?</h3>If you start monitoring more servers than are in your plan, we'll politely email you and ask you to upgrade.  Don't worry! You won't lose any data or face any crazy fees.  We do business like people should.<div class=\"vspace\"></div><h3>Do you offer performance consulting?</h3>Yes, professional services are available starting at $150<span class=\"unit\">/hr.</span>  We can help you install, analyze your data, plan capacity, configure servers and advise you on best-practices.<div class=\"vspace\"></div><h3>Is there a minimum commitment?</h3>There is no long-term obligation; dxdt is a month-to-month service.  If you cancel, you will not be billed again.<div class=\"vspace\"></div><h3>Do you support Windows?</h3>Not yet. Please <a href=\"mailto:windows@dxdt.io\">email us</a> and we'll tell you when we add windows support.</div></div><div class=\"vspace2\"></div></div></div></div></div></div>\n<script type=\"text/javascript\">\n//<![CDATA[\n$(function(){\n  $('#email').focus();\n})\n//]]>\n</script>\n";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/port-monitoring": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<style type=\"text/css\">\n.main ul > li{\n  color: #333;\n  font-size:18px;\n  line-height:36px;\n\n}\n\n.main p{\n  color:#444\n}\n\n</style><div class=\"app\"></div><div class=\"home\"><div class=\"vspace\"></div><div class=\"body container rounded\"><div class=\"vspace\"></div><div class=\"container main\"><h1>Port Monitoring <small style=\"color:#666\">100% Automatic: No Configuration.</small> </h1><div class=\"row\"><div class=\"span8\"><h2>Every open TCP port on every machine.</h2><p>Port monitoring tells you:</p><ul><li>What process is listening on which port</li><li>When was the Port was opened</li><li>Which host the port is bound to</li></ul></div><div class=\"span8\"><h2>Other Features:</h2><ul><li><b> <a href=\"/process-monitoring\">Process Monitoring</a> </b>tracks the RAM and CPU usage of every process on the machine.</li><li> <a href=\"/system-monitoring\">System Monitoring</a> watches the Load, disk space and</li><li> <a href=\"/event-streams\">Event Streaming</a> is like Twitter for servers.</li></ul></div></div><div style=\"text-align:center\" class=\"span8\"><div class=\"vspace2\"></div><a href=\"/plans\" class=\"btn primary\"><big><b>Start Your 30-day FREE trial »</b></big></a><br />No Credit Card required.<div class=\"vspace2\"></div></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/process-monitoring": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<style type=\"text/css\">\n.main ul > li{\n  color: #333;\n  font-size:18px;\n  line-height:24px;\n}\n\n.main p{\n  color:#444\n}\n\n</style><div class=\"app\"></div><div class=\"home\"><div class=\"vspace\"></div><div class=\"body container rounded\"><div class=\"vspace\"></div><div class=\"container main\"><h1>Process Monitoring <small style=\"color:#666\">100% Automatic: No Configuration.</small> </h1><div class=\"row\"><div class=\"span8\"><p><span class=\"highlight\">dxdt is like a searchable, graphed version of `top` that works across all of your machines</span></p><h3>For every process on the machine, you'll see:</h3><ul><li>RAM & CPU Usage</li><li>The  <a href=\"/port-monitoring\">TCP Ports</a> this process is listening on</li><li> <a href=\"/event-streams\">Critical events</a> and custom notes.</li><li>The command-line options used to start the program</li><li>When the process started and ended</li></ul><p>You can monitor your systems for performance problems, plan capacity, and <span class=\"highlight\">perform a root cause analysis faster and easier than anything else.</span> <a href=\"/plans\">Try dxdt</a> and see for yourself.</p><div class=\"vspace2\"></div><div class=\"row\"><div style=\"text-align:center\" class=\"span8\"><a href=\"/plans\" class=\"btn primary\"><big><b>Start Your 30-day FREE trial »</b></big></a><br />  No Credit Card required.</div></div><div class=\"vspace2\"></div><h2 id=\"terminated\">Search Terminated Processes</h2><p>With dxdt, you can use regular expressions to search through all your currently running processes and all processes that have terminated within the last 4 weeks.</p><p>Click on the name of a process and you'll see its detailed performance history. You can drill down, compare, and annotate graphs for the <b>fastest</b> root cause analysis.</p></div><div class=\"span8\"><br /><br /><img src=\"/process-monitoring.png\" width=\"459px\" height=\"507px\" class=\"pop\" /><div class=\"vspace2\"></div><center>This is just a placeholder image for now while we're in Beta.<div class=\"vspace\"></div><p><a href=\"/plans\">Start your FREE 30-day trial  »</a></p></center></div></div><div class=\"vspace2\"></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/signup": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<div class=\"app\"></div><div class=\"home\"><div class=\"vspace\"></div><div class=\"body container rounded\"><div class=\"vspace\"></div><div class=\"container main\"><form method=\"POST\" action=\"/signup\" autocomplete=\"off\"><fieldset><legend>Please fix the errors below:</legend>" +
this.render("marketing/signup_fields", {fields: fields, errors: errors }) +
"<div style=\"background:none;border:none;margin-top:0px\" class=\"actions\"><button type=\"submit\" value=\"Create Account\" tabindex=\"6\" class=\"btn primary\"><b>Start FREE 30-Day Trial »</b></button></div></fieldset></form></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/signup_fields": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";locals || (locals={})
locals.fields || (fields={})
locals.errors || (errors={})

//avoid passing this stuff in every time.
this.app.fields = fields
this.app.errors = errors
; _$output = _$output  +
this.render("form/input", {label:"Email address", name: "email", ti: 1, errMsg: " Please enter a valid email"}) +
this.render("form/input", {label:"Password", name: "password", ti: 2, type:"password", errMsg:"Must be between 4 and 80 letters"}) +
this.render("form/input", {label:"Cell Phone", name: "cell", ti: 3, tip:'Used for SMS Alerts, Security and Account Information'}) +
"<div class=\"clearfix\"><label>Plan</label><div class=\"input\"><select name=\"plan\" tabindex=\"4\">" + 
this.render("form/options", {options:[["Small", "s1"], ["Medium", "m1"], ["Large", "l1"], ["X-Large", "xl1"], ["Custom", "custom"]] }) + 
"</select></div></div>" +
this.render("form/checkbox", {label:"Terms of Service", name: "tos", ti: 5, additionalText: 'I have read and agree to the <a href="/terms" target="_blank">Terms of Service</a>', wrapperStyle:"margin-bottom:0px", errMsg:"You must agree to the TOS to continue."});
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/system-monitoring": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<style type=\"text/css\">\n.main ul > li{\n  color: #333;\n  font-size:18px;\n  line-height:36px;\n\n}\n\n.main p{\n  color:#444\n}\n\n</style><div class=\"app\"></div><div class=\"home\"><div class=\"vspace\"></div><div class=\"body container rounded\"><div class=\"vspace\"></div><div class=\"container main\"><h1>Server Monitoring <small style=\"color:#666\">100% Automatic: No Configuration. <a href=\"/easiest-server-monitoring\">One-minute install.</a> </small> </h1><div class=\"row\"><div class=\"span8\"><h2>Load Avg &amp; Disk Usage</h2><p>Ensure your servers don't get overloaded by monitoring load average. Chart free space on disk to keep plenty of headroom to avoid disk full errors. You can also see how long each disk usage check takes to monitor disk latency.</p><h2>Server Processes</h2><p>See which processes are using the CPU and RAM, and quickly drill down into the <a href=\"/process-monitoring\">detailed performance history</a> of each process.</p></div><div class=\"span8\"><h2>Networking</h2><p>See <a href=\"/port-monitoring\">every open port</a> for all your machines, their IP addresses and current configuration.</p><h2>Event Streams:</h2><p> <a href=\"/event-streams\">Event Streaming</a> shows you what is happening at a high level, like Twitter for servers.</p><div class=\"vspace2\"></div><div class=\"row\"><div style=\"text-align:center\" class=\"span8\"><a href=\"/plans\" class=\"btn primary\"><big><b>Start Your 30-day FREE trial »</b></big></a><br />  No Credit Card required.</div></div><div class=\"vspace2\"></div></div></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "marketing/terms": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<div class=\"app\"></div><div class=\"home\"><div class=\"vspace\"></div><div class=\"body container\"><div class=\"vspace\"></div><div class=\"container main\"><div class=\"row\"><div class=\"span4\">&nbsp;</div><div class=\"span8\"><h1>Terms Of Service</h1>THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</div></div><div class=\"vspace\"></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "mem": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<h3>% Memory</h3><div style=\"width:400px;height:200px\" class=\"flotGraph\"></div><div class=\"lastupdated\"></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "minimal_layout": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html>" + 
'<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">' +
'<meta http-equiv="content-language" content="en">' +
"<head><link rel=\"stylesheet\" href=\"/app.css?" +
this.escape(q) +
"\" media=\"all\" /><script src=\"/transitive.js?" +
this.escape(q) +
"\"></script><script src=\"/templates.js?" +
this.escape(q) +
"\"></script>\n<script type=\"text/javascript\">\n//<![CDATA[\nTransitive = require(\"./transitive\");\nTransitive.Views.templates = require(\"./templates.js\");\njQuery = $;\nif(window.console){}else{\n  console = {};\n  console.log = function(){}\n}\n\n//]]>\n</script>\n<title>dxdt.io Change over time</title></head><body class=\"home marketing\"><div class=\"topbar\"><div class=\"fill\"><div class=\"container\"><h3><a href=\"/\" class=\"logo\"><img src=\"/logotype-small.png\" width=\"52px\" height=\"22px\" /></a></h3></div></div></div><div class=\"app\"></div><div class=\"vspace2\"></div><div class=\"container body rounded\"><div class=\"vspace\"></div>" +
content + 
"</div>" +
this.render("footer") +
"<div class=\"clear\"></div>\n<script type=\"text/javascript\">\n//<![CDATA[\n" +
etc +
"\nTransitive.boot();\n//]]>\n</script>\n</body></html>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "pidRow": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<b> Id: " +
this.escape( id ) +
"  </b>Stats: <span>" + 
this.escape(stats) + 
"</span> ";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "ping": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<p>Ping:</p><div style=\"width:600px;height:400px\" class=\"flotGraph\"></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "process": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";
this.crumbs = ["Staging", "Web Server 1", "Processes"]
; _$output = _$output  +
"<div class=\"row\"><div class=\"span4 leftnav\"><div class=\"nav-category\"><h3><div class=\"ico\">♛</div><a href=\"/\">Staging</a></h3><div class=\"listing active\"> <a href=\"/\">Servers</a> </div><div class=\"listing\"> <a href=\"/\">Urls</a> </div><div class=\"listing\"> <a href=\"/\">Notes</a> </div></div><div class=\"nav-category\"><h3><div class=\"ico\">♞</div><a href=\"/\">Web Server 1</a></h3><div class=\"listing active\"> <a href=\"/\">Processes</a> </div><div class=\"listing\"> <a href=\"/\">CPU</a> </div><div class=\"listing\"> <a href=\"/\">Memory</a> </div><div class=\"listing\"> <a href=\"/\">Disk</a> </div><div class=\"listing\"> <a href=\"/\">Network</a> </div><div class=\"listing\"> <a href=\"/\">Notes</a> </div></div><div class=\"nav-category\"><h3><div class=\"ico\">♟</div><a href=\"/\">node</a></h3><div class=\"listing active\"> <a href=\"/\">metrics</a> </div><div class=\"listing\"> <a href=\"/\">Ports (4)</a> </div><div class=\"listing\"> <a href=\"/\">Alerts</a> </div><div class=\"listing\"> <a href=\"/\">Notes</a> </div></div></div><div class=\"span12\"><div style=\"margin-bottom:3px;\" class=\"page-header\"><h1>node <small class=\"strong\">PID: 42141 &nbsp; Started: Mon Sep 12 7:58 PM UTC</small> </h1></div><div style=\"margin-bottom:17px\" class=\"code\"> <input style=\"width: 100%;\" value=\"node /usr/local/bin/restartr -c lessc -a public/lesscss/bootstrap.less -a public/app.css public/lesscss/bootstrap.less public/lesscss/dxdt.less public/lesscss/forms.less public/lesscss/patterns.less public/lesscss/preboot.less public/lesscss/reset.less public/lesscss/scaffolding.less public/lesscss/tables.less public/lesscss/type.less\" class=\"stealth\" /> </div><div class=\"row\"><div class=\"span12\"><div style=\"width:100%;height:300px;background-color:#666;color:white\" class=\"graph\">zoom view</div><div style=\"width:100%;height:75px;background-color:#666;margin-top:20px;color:white\" class=\"graph\">overview</div></div><div class=\"graph-options span4\"><h3>Stats</h3><ul class=\"unstyled\"><li> <input type=\"checkbox\" checked=\"checked\" /> Mem%</li><li> <input type=\"checkbox\" checked=\"checked\" /> CPU%</li><li> <input type=\"checkbox\" /> time</li><li> <input type=\"checkbox\" /> utime</li><li> <input type=\"checkbox\" /> rss</li><li> <input type=\"checkbox\" /> vsz</li></ul></div><div class=\"graph-options span4\"><h3>Annotate</h3><ul class=\"unstyled\"><li> <input type=\"checkbox\" checked=\"checked\" /> Process Notes</li><li> <input type=\"checkbox\" checked=\"checked\" /> Web Server 1 Notes</li><li> <input type=\"checkbox\" checked=\"checked\" /> Staging Notes</li></ul></div><div class=\"graph-options span4\"><h3>Additional Stats</h3><input type=\"text\" placeholder=\"server or environment stats\" class=\"search\" /></div></div><div class=\"row\"><div class=\"span12\"><h2>Events</h2><div class=\"row\"><div class=\"span4\"><h3>Wed Sep 14</h3></div><div class=\"span8\"><div class=\"alert-message\">9:22 AM UTC Began listening to port 3000</div></div></div><hr /><div class=\"row\"><div class=\"span4\"><h3>Mon Sep 12</h3></div><div class=\"span8\"><div class=\"alert-message success\">8:05 PM UTC CPU stayed below 80% for 2 Minutes</div><div class=\"alert-message error\">7:58 PM UTC CPU Exceeded 90%  for 2 Minutes</div><div class=\"alert-message\">2:22 PM UTC Process Started</div></div></div></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "sample-data-ping": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output=this.renderLive("zoomableFlot", "ping", timeSeries);;
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "server/ips": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<h2>IP Addresses</h2>" +
"";
var ipReg = /inet (\d+\.\d+\.\d+\.\d+)/g
var match, str;
str = ifconfig
do {
  match = ipReg.exec(str);
  if(match){
    str = str.substr(match.index + 1);
    ip = match[1];; _$output = _$output  +
this.escape(ip) +
"<br />" +
"";}
}while(match !== null); _$output = _$output ;
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "server/networking": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";
this.crumbs = [["/environment/1", "Staging"], ["/server/123", "Web Server 1"], ["", "Networking"]]
; _$output = _$output  +
"<div class=\"row\"><div class=\"span4 leftnav\"><div class=\"nav-category\"><h3><div class=\"ico\">♛</div><a href=\"/\">Staging</a></h3><div class=\"listing active\"> <a href=\"/\">Servers</a> </div><div class=\"listing\"> <a href=\"/\">Notes</a> </div></div><div class=\"nav-category\"><h3><div class=\"ico\">♞</div><a href=\"/server/123\">Web Server 1</a></h3><div class=\"listing\"> <a href=\"/process\">Processes</a> </div><div class=\"listing\"> <a href=\"/\">metrics</a> </div><div class=\"listing active\"> <a href=\"/\">Networking</a> </div><div class=\"listing\"> <a href=\"/\">Notes</a> </div></div></div><div class=\"span12\"><div class=\"page-header\"><h1>Web Server 1 - Networking <small class=\"strong\"></small> </h1></div><h2>hostname</h2>" +
this.escape(status.machine.hostname) +
"<div class=\"vspace\"></div><h2>Open Ports</h2>This hostname:port list shows you what ports are open and bound to a specific host.  If the host is \"*\", then that means the machine will accept connections on any host.  A host can be an ip address or localhost.<div class=\"vspace\"></div>" +
(function () { var __result__ = [], __key__, proc; for (__key__ in Object.keys(status.ports)) { if (Object.keys(status.ports).hasOwnProperty(__key__)) { proc = Object.keys(status.ports)[__key__]; __result__.push(
(function () { var __result__ = [], __key__, port; for (__key__ in status.ports[proc]) { if (status.ports[proc].hasOwnProperty(__key__)) { port = status.ports[proc][__key__]; __result__.push(
"<a href=\"" + this.escape("/processes/"+status.processes.ids[proc]) + "\">" + 
this.escape(port.host+":") +
this.escape(port.port) + 
"</a><br />"
); } } return __result__.join(""); }).call(this)
); } } return __result__.join(""); }).call(this) +
"<div class=\"vspace\"></div>" +
this.render("server/ips", {ifconfig: status.machine.ifconfig}) +
"<div class=\"vspace\"></div><h2>ifconfig -a</h2><pre>" + 
this.escape(status.machine.ifconfig) + 
"</pre></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "server/processes": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="<div class=\"row\"><div class=\"span4 leftnav\"><div class=\"nav-category\"><h3><div class=\"ico\">♛</div><a href=\"/\">Staging</a></h3><div class=\"listing active\"> <a href=\"/\">Servers</a> </div><div class=\"listing\"> <a href=\"/\">Urls</a> </div><div class=\"listing\"> <a href=\"/\">Notes</a> </div></div><div class=\"nav-category\"><h3><div class=\"ico\">♞</div><a href=\"/\">Web Server 1</a></h3><div class=\"listing active\"> <a href=\"/\">Processes</a> </div><div class=\"listing\"> <a href=\"/\">CPU</a> </div><div class=\"listing\"> <a href=\"/\">Memory</a> </div><div class=\"listing\"> <a href=\"/\">Disk</a> </div><div class=\"listing\"> <a href=\"/\">Network</a> </div><div class=\"listing\"> <a href=\"/\">Notes</a> </div></div></div><div class=\"span12\"><h1>Processes</h1><div class=\"row\"><div style=\"border-right:1px solid black; margin-right: -1px\" class=\"span6\"><h2>Most Memory</h2></div><div class=\"span6\"><h2>Most CPU</h2></div></div><div class=\"row\"><div class=\"span12 column\"><table class=\"zebra-striped\"><thead><tr><th>PID</th>" +
"";columns = "lstart ucomm mem cpu rss vsz utime time".split(" "); _$output = _$output  +
"";for(idx in columns){; _$output = _$output  +
"<th>" + 
this.escape(columns[idx].toUpperCase()) + 
"</th>" +
"";}; _$output = _$output  + 
"</tr></thead><tbody>" + 
"";for(pid in status.processes.lstart){
status.processes.lstart[pid] = new Date(Date.parse(status.processes.lstart[pid])).toDateString(); _$output = _$output  +
"<tr><td>" + 
this.escape(pid) + 
"</td>" +
"";for(idx in columns){; _$output = _$output  +
"<td>" + 
"";name = columns[idx]; _$output = _$output  +
this.escape((status.processes[name] && status.processes[name][pid])) + 
"</td>" +
"";}; _$output = _$output  + 
"</tr>" +
"";}; _$output = _$output  + 
"</tbody></table></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "server/server": function anonymous(locals) {
with(locals || {}) {
  try {
   var _$output="";
this.crumbs = [["/environment/1","Staging"], ["","Web Server 1"]]
; _$output = _$output  +
"<div class=\"row\"><div class=\"span4 leftnav\"><div class=\"nav-category\"><h3><div class=\"ico\">♛</div><a href=\"/\">Staging</a></h3><div class=\"listing active\"> <a href=\"/\">Servers</a> </div><div class=\"listing\"> <a href=\"/\">Notes</a> </div></div><div class=\"nav-category\"><h3 class=\"active\"><div class=\"ico\">♞</div><a href=\"/server/123\">Web Server 1</a></h3><div class=\"listing\"> <a href=\"/\">Metrics</a> </div><div class=\"listing\"> <a href=\"/\">Processes</a> </div><div class=\"listing\"> <a href=\"/server/123/networking\">Networking</a> </div><div class=\"listing\"> <a href=\"/\">Notes</a> </div></div></div><div class=\"span12\"><div class=\"page-header\"><h1>Web Server 1 <small class=\"strong\">" + 
this.escape(status.machine.hostname) + 
"</small> </h1></div><div class=\"row\"><div class=\"span6\"><h2>Processes</h2>See your top processes<br /><a href=\"/server/123/processes\">Processes</a></div><div class=\"span6\"><h2>Metrics</h2>Load AVG, Disk Usage<br /><a href=\"/server/123/metrics\">Metrics</a></div></div><div class=\"vspace\"></div><div class=\"row\"><div class=\"span6\"><h2>Networking</h2>Open ports, IP addresses, ifconfig<br /><a href=\"/server/123/networking\">Networking</a></div><div class=\"span6\"><h2>Notes</h2>Deploys, notes, changes &amp;etc.<br /><a href=\"/server/123/comments\">Notes</a></div></div><div class=\"vspace\"></div><div class=\"row\"><div class=\"span12\"><h2>Events</h2><div class=\"row\"><div class=\"span4\"><h3>Wed Sep 14</h3></div><div class=\"span8\"><div class=\"alert-message\">9:22 AM UTC Began listening to port 3000</div></div></div><hr /><div class=\"row\"><div class=\"span4\"><h3>Mon Sep 12</h3></div><div class=\"span8\"><div class=\"alert-message success\">8:05 PM UTC CPU stayed below 80% for 2 Minutes</div><div class=\"alert-message error\">7:58 PM UTC CPU Exceeded 90%  for 2 Minutes</div><div class=\"alert-message\">2:22 PM UTC Process Started</div></div></div></div></div></div></div>";
 return _$output;  } catch (e) {
    return "\n<pre class='error'>" + this.escape(e.stack) + "</pre>\n";
  }
}
}
,  "render": "function(k, v){ return this[k](v); }"
,  "liveRenders": {  "prepend": {  "name": "prepend"
,  "prepare": function (templateName, data){
    var itemsHtml = [];

    for(var i = data.length - 1; i >= 0; i--){
      itemsHtml.push(this.render(templateName, data[i]));
    }

    return itemsHtml.join();
  }
,  "update": function (event){
    this.element.prepend(Transitive.Views.render(this.templateName, event));
  }
}
,  "replace": {  "name": "replace"
,  "prepare": function (templateName, data){
    return this.render(templateName, data);
  }
,  "update": function (ev){
    this.element.html(Transitive.Views.render(this.templateName, ev));
  }
}
,  "simpleFlot": {  "name": "simpleFlot"
,  "prepare": function (templateName, data){
    return this.render(templateName, data);
  }
,  "init": function (initialData){
    this.data = initialData;
    console.log(this.data)

    var flotElm = this.element.find(".flotGraph");

    this.updatedElm = this.element.find(".lastupdated");

    var options = {
        shadowSize: 0,
        series: {
          lines: { show: true },
          points: { show: true }
        }, // drawing is faster without shadows
        yaxis: { min: 0, max: 100 },
        xaxis: {
          mode: "time",
          timeformat: "%M:%S"
        }
    };

    this.flot = $.plot(flotElm, [this.data], options);
    this.flot.draw();

  }
,  "update": function (event){
    console.log(event);
    this.data.push(event);
    if(this.data.length > 30){
      this.data.shift();
    }

    this.flot.setData([this.data]);
    this.flot.setupGrid();
    // since the axes don't change, we don't need to call plot.setupGrid()
    this.flot.draw();

    this.updatedElm.text((new Date).toString());
  }
}
,  "zoomableFlot": {  "name": "zoomableFlot"
,  "prepare": function (templateName, data){
    return this.render(templateName, data);
  }
,  "init": function (initialData){
    this.data = initialData;

    var flotElm = this.element.find(".flotGraph");

    this.updatedElm = this.element.find(".lastupdated");

    var options = {
        shadowSize: 0,
        series: {
          lines: { show: true },
          points: { show: false }
        }, // drawing is faster without shadows
        selection: { mode: "x" },
        yaxis: {},
        xaxis: {
          mode: "time",
          timeformat: "%M:%S"
        }
    };

    var len = this.data.length;

    if(len > 400){
      this.data = compressData(400, this.data);
      console.log(this.data)

    }

    this.flot = $.plot(flotElm, [this.data], options);
    this.flot.draw();


    function compressData(buckets, data){
      var result = [];
      var startTime = data[0][0];
      var endTime = data[data.length - 1][0];
      var windowSize = (endTime - startTime)/buckets;

      var bucketIdx=0, offset=0;
      var nextWindowBoundary, nextWindowStartTime;

      var currentItem=0, currentAvg, currentTotal, currentWindowSize, currentTime;

      for(bucketIdx = 0; bucketIdx < buckets; bucketIdx++){
        nextWindowStartTime = startTime + (bucketIdx + 1 ) * windowSize;

        currentTotal = 0;
        currentWindowSize = 0;
        for(; data[currentItem][0] < nextWindowStartTime; currentItem++){
          currentTotal = currentTotal + data[currentItem][1];
          currentWindowSize++;
        }

        if(currentWindowSize > 0 ){
          console.log(currentTotal);
          currentAverage = currentTotal / currentWindowSize;
          currentTime = startTime + bucketIdx * windowSize;
          result.push([currentTime, currentAverage]);
        }
      }
      return result;
    }
  }
,  "update": function (event){
    console.log(event);
    this.data.push(event);
    if(this.data.length > 30){
      this.data.shift();
    }

    this.flot.setData([this.data]);
    this.flot.setupGrid();
    // since the axes don't change, we don't need to call plot.setupGrid()
    this.flot.draw();

    this.updatedElm.text((new Date).toString());
  }
}
}
};
    }).call(module.exports);
    
    _browserifyRequire.modules["./templates.js"]._cached = module.exports;
    return module.exports;
};

[].forEach(function (a) {
    _browserifyRequire.modules[a] = _browserifyRequire.modules["./templates.js"];
});
