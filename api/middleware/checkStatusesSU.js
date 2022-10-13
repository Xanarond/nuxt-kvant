const db = require('../models')
const { total: Total } = db

checkWrongNumbers = async (req, res, next) => {
  const { serial_nums } = req.body
  const matchArr = [...new Set(serial_nums)]
  const totalSU = []
  const rows = await Total.findAll({
    where: { SU: matchArr },
    raw: true
  })

  rows.forEach((row) => {
    totalSU.push(row.SU.toString())
  })

  const matchBuf = []
  matchArr.forEach((val) => {
    matchBuf.push(val.toString())
  })

  const mismatchSU = matchBuf.filter(item => !totalSU.includes(item))

  if (mismatchSU.length > 0) {
    res.send({ alert: true, mismatchSU })
    return
  }
  next()
}

/* SELECT Distinct T1."Local Status", -- указать текущий локальный статус
      T2."Pending" -- указывать запрашиваемое поле со статусом
      FROM PUBLIC.TOTAL_KVANT AS T1
      JOIN PUBLIC.INSPECTION_VALIDATION AS T2 ON (T1."Local Status" != T2."Local Status")
      WHERE "SU" in (462841,462867,468538) -- проверять по определенным значениям панелей
      AND T2."Local Status" = 'Pre-stock after inspection' -- указывать следующий статус после текущего */

