// Dependencies
const express = require("express");
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const uniqID = require('uniqid');

// Express configuration
//Tells node that we are creating an 'express' server
const app = express();

// Sets an initial port.
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTES


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/db/db.json"))
})

app.post("/api/notes", function (req, res) {

    let newNote = req.body;
    let newID = uniqID();

    newNote.id = newID;

    fs.readFile("./db/db.json", (err, data) => {
        if(err) throw err;

        let dbFile = JSON.parse(data);
        dbFile.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(dbFile), "utf-8", err => {
            if(err) throw err;
            console.log('New Note was added!')
        })
    })

    res.redirect("/notes");

})




app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
});