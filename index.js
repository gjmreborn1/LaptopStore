const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");

const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const laptopData = JSON.parse(json);

function productsController(req, res) {
    res.status(200).render("template-products", {laptopData});
}

function laptopController(req, res) {
    const id = req.query.id;

    if(id <= 0 || id > laptopData.length) {
        res.status(400).send("400 - Bad request");
    } else {
        res.status(200).render("template-laptop", {laptop: laptopData[id - 1]});
    }
}

app.use("/", express.static(`data`));
app.set("view engine", "ejs");
app.set("views", `${__dirname}/templates`);
app.get("/", productsController);
app.get("/index", productsController);
app.get("/products", productsController);
app.get("/laptop", laptopController);

app.get("*", (req, res) => {
    res.status(404).send("404 - Page not found");
});

app.listen(8080, () => console.log("Server is listening."));
