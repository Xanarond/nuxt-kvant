const { Client } = require("pg")
const insp = require("../data/inspection.json")
const env = require("../config/db.config")

const conn = `postgres://${env.USER}:${env.PASSWORD}@${env.HOST}/${env.DB}` // connection config
const client = new Client({
  connectionString: conn,
  idle_in_transaction_session_timeout: 3000
  // query_timeout: 300,
})
client.connect()

exports.mainTable = (req, res) => {
  let total = {}
  const currentDateresult = []
  const p1 = new Promise((resolve, reject) => {
    try {
      const sql_req = `SELECT "id", "MATERIAL", "CLAIM", "INCH (FACT)", "SERIAL NUMBER", "SU", "DESTINATION", "CODE", "RB BARCODE", "COMMENT", "Upload DATE", "1st Insp DATE", "2nd Insp DATE", "Putaway DATE", "Outbound DATE", "Scrap DATE", "createdAt", "updatedAt" FROM public.total_kwant`
      client.query(sql_req, (err, result) =>
        err ? console.log(err.stack) : currentDateresult.push(result.rows)
      )

      setTimeout(() => resolve(currentDateresult), 500) // add timeout for load data
      setTimeout(() => reject(new Error("Something went wrong!")), 500)
    } catch (e) {
      console.log(e)
    }
  })
  p1.then(values => {
    total = values
    res.send(total.flat(2))
  }).catch(e => {
    console.log(e, "No response from the server")
  })
}

exports.inspectionTable = (req, res) => {
  res.json(insp)
}

exports.repairTable = (req, res) => {
  res.json(insp)
}

exports.storageTable = (req, res) => {
  res.json(insp)
}

exports.archiveTable = (req, res) => {
  res.json(insp)
}

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.")
}

