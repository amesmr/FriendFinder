const cardThumb = "x_rotating_card_v1.4/images/rotating_card_thumb2.png";

var friendslength;
$(document).ready(function () {
    // friends array defined global in server.js
    function init() {
        console.log("in survey init");
        $.get("/api/questions", function (questions) {
            // console.log(questions);
            for (i in questions) {
                // console.log(questions[i]);
                $("label[for=" + questions[i].name + "]").text(questions[i].question);
            }
        });
        $.get("api/friendslength", function (data) {
            friendslength = data;
            console.log("friendslength = " + friendslength);
        });
    }


    $("#add-friend").on("click", function (event) {
        event.preventDefault();
        // make a newFriend obj
        var myScores = [];
        myScores.push($("input:radio[name='social']:checked").val());
        myScores.push($("input:radio[name='books']:checked").val());
        myScores.push($("input:radio[name='outdoors']:checked").val());
        myScores.push($("input:radio[name='gourmet']:checked").val());
        myScores.push($("input:radio[name='travel']:checked").val());
        myScores.push($("input:radio[name='movies']:checked").val());
        myScores.push($("input:radio[name='family']:checked").val());
        myScores.push($("input:radio[name='pretty']:checked").val());
        myScores.push($("input:radio[name='sex']:checked").val());
        myScores.push($("input:radio[name='forever']:checked").val());

        console.log("my scores: " + myScores);
        var newFriend = {
            name: $("#name").val().trim(),
            index: friendslength,
            about_me: $("#about_me").val().trim(),
            seeking: $("#seeking").val().trim(),
            photo: $("#photo").val().trim(),
            scores: myScores
        }
        friendslength++;
        console.log("friendslength is " + friendslength);
        console.log("newFriend:");
        console.log(newFriend);
        $.post("/api/survey", newFriend)
            .done(function (everybody) {
                findMatch(newFriend, everybody);
            });
    });


    function findMatch(me, everybody) {
        var diffArry = [
            []
        ];
        var tmpDiff = 0;
        var friend;
        // first, remove current user from the array
        for (i in everybody) {
            if (everybody[i].index == me.index) {
                everybody.splice(i, 1);
                console.log("removed element " + i + " from everybody array");
                break;
            }
        }
        console.log(everybody);

        // now go find their closest match
        for (i in everybody) {
            tmpDiff = 0;
            for (j in everybody[i].scores) {
                // accumulate the difference for each question
                tmpDiff += parseInt(me.scores[j]) - parseInt(everybody[i].scores[j]);
            }
            // put it into an array
            diffArry.push([tmpDiff, everybody[i].index]);
        }
        diffArry.shift(); // the first element is an empty one from the var declaration
        console.log("unsorted array:");
        console.log(diffArry);
        diffArry.sort(function (a, b) {
            return b[0] - a[0];
        });
        console.log("sorted array:");
        console.log(diffArry);

        // best match should be in diffArry[0]

        // hide the form
        $(".my-class").addClass("hidden");
        // show the flip card
        $(".card-container").removeClass("hidden");
        for (i in everybody) {
            if (everybody[i].index == diffArry[0][1]) {
                friend = everybody[i];
            }

        }
        console.log("Matched friend:");
        console.log(friend);

        $.get("/api/questions", function (questions) {
            addFriendCard(friend, questions);
        });

    }


    function addFriendCard(friend, questions) {
        // hide the form
        $(".bootstrap-iso").addClass("hidden");

        var row = $("<div>");
        row.addClass("row");
        $(".container").append(row);

        var col = $("<div>");
        col.addClass("col-md-4 col-sm-4 col-md-offset-4 col-sm-offset-4");
        col.html("<h2>Meet Your Closest Match!</h2>")
        row.append(col);

        var row2 = $("<div>");
        row2.addClass("row");
        row.append(row2);

        // start of flip card
        // front of card
        var card_cont = $("<div>");
        // card_cont.addClass("card-container manual-flip");
        card_cont.addClass("card-container col-md-4 col-sm-4");
        row2.append(card_cont);

        var card = $("<div>");
        card.addClass("card single-card");
        card_cont.append(card);

        var front = $("<div>");
        front.addClass("front");
        card.append(front);

        var cover = $("<div>");
        cover.addClass("cover");
        front.append(cover);

        var coverImg = $("<img>");
        coverImg.attr("src", cardThumb);
        coverImg.attr("alt", "Image");
        cover.append(coverImg);

        var user = $("<div>");
        user.addClass("user")
        front.append(user);

        var userImg = $("<img>");
        userImg.addClass("img-circle");
        userImg.attr("src", friend.photo);
        userImg.attr("alt", "Friend's Pic");
        user.append(userImg);

        var content = $("<div>");
        content.addClass("content");
        front.append(content);

        var main = $("<div>");
        main.addClass("main");
        content.append(main);

        var name = $("<h3>");
        name.addClass("name");
        name.html(friend.name);
        main.append(name);

        var me = $("<h4>");
        me.addClass("profession");
        me.html("About Me: " + friend.about_me);
        main.append(me);

        var seeking = $("<h4>");
        seeking.addClass("text-center");
        seeking.html("Seeking: " + friend.seeking);
        content.append(seeking);

        var footer = $("<footer>");
        content.append(footer);

        var button = $("<button>");
        button.addClass("btn btn-simple");
        button.attr("onclick", "rotateCard(this)");
        footer.append(button);

        var fronti = $("<i>");
        fronti.addClass("fa fa-mail-forward");
        footer.append(fronti);

        // end of front card
        // start back of card
        var back = $("<div>");
        back.addClass("back");
        card.append(back);

        var backContent = $("<div>");
        backContent.addClass("content");
        back.append(backContent);

        var backMain = $("<div>");
        backMain.addClass("main");
        backContent.append(backMain);

        var backName = $("<h3>");
        backName.addClass("name");
        backName.html(friend.name);
        backMain.append(backName);

        var backMe = $("<h4>");
        backMe.addClass("profession");
        backMe.html("My Scores:");
        backMain.append(backMe);

        if (typeof (friend.scores) == "undefined") {
            var scores = friend["scores[]"];
            console.log(friend.name + "'s scores were undefined in survey.js.  Working around it.  Thanks, Renzo. ;)");
            for (i = 0; i < scores.length; i++) {
                var p = $("<p>");
                p.html(questions[i].question + " = " + scores[i]);
                backMain.append(p);
            }
        } else {
            for (i = 0; i < friend.scores.length; i++) {
                var p = $("<p>");
                p.html(questions[i].question + " = " + friend.scores[i]);
                backMain.append(p);
            }

        }

        var backFooter = $("<div>");
        backFooter.addClass("footer");
        back.append(backFooter);

        var backBtn = $("<button>");
        backBtn.addClass("btn btn-simple");
        backBtn.attr("rel", "tooltip");
        backBtn.attr("title", "Flip Card");
        backBtn.html("Back");
        backBtn.attr("onclick", "rotateCard(this)");
        backFooter.append(backBtn);

        var backi = $("<i>");
        backi.addClass("fa fa-reply")

    }

    init();
});