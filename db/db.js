const fs = require("fs");
const util = require("util");
const readfile = util.promisify(fs.readFile);

module.exports = {
  async read() {
    const notes = await readfile(__dirname + "/db.json", "utf8");
    return JSON.parse(notes);
  }
};
