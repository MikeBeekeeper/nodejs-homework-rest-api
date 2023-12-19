const app = require('./app')
const setupMongoConnection = require('./helpers/setupMongoConection')

setupMongoConnection()
  .then(() => app.listen(3000, async () => {
    console.log("Server running. Use our API on port: 3000")
  }))
  .catch(error => {
    console.log(error.message);
    process.exit(1)
  })