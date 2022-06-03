const insp = require('../data/inspection.json')
const db = require('../models/index')

const { total: Total, inspection: Inspection, repair: Repair, storage: Storage, archive: Archive } = db

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.mainTable = (req, res) => {
  Total.findAll().then((data) => {
    res.send(data)
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.inspectionTable = (req, res) => {
  console.log(req.status)
  Inspection.findAll().then((data) => {
    res.send(data)
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.repairTable = (req, res) => {
  console.log(req.status)
  Repair.findAll().then((data) => {
    res.send(data)
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.storageTable = (req, res) => {
  console.log(req.status)
  Storage.findAll().then((data) => {
    res.send(data)
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.archiveTable = (req, res) => {
  Archive.findAll().then((data) => {
    res.send(data)
  })
}
