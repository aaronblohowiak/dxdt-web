var Cookies = require("cookies");
//var newId = require("uuid-pure");


module.exports = function(sessionsClient){
  var handler = new SessionHandler(sessionsClient);
  return handler;
};

function SessionHandler(sessions){
  this.sessions = sessions;
}

SessionHandler.prototype = {
  createSession: function(req, res, members, cb){
    var cookies = new Cookies(req, res);
    var sessionId = "/sessions/"+newId(64);
    cookies.set("sessid", sessionId, {secure: true, httpOnly: true});

    this.sessions.hmset(sessionId, members);
    this.sessions.expire(sessionId, 60 * 60,  cb); //last for an hour.
  },
  
  
  getSession: function(sessionId, cb){
    this.sessions.hgetall(sessionId, cb);
  },
  
  withSession: function (req, res, cb){
    var cookies = new Cookies(req, res);
    var sessionId = cookies.get("sessid");
    this.getSession(sessionId, cb);
  }
};