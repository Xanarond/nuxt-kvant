const { Client } = require('pg')
const insp = require('../data/inspection.json')
const env = require('../config/db.config')
const db = require('../models/index')

const conn = `postgres://${env.USER}:${env.PASSWORD}@${env.HOST}/${env.DB}` // connection config
const client = new Client({
  connectionString: conn,
  idle_in_transaction_session_timeout: 3000
  // query_timeout: 300,
})
client.connect()

const { repair: Repair } = db

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.mainTable = (req, res) => {
  let total = {}
  const currentDateresult = []
  const p1 = new Promise((resolve, reject) => {
    try {
      const sql_req = 'SELECT "id", "MATERIAL", "CLAIM", "INCH (FACT)", "SERIAL NUMBER", "SU", "DESTINATION", "CODE", "RB BARCODE", "COMMENT", "Upload DATE", "1st Insp DATE", "2nd Insp DATE", "2nd Insp TIME", "Putaway DATE", "Outbound DATE", "Scrap DATE", "Global Status", "Local Status", "Location", "BOX", "Responsible_user" FROM public.total_kwant'
      client.query(sql_req, (err, result) =>
        err ? console.log(err.stack) : currentDateresult.push(result.rows)
      )
      setTimeout(() => resolve(currentDateresult), 500) // add timeout for load data
      setTimeout(() => reject(new Error('Something went wrong!')), 500)
    } catch (e) {
      console.log(e)
    }
  })
  p1.then((values) => {
    total = values
    res.send(total.flat(2))
  }).catch((e) => {
    console.log(e, 'No response from the server')
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.inspectionTable = (req, res) => {
  let inspectionTotal = {}
  const currentDateresult = []
  const p1 = new Promise((resolve, reject) => {
    try {
      const sql_req = 'SELECT "id", "MATERIAL", "CLAIM", "INCH (FACT)", "SERIAL NUMBER", "SU", "STATUS", "BOX", "RB BARCODE", "COMMENT", "1st Insp DATE", "2nd Insp DATE", "Global Status", "Local Status", "Location", "BOX" FROM public.inspection;'
      client.query(sql_req, (err, result) =>
        err ? console.log(err.stack) : currentDateresult.push(result.rows)
      )
      setTimeout(() => resolve(currentDateresult), 500) // add timeout for load data
      setTimeout(() => reject(new Error('Something went wrong!')), 500)
    } catch (e) {
      console.log(e)
    }
  })
  p1.then((values) => {
    inspectionTotal = values
    res.send(inspectionTotal.flat(2))
  }).catch((e) => {
    console.log(e, 'No response from the server')
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.repairTable = (req, res) => {
  Repair.findAll().then((data) => {
    res.send(data)
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.storageTable = (req, res) => {
  res.json(insp)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.archiveTable = (req, res) => {
  res.json(insp)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.')
}
