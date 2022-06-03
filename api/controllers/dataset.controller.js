import TableMutation from '../mutations/tableMutation'
const fs = require('fs')
const { Client } = require('pg')
const XLSX = require('xlsx')
// const moment = require('moment')
const env = require('../config/db.config')
const db = require('../models')
const FILE_PATHNAME = process.env.FILE_PATHNAME
// FILE_PATHNAME = '//106.109.32.200/Logistic/pmakhotkin/Task_list/KWANTDB/Данные для импорта/Panels_test.xlsb'

const { total: Total, inspection: Inspection, storage: Storage, repair: Repair } = db

const conn = `postgres://${env.USER}:${env.PASSWORD}@${env.HOST}/${env.DB}` // connection config
const client = new Client({
  connectionString: conn,
  idle_in_transaction_session_timeout: 3000
  // query_timeout: 300,
})
client.connect()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.postSerialNums = (req, res) => {
  // let required_id = ''
  console.log(req.body)
  const table_inst = new TableMutation()
  const { serial_nums, global_status, local_status, location, box, username } = req.body
  table_inst.updateRows(serial_nums, global_status, local_status, location, box, username)

  /* const cur_date = moment().format('YYYY-MM-DD')
  const cur_time = moment().format('HH:mm:ss')
  console.log(req.body.serial_nums.length, req.body.serial_nums)
  const serialNums = req.body.serial_nums

  serialNums.forEach((val) => {
    Total.findOne({
      where: { SU: val },
      raw: true
    })
      .then((data) => {
        delete data.id
        Total.create(data).then((row) => {
          switch (req.body.global_status) {
            case 'Inspection':
              Total.update({
                'Global Status': req.body.global_status,
                'Local Status': req.body.local_status,
                Location: req.body.location,
                BOX: req.body.box,
                '2nd Insp DATE': cur_date,
                '2nd Insp TIME': cur_time,
                Responsible_user: req.body.username
              }, { where: { id: row.id } })
              break
            case 'Repair':
              Total.update({
                'Global Status': req.body.global_status,
                'Local Status': req.body.local_status,
                Location: req.body.location,
                BOX: req.body.box,
                Responsible_user: req.body.username
              }, { where: { id: row.id } })
              break
            default:
              Total.update({
                'Global Status': req.body.global_status,
                'Local Status': req.body.local_status,
                Location: req.body.location,
                BOX: req.body.box,
                Responsible_user: req.body.username
              }, { where: { id: row.id } })
              break
          }
        })
      })

    if (req.body.global_status === 'Inspection') {
      if (req.body.local_status === 'Scrap') {
        Inspection.destroy({
          where: {
            SU: val
          }
        })
      }
      Inspection.update({
        'Global Status': req.body.global_status,
        'Local Status': req.body.local_status,
        Location: req.body.location,
        BOX: req.body.box,
        '2nd Insp DATE': cur_date
      }, { where: { SU: val } })
    }

    if (req.body.global_status === 'Repair') {
      if (req.body.local_status === 'Scrap') {
        Repair.destroy({
          where: {
            SU: val
          }
        })
      }

      Total.findOne({
        where: { SU: val },
        raw: true
      }).then((data) => {
        delete data.id
        console.log(data)
        Repair.create(data, {
          'Global Status': req.body.global_status,
          'Local Status': req.body.local_status,
          Location: req.body.location,
          BOX: req.body.box
        })
      })
    }

    if (req.body.global_status === 'Storage') {
      if (req.body.local_status === 'Scrap') {
        Storage.destroy({
          where: {
            SU: val
          }
        })
      }
      Total.findAll({
        where: { SU: val },
        raw: true
      }).then((data) => {
        Storage.create(data)
      })
    }
  }) */
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.getFileInfo = (req, res) => {
  const fileStats = []
  fileStats.push(fs.statSync(FILE_PATHNAME))

  const file_obj = {
    File_description: FILE_PATHNAME,
    Create_timestamp: fileStats[0].birthtime,
    Change_timestamp: fileStats[0].ctime,
    'Last access timestamp': fileStats[0].atime,
    'Last modified timestamp': fileStats[0].mtime
  }
  res.send(file_obj)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.postDataSet = (req, res) => {
  console.log(req.body)
  const workbook = XLSX.readFile(FILE_PATHNAME, { type: 'binary', cellDates: true })
  const sheet_name_list = workbook.SheetNames
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

  const result = []

  xlData.map((value) => {
    const obj = {
      MATERIAL: value.MATERIAL || null,
      CLAIM: value.CLAIM || null,
      'INCH (FACT)': value['INCH (FACT)'] || null,
      'SERIAL NUMBER': value['SERIAL NUMBER'] || null,
      SU: value.SU || null,
      DESTINATION: value.DESTINATION || null,
      CODE: value.CODE || null,
      'RB BARCODE': value['RB BARCODE'] || null,
      COMMENT: value.COMMENT || null,
      '1st Insp DATE': value.DATE || null,
      '2nd Insp DATE': null,
      'Putaway DATE': null,
      'Outbound DATE': null,
      'Scrap DATE': null,
      'Global Status': 'Inspection',
      'Local Status': 'Pending',
      BOX: null,
      Location: null,
      Responsible_user: req.body.username
    }
    return result.push(obj)
  })
  const table_inst = new TableMutation()
  table_inst.initialRows(result)
  res.send({ message: 'Данные добавлены!' })
}
