const fs = require("fs");
const util = require("util");
const readfile = util.promisify(fs.readFile);
const writefile = util.promisify(fs.writeFile);

// module.exports = {
//   async read() {
//     const notes = await readfile(__dirname + "/db.json", "utf8");
//     const db = JSON.parse(notes);
//     return writeFile("db/db.json", JSON.stringify(db));
//   }
// };

// readFile("db/db.json", "utf8").then(data => {
//     console.log(data);
//     const db = json.parse(data);
//     data.push(Hello);
//     console.log(db);
//     return writeFile("db/db.json", JSON.stringify(db));
// })
const uuid = require("uuid").v4

const db = {
    getNote: async function(){
        const newNote = await readfile("db/db.json", "utf8");
        return JSON.parse(newNote);
    },
    addNote: async function(newNote){
        // read db file
        // const notes = await readFile("db/db.json", "utf8");
        const db = await this.getNote();
        db.push({id: uuid(), ...newNote});
        return writefile("db/db.json", JSON.stringify(db, null, 2))
        
        // json.parse() to turn string into json obj
        // const newDB = json.parse(notes);
        // add note to db array
        // newDB.push(newNote)
        // write file 
    },
    deleteNote: async function(){
        const db= await this.getNote();
        console.log(db);
        // const newDB = db.filter(newNote=> newNote.id !== id)
        const newDB = db.filter(newNote => newNote.id);
        console.log(newDB);

        return writefile("db/db.json", JSON.stringify(newDB, null, 2))
    }
}

module.exports = db