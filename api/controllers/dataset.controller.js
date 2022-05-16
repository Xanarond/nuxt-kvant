const { Client } = require("pg")
const env = require("../config/db.config")
const db = require("../models")

const { total: Total, inspection: Inspection } = db

const conn = `postgres://${env.USER}:${env.PASSWORD}@${env.HOST}/${env.DB}` // connection config
const client = new Client({
  connectionString: conn,
  idle_in_transaction_session_timeout: 3000
  // query_timeout: 300,
})
client.connect()

exports.postSerialNums = (req, res) => {
  console.log(req.body)
  // Total.bulkUpdate('total_kwant')
  Total.findAll({
    where: { "SU": req.body.serial_nums },
    raw: true
  })
    .then(data => {
      delete data.id
      console.log(data)
      Total.create(data)
      })
  Total.update({where: { "SU": req.body.serial_nums },})
  /* Total.bulkCreate(req.body.items,{ returning: true })
    .then((result) => {
      console.log(result);
    }); */
}

exports.postDataSet = (req, res) => {
  // console.log(req.body)
  Total.bulkCreate(req.body.items, { returning: true })
    .then((result) => {
      console.log(result)
    })
  console.log(req.body.items)
  Inspection.bulkCreate(req.body.items, { returning: true })
    .then((result) => {
      console.log(result)
    })
}
