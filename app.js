const express = require("express");
const app = express();

const port = 8080;

app.get("/", (req,res) => {
        res.sendFile(__dirname + "/holobrain-webvr/index.html")
});

app.listen(port)
