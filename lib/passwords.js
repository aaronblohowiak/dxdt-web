var bcrypt = require('bcrypt'); 

function toHash(password, cb){
  bcrypt.gen_salt(10, function(err, salt) {
      if(err) return cb(err);
      bcrypt.encrypt(password, salt, cb);
  });
}

function check(password, hash, cb){
  bcrypt.compare(password, hash, cb);
}

module.exports = {
  toHash: toHash,
  check: check
};
