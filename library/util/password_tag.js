var lib = require('../../lib');

class passwordTag {
  static generate(userId, email) {
    var tag = JSON.stringify({
      c: new Date().getTime(),
      u: userId,
      e: email,
    });

    return lib.util.encryption.encrypt(tag);
  }

  static decrypt(tagEncrypted) {
    return lib.util.encryption.decrypt(tagEncrypted).then(function (tag) {
      var data = JSON.parse(tag);
      return data;
    });
  }
}

module.exports = passwordTag;
