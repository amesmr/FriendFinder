
module.exports = function (app, fs, friends) {
    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        console.log("In friends POST - object is:");
        console.log(newFriend);
        // add it to the reservations array
        friends.push(newFriend);
        fs.writeFile("app/data/friends.js", JSON.stringify(friends, null, 4), function (err) {
            if (err) throw err;
            console.log("friend saved");
        });
        res.json(newFriend);
        // res.data = true;
    });

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
}