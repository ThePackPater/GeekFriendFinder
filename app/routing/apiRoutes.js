var friends = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDiff: 1000
        };

        var userData = req.body;
        var userScores = userData.scores;

        console.log("New User: " + userData);
        console.log("<--------------------------->");

        var totalDiff = 0;

        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDiff = 0;

            for (var b = 0; b < friends[i].scores[b]; b++) {

                totalDiff += Math.abs(parseInt(userScores[b]) - parseInt(friends[i].scores[b]));

                if (totalDiff <= bestMatch.friendDiff) {

                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDiff = totalDiff;
                }
            }
        }
        //console.log(bestMatch);

        friends.push(userData);

        res.json(bestMatch);
    });


};