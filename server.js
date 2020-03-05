const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

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


// GET /notes - Should return the notes.html file. (HTML route)
app.get("/notes", function(req, res){
    res.sendFile(__dirname + "/public/notes.html");
});


// GET * - Should return the index.html file (html route)
app.get("*", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))
