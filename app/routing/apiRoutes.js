
module.exports = function (app, fs, friends, questions) {
    app.post("/api/survey", function (req, res) {
        var newFriend = req.body;
        console.log("In friends POST - object is:");
        console.log(newFriend);
        // add it to the reservations array
        friends.push(newFriend);
        fs.writeFile("app/data/friends.js", JSON.stringify(friends, null, 4), function (err) {
            if (err) throw err;
            console.log("friend saved");
        });
        return res.json(newFriend, friends);
        // res.data = true;
    });

    app.get("/api/friends", function (req, res) {
        // console.log("getting friends");
        // console.log(friends);
        return res.json(friends);
    });

    app.get("/api/friendslength", function (req, res) {
        // console.log("getting friends");
        // console.log(friends);
        return friends.length;
    });

    app.get("/api/questions", function (req, res) {
        // console.log("getting friends");
        // console.log(friends);
        return res.json(questions);
    });

}