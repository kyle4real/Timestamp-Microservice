require("dotenv").config();

// init project
var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
    const param = req.params.date;
    let unix;
    let utc;
    if (!param) {
        const date = new Date();
        unix = date.getTime();
        utc = date.toUTCString();
        res.json({ unix, utc });
        return;
    }
    if (isNaN(+param)) {
        if (new Date(param).toString() === "Invalid Date")
            return res.json({ error: "Invalid Date" });
        const date = new Date(param);
        unix = date.getTime();
        utc = date.toUTCString();
    } else {
        if (new Date(+param).toString() === "Invalid Date")
            return res.json({ error: "Invalid Date" });
        const date = new Date(+param);
        unix = +param;
        utc = date.toUTCString();
    }
    res.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
