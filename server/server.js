const express = require("express");
const app = express();
const fs = require("fs");

let cities;

fs.readFile("./cities.json", "utf8", (err,data) => {
    if(err) {
        console.error(err);
    }
    cities = JSON.parse(data);
    // This can be done on the db/file level, but for simplicity I create id on the fly.
    cities["cities"] = cities["cities"].map(city => {
        city.id = city["name"].toLowerCase().replace(/\s/g, "-");
        return city;
    })

})


// At scale this request could be optimized by returning only particular fields instead of the whole db/file.
app.get("/cities", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(cities);
})


app.get("/landmarks/:id", (req, res) => {
    const id = req.params.id;
    res.set('Access-Control-Allow-Origin', '*');
    let landmarks = [];
    cities["cities"].forEach(city => {
        if(city.id === id){
            landmarks = city.landmarks;
        }
    })
    res.json(landmarks);
})

app.listen(8080, () => {console.log("Server started on port 8080")})