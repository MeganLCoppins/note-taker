const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./db/db");

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


// GET /api/notes - grab read db.json file and returned notes as JSON from db.js file. (api route)
app.get("/api/notes", async function(req, res){
    return res.json(await db.getNote());
})
// POST /api/notes - Should receive a new note to save on the request body, add a unique id and add it to the db.json file, and then return the new note to the client. (api route)
app.post("/api/notes", async function(req, res){
    await db.addNote(req.body);
    res.send("adding new note")
})
// DELETE /api/notes/:id - receive a query parameter of a note to delete. (api route)
app.delete("/api/notes/:id", async function(req, res){
    const { id } = req.params;
    await db.deleteNote(id);
    res.send("Deleted note");
});

// GET /notes - Should return the notes.html file. (html route)
app.get("/notes", function(req, res){
    res.sendFile(__dirname + "/public/notes.html");
});

// GET * - Should return the index.html file (html route)
app.get("*", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));