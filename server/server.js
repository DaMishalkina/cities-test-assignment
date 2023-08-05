const express = require("express");
const app = express();
const fs = require("fs");

let cities;

fs.readFile("./cities.json", "utf8", (err,data) => {
    if(err) {
        console.error(err);
    }
    cities = JSON.parse(data);
})

app.get("/cities", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(cities);
})

app.listen(8080, () => {console.log("Server started on port 8080")})