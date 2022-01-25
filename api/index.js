// const fs = require("fs");
// const https = require("https");
const express = require('express')
// const vhost = require('vhost')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

require('../api/routes/main.routes')(app)
const db = require('../api/models/sequelize')

/* const httpsOptions = {
  key: fs.readFileSync("./ssl/index.key"), // путь к ключу
  cert: fs.readFileSync("./ssl/index.crt"), // путь к сертификату
};
const ssl_server = https.createServer(httpsOptions, app).listen(8443, () => {
  const { port } = ssl_server.address();
  console.log("App listening the", port);
}); */

// {force: true}
// const Role = db.role

db.sequelize.sync().then()

/*  .then(() => {
  initial();
}); */

/* function initial() {
  Role.create({
    id: 1,
    name: 'admin',
  })

  Role.create({
    id: 2,
    name: 'worker',
  })
} */

// Create a Server
app.listen(8081, () => {
  // const { address: host, port } = index.address()
  // console.log('App listening at http://%s:%s', host, port)
})
