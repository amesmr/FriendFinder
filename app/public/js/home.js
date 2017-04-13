const cardThumb = "x_rotating_card_v1.4/images/rotating_card_thumb2.png";

$(document).ready(function () {
    // friends array defined global in server.js
    function init() {
        console.log("in home init");
        $.get("/api/friends", function (friends) {
            console.log(friends);
            $.get("/api/questions", function (questions) {
                for (i in friends) {
                    console.log(i);
                    console.log(friends[i]);
                    addFriend(i, friends[i], questions);
                }
            });
        });
    }

    function addFriend(index, friend, questions) {
        // start of flip card
        // front of card
        var thisRow = Math.floor(index / 2);
        // console.log("Index is " + index);
        // console.log("This row is " + thisRow);
        if ((index % 2) == 0) {
            // console.log("Adding row " + thisRow);
            var row = $("<div>");
            // row.addClass("row row" + thisRow);
            row.addClass("row cards" + thisRow);
            $(".container").append(row);

        }
        var col = $("<div>");
        col.addClass("col-md-6 col-sm-6");
        $(".cards" + thisRow).append(col);

        var card_cont = $("<div>");
        // card_cont.addClass("card-container manual-flip");
        card_cont.addClass("card-container");
        col.append(card_cont);

        var card = $("<div>");
        card.addClass("card");
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
        main.append(seeking);

        var footer = $("<footer>");
        content.append(footer);

        // var button = $("<button>");
        // button.addClass("btn btn-simple");
        // button.attr("onclick", "rotateCard(this)");
        // button.html("Flip Over");
        // footer.append(button);

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

        if (typeof(friend.scores) == "undefined") {
            var scores = friend["scores[]"];
            console.log(friend.name + "'s scores were undefined in home.js.  Working around it.  Thanks, Renzo. ;)");
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