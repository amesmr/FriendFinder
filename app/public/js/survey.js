const cardThumb = "x_rotating_card_v1.4/images/rotating_card_thumb2.png";

var friendslength = 0;
$(document).ready(function () {
    // friends array defined global in server.js
    function init() {
        console.log("in survey init");
        $.get("/api/questions", function (questions) {
            console.log(questions);
            for (i in questions) {
                console.log(questions[i]);
                $("label[for=" + questions[i].name + "]").text(questions[i].question);
            }
        });
        $.get("api/friendslength", function (data) {
            friendslength = data;
        });
    }


    $("#add-friend").on("click", function (event) {
        event.preventDefault();
        // make a newFriend obj
        var newFriend = {
            name: $("#name").val().trim(),
            index: friendslength,
            description: $("#about_me").val().trim(),
            seeking: $("#seeking").val().trim(),
            pic_link: $("#photo").val().trim(),
            scores: [
                $("#social").val(),
                $("#books").val(),
                $("#outdoors").val(),
                $("#gourmet").val(),
                $("#travel").val(),
                $("#movies").val(),
                $("#family").val(),
                $("#pretty").val(),
                $("#sex").val(),
                $("#forever").val()
            ]
        }
        console.log("newFriend:");
        console.log(newFriend);
        $.post("/api/survey", newFriend)
            .done(function (me, everybody) {
                console.log(me);
                findMatch(me, everybody);
            });
    });


    function findMatch(me, everybody) {
        var diffArry = [
            []
        ];
        var tmpDiff = 0
        console.log(everybody);
        for (i in everybody) {
            if (everybody[i].index = me.index) {
                diffArry[i] = i;
                diffArry[i][0] = null;
                continue;
            }
            for (j in everybody.scores) {
                tmpDiff += me.scores[j] - everybody[i].scores[j];
            }
            diffArry[i] = i;
            diffArry[i][0] = tmpDiff;
            console.log("pre-sorted array:");
            console.log(diffArry);
            diffArry.sort(function compareSecondColumn(a, b) {
                if (a[1] === b[1]) {
                    return 0;
                } else {
                    return (a[1] < b[1]) ? -1 : 1;
                }
            });
            console.log("sorted array:");
            console.log(diffArry);

            // best match should be in diffArry[0]

            // hide the form
            $(".my-class").addClass("hidden");
            // show the flip card
            $(".card-container").removeClass("hidden");
            addFriendCard(0, diffArry[0])

        }
    }


    function addFriendCard(index, friend) {
        // start of flip card
        // front of card
        var thisRow = Math.floor(index / 3);
        console.log("Index is " + index);
        console.log("This row is " + thisRow);
        if ((index % 3) == 0) {
            console.log("Adding row " + thisRow);
            var row = $("<div>");
            // row.addClass("row row" + thisRow);
            row.addClass("row cards" + thisRow);
            $(".container").append(row);

            // var offset = $("<div>");
            // offset.addClass("col-sm10 col-sm-offset-1 cards" + thisRow);
            // row.append(offset);
        }
        var col = $("<div>");
        col.addClass("col-md-4 col-sm-6");
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

        var title = $("<h4>");
        title.html("Survey Scores");

        for (i = 0; i < friend.scores.length; i++) {
            var p = $("<p>");
            p.html(friend.scores[i]);
            backMain.append(p);
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