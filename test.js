const uuid = require("uuid").v4;
const db = require("./db/db");

db.read().then(function(notes) {
  console.log(notes);
});

console.log(uuid());
