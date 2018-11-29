const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

module.exports = () => {
  const adapter = new FileSync(`${__dirname}/../db.json`)
  const db = low(adapter)
  // If db.json is empty, initialize it with a users array
  db.defaults({ users: [] }).write()
}
