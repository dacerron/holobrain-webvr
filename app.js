const express = require("express");
const app = express();

const port = 8080;

app.get("/", (req,res) => {
        res.sendFile(__dirname + "/index.html")
});

app.use("/public/assets", express.static(__dirname + "/public/assets"))
app.use("/js", express.static(__dirname + "/js"))

app.listen(port)
