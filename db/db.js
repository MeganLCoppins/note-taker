const fs = require("fs");
const util = require("util");
const uuid = require("uuid").v4;
const readfile = util.promisify(fs.readFile);
const writefile = util.promisify(fs.writeFile);

const db = {
    getNote: async function(){
        // read db file and return all saved notes as JSON.
        const newNote = await readfile("db/db.json", "utf8");
        return JSON.parse(newNote);
    },
    addNote: async function(newNote){
        // read db file
        const db = await this.getNote();
        // adding unique id to each note and add newNote to db array
        db.push({id: uuid(), ...newNote});
        // overwrite file 
        return writefile("db/db.json", JSON.stringify(db, null, 2))
    },
    deleteNote: async function(id){
        // read db file
        const db= await this.getNote();
        // filter array based on unique id
        const newDB = db.filter(newNote=> newNote.id !== id)
        // overwrite file
        return writefile("db/db.json", JSON.stringify(newDB, null, 2))
    }
}

module.exports = db