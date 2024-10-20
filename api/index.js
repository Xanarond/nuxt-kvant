// const fs = require("fs");
// const https = require("https");
require('dotenv').config()
const express = require('express')
const bcrypt = require('bcryptjs')
// const vhost = require('vhost')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.text({ limit: '50mb', defaultCharset: 'utf-8' }))
app.use(bodyParser.json({ limit: '50mb' })) // конфиг для пропуска больших данных
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

require('../api/routes/main.routes')(app)
const db = require('../api/models/index')
const { valid_obj } = require('./queries/validation')

/* const httpsOptions = {
  key: fs.readFileSync("./ssl/index.key"), // путь к ключу
  cert: fs.readFileSync("./ssl/index.crt"), // путь к сертификату
};
const ssl_server = https.createServer(httpsOptions, app).listen(8443, () => {
  const { port } = ssl_server.address();
  console.log("App listening the", port);
}); */

// {force: true}
const Role = db.role
const User = db.user
// { force: true }
db.sequelize.sync({ force: true })
  .then(() => {
    initial()
  })

function initial () {
  Role.bulkCreate([
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'worker'
    }
  ]).then(
    User.create({
      username: 'admin',
      division: '',
      password: bcrypt.hashSync('123', 8),
      role: 'admin'
    }).then((user) => {
      Role.findOne({
        where: {
          name: 'admin'
        }
      }).then((roles) => {
        user.setRoles(roles)
      })
    }))

  User.create({
    username: 'stock',
    division: 'Storage',
    password: bcrypt.hashSync('123', 8),
    role: 'worker'
  }).then((user) => {
    Role.findOne({
      where: {
        name: 'worker'
      }
    }).then((roles) => {
      user.setRoles(roles)
    })
  })

  User.create({
    username: 'insp',
    division: 'Inspection',
    password: bcrypt.hashSync('123', 8),
    role: 'worker'
  }).then((user) => {
    Role.findOne({
      where: {
        name: 'worker'
      }
    }).then((roles) => {
      user.setRoles(roles)
    })
  })

  User.create({
    username: 'repa',
    division: 'Repair',
    password: bcrypt.hashSync('123', 8),
    role: 'worker'
  }).then((user) => {
    Role.findOne({
      where: {
        name: 'worker'
      }
    }).then((roles) => {
      user.setRoles(roles)
    })
  })

  db.sequelize.query(valid_obj.inspection)
  db.sequelize.query(valid_obj.storage)
  db.sequelize.query(valid_obj.repair)
}

// Create a Server
app.listen(process.env.SERVER_PORT, () => {
  // const { address: host, port } = index.address()
  // console.log('App listening at http://%s:%s', host, port)
})
