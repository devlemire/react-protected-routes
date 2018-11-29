const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

module.exports = () => {
  const adapter = new FileSync(`${__dirname}/../db.json`)
  const db = low(adapter)

  return db
}