checkStatusValidation = async (req, res, next) => {
  if (req.body.global_status === 'Inspection') { // eslint-disable-next-line no-case-declarations
    const rows = await Total.findAll({
      where: { SU: req.body.serial_nums },
      raw: true
    })

    // eslint-disable-next-line no-case-declarations
    const markedArr = []
    rows.forEach((value) => {
      const obj = {
        su: value.SU,
        gs: value['Global Status'],
        ls: value['Local Status']
      }
      markedArr.push(obj)
    })

    const ls_inspection = ['Pending', 'Pre-stock after Inspection', 'Pre-scrap', 'Scrap after approval', 'Transfer Scrap']
    const warningSU = []
    for (const row of markedArr) {
      if (row.gs === 'Inspection' && ls_inspection.includes(row.ls)) {
        const sql_query = `SELECT T1."SU" as "su", -- указать текущий локальный статус
                            T1."Local Status" as "current status",
                             T2."${row.ls}" as "insert status" -- указывать запрашиваемое поле со статусом
                              FROM PUBLIC.TOTAL_KVANT AS T1
                              JOIN PUBLIC.INSPECTION_VALIDATION AS T2 ON (T1."Local Status" != T2."Local Status")
                              WHERE "SU" in (${row.su}) AND T2."Local Status" = '${req.body.local_status}'  -- указывать следующий статус после текущего`

        console.log(sql_query)

        const warnings = await db.sequelize.query(sql_query)

        const warning_obj = {
          su: Object.values(warnings[0][0])[0],
          current_status: Object.values(warnings[0][0])[1],
          enter_status: req.body.local_status,
          indicator: Object.values(warnings[0][0])[2]
        }
        if (!warning_obj.indicator) {
          warningSU.push(warning_obj)
        }
      } else {
        const warning_obj = {
          su: row.su,
          current_status: row.ls,
          enter_status: req.body.local_status,
          indicator: false
        }

        if (!warning_obj.indicator) {
          warningSU.push(warning_obj)
        }
      }
    }

    if (warningSU.length > 0) {
      res.send({ alert: true, warningSU })
      return
    }
    next()
  } else if (req.body.global_status === 'Storage') { // TODO Проверить правильность логики по хранению
    const ls_storage = ['Stock', 'Pre-repair on SRDC', 'Pre-repair on SERK', 'Transfer to SERK', 'Transfer to Consignment',
      'Pre-verification', 'Transfer verification', 'Pre-scrap', 'Scrap after approval', 'Transfer Scrap']
    const rows = await Total.findAll({
      where: { SU: req.body.serial_nums },
      raw: true
    })

    // eslint-disable-next-line no-case-declarations
    const markedArr = []
    rows.forEach((value) => {
      const obj = {
        su: value.SU,
        gs: value['Global Status'],
        ls: value['Local Status']
      }
      markedArr.push(obj)
    })
    const warningSU = []
    for (const row of markedArr) {
      if (row.gs === 'Storage' && ls_storage.includes(row.ls)) {
        const sql_query = `SELECT T1."SU" as "su",
                            T1."Local Status" as "current status",
                             T2."${row.ls}" as "insert status"
                              FROM PUBLIC.TOTAL_KVANT AS T1
                              JOIN PUBLIC.STORAGE_VALIDATION AS T2 ON (T1."Local Status" != T2."Local Status")
                              WHERE "SU" in (${row.su}) AND T2."Local Status" = '${req.body.local_status}'`

        console.log(sql_query)

        const warnings = await db.sequelize.query(sql_query)

        const warning_obj = {
          su: Object.values(warnings[0][0])[0],
          current_status: Object.values(warnings[0][0])[1],
          enter_status: req.body.local_status,
          indicator: Object.values(warnings[0][0])[2]
        }
        if (!warning_obj.indicator) {
          warningSU.push(warning_obj)
        }
      } else if ((row.gs === 'Inspection' && row.ls === 'Pre-stock after Inspection' && req.body.local_status === 'Stock' || req.body.local_status === 'Pre-repair on SRDC' || req.body.local_status === 'Pre-repair on SERK') ||
        (row.gs === 'Repair' && row.ls === 'Pre-stock after repair' && req.body.local_status === 'Stock')) {
        const warning_obj = {
          su: row.su,
          current_status: row.ls,
          enter_status: req.body.local_status,
          indicator: true
        }
        if (!warning_obj.indicator) {
          warningSU.push(warning_obj)
        }
      } else {
        const warning_obj = {
          su: row.su,
          current_status: row.ls,
          enter_status: req.body.local_status,
          indicator: false
        }

        if (!warning_obj.indicator) {
          warningSU.push(warning_obj)
        }
      }
    }

    if (warningSU.length > 0) {
      res.send({ alert: true, warningSU })
      return
    }
    next()
  } else if (req.body.global_status === 'Repair') {
    const ls_repair = ['On Repair', 'Pre-stock after repair']
    const rows = await Total.findAll({
      where: { SU: req.body.serial_nums },
      raw: true
    })

    // eslint-disable-next-line no-case-declarations
    const markedArr = []
    rows.forEach((value) => {
      const obj = {
        su: value.SU,
        gs: value['Global Status'],
        ls: value['Local Status']
      }
      markedArr.push(obj)
    })
    const warningSU = []
    for (const row of markedArr) {
      if (row.gs === 'Repair' && ls_repair.includes(row.ls)) {
        const sql_query = `SELECT T1."SU" as "su",
                            T1."Local Status" as "current status",
                             T2."${row.ls}" as "insert status"
                              FROM PUBLIC.TOTAL_KVANT AS T1
                              JOIN PUBLIC.REPAIR_VALIDATION AS T2 ON (T1."Local Status" != T2."Local Status")
                              WHERE "SU" in (${row.su}) AND T2."Local Status" = '${req.body.local_status}'`

        console.log(sql_query)

        const warnings = await db.sequelize.query(sql_query)

        const warning_obj = {
          su: Object.values(warnings[0][0])[0],
          current_status: Object.values(warnings[0][0])[1],
          enter_status: req.body.local_status,
          indicator: Object.values(warnings[0][0])[2]
        }
        if (!warning_obj.indicator) {
          warningSU.push(warning_obj)
        }
      } else if (row.gs === 'Storage' && row.ls === 'Pre-repair on SRDC') {
        const warning_obj = {
          su: row.su,
          current_status: row.ls,
          enter_status: req.body.local_status,
          indicator: true
        }
        if (!warning_obj.indicator) {
          warningSU.push(warning_obj)
        }
      } else {
        const warning_obj = {
          su: row.su,
          current_status: row.ls,
          enter_status: req.body.local_status,
          indicator: false
        }

        if (!warning_obj.indicator) {
          warningSU.push(warning_obj)
        }
      }
    }
    if (warningSU.length > 0) {
      res.send({ alert: true, warningSU })
      return
    }
    next()
  }
}

const verifySUnumbers = {
  checkWrongNumbers, checkStatusValidation
}

module.exports = verifySUnumbers
