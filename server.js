const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./db/db.json");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.use(express.static("public"));
// app.use(express.static("public")); makes the below code unneccessary
// app.get("/assets/css/styles.css", function(req, res){
//     res.sendFile(__dirname + "/public/assets/css/styles.css");
// });
// app.get("/assets/js/index.js", function(req, res){
//     res.sendFile(__dirname + "/public/assets/js/index.js");
// });


// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", function(req, res){
    return res.json(db);
})
// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

// GET /notes - Should return the notes.html file. (HTML route)
app.get("/notes", function(req, res){
    res.sendFile(__dirname + "/public/notes.html");
});


// GET * - Should return the index.html file (html route)
app.get("*", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))
