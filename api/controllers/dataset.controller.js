import TableMutation from '../mutations/tableMutation'

const fs = require('fs')
const { Client } = require('pg')
const XLSX = require('xlsx')
// const moment = require('moment')
const env = require('../config/db.config')
const FILE_PATHNAME = process.env.FILE_PATHNAME
// FILE_PATHNAME = '//106.109.32.200/Logistic/pmakhotkin/Task_list/KWANTDB/Данные для импорта/Panels_test.xlsb'

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
  const { serial_nums, global_status, local_status, location, box, username } = req.body
  const table_inst = new TableMutation()
  table_inst.updateRows(serial_nums, global_status, local_status, location, box, username)

  res.send({ message: 'Данные обновлены!' })
  return ''
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
  const compares = table_inst.initialRows(result)
  const p1 = new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(compares), 500) // add timeout for load data
      setTimeout(() => reject(new Error('Something went wrong!')), 500)
    } catch (e) {
      console.log(e)
    }
  })
  p1.then((values) => {
    res.send({ message: 'Данные добавлены!', matching_SU: values })
  })
}
