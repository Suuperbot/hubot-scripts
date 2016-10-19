// Description:
//   
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot [pug me | bomb <N>] - Receive a pug or <N> pugs
//

(function() {
  module.exports = function(robot) {
    robot.respond(/pug me/i, function(msg) {
      return msg.http("http://pugme.herokuapp.com/random").get()(function(err, res, body) {
        return msg.send(JSON.parse(body).pug);
      });
    });
    robot.respond(/pug bomb( (\d+))?/i, function(msg) {
      var count;
      count = msg.match[2] || 5;
      return msg.http("http://pugme.herokuapp.com/bomb?count=" + count).get()(function(err, res, body) {
        var i, len, pug, ref, results;
        ref = JSON.parse(body).pugs;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          pug = ref[i];
          results.push(msg.send(pug));
        }
        return results;
      });
    });
    return robot.respond(/how many pugs are there/i, function(msg) {
      return msg.http("http://pugme.herokuapp.com/count").get()(function(err, res, body) {
        return msg.send("There are " + (JSON.parse(body).pug_count) + " pugs.");
      });
    });
  };

}).call(this);
