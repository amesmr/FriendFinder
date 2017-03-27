module.exports = function (app, path) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
    app.get("/css/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/css/" + req.params[0]));
    });
    app.get("/img/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/img/" + req.params[0]));
    });
    app.get("/x_rotating_card_v1.4/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/css/x_rotating_card_v1.4/" + req.params[0]));
    });
    app.get("/server/", function (req, res) {
        res.sendFile(path.join(__dirname, "../../server.js"));
    });
    app.get("/js/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/js/" + req.params[0]));
    });
}