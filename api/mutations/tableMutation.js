import moment from 'moment'

const db = require('../models')
const { total: Total, inspection: Inspection, storage: Storage, repair: Repair, archive: Archive } = db

export default class TableMutation {
  cur_date = moment().format('YYYY-MM-DD')
  cur_time = moment().format('HH:mm:ss')

  /**
   *
   * @param su_numbers
   * @param department
   * @param local_status
   * @param location
   * @param box
   * @param username
   */
  constructor (su_numbers, department, local_status, location, box, username) {
    this.su_numbers = su_numbers
    this.department = department
    this.local_status = local_status
    this.location = location
    this.box = box
    this.username = username
  }

  /**
   * Метод производит вставку SU при работе с файлом игнорируя дубли
   *
   * @param su_objects
   */
  initialRows (su_objects) {
    su_objects.forEach((value) => {
      Total.findOne({
        where: { SU: value.SU },
        raw: true
      }).then((rows) => {
        if (rows === null) {
          Total.create(value)
          Inspection.create(value)
          Archive.create(value)
        } else {
          Total.update(value, { where: { SU: rows.SU } })
          Inspection.update(value, { where: { SU: rows.SU } })
          Archive.update(value, { where: { SU: rows.SU } })
        }
      })
    })
  }

  singleEdit () {

  }

  /**
   *
   * @param su_numbers
   * @param department
   * @param local_status
   * @param location
   * @param box
   * @param username
   */
  updateRows (su_numbers, department, local_status, location = '', box = '-', username) {
    su_numbers.forEach((val) => {
      Archive.findOne({
        where: { SU: val },
        raw: true
      })
        .then((data) => {
          delete data.id

          Archive.create(data).then((row) => {
            if (department === 'Inspection') {
              switch (local_status) {
                case 'Pre-stock after Inspection':
                  Total.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                    '2nd Insp DATE': this.cur_date,
                    '2nd Insp TIME': this.cur_time
                  }, { where: { SU: row.SU } })

                  Inspection.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                    '2nd Insp DATE': this.cur_date,
                    '2nd Insp TIME': this.cur_time
                  }, { where: { SU: row.SU } })

                  Archive.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                    '2nd Insp DATE': this.cur_date,
                    '2nd Insp TIME': this.cur_time
                  }, { where: { id: row.id } })
                  break
                case 'Pre-scrap':
                  Total.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                  }, { where: { SU: row.SU } })

                  Inspection.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                  }, { where: { SU: row.SU } })

                  Archive.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                  }, { where: { id: row.id } })
                  break
              }
            }
            if (department === 'Storage') {
              if (local_status === 'Stock') {
                Archive.findOne({
                  where: { SU: row.SU },
                  raw: true
                }).then((st) => {
                  delete st.id
                  Storage.create(st)
                  Storage.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username
                  }, { where: { SU: st.SU } })
                })

                Archive.update({
                  'Global Status': department,
                  'Local Status': local_status,
                  Location: location,
                  BOX: box,
                  Responsible_user: username
                }, { where: { id: row.id } })

                Total.update({
                  'Global Status': department,
                  'Local Status': local_status,
                  Location: location,
                  BOX: box,
                  Responsible_user: username
                }, { where: { SU: row.SU } })

                Inspection.destroy({
                  where: {
                    SU: row.SU
                  }
                })

                Repair.destroy({
                  where: {
                    SU: row.SU
                  }
                })
              }
              switch (local_status) {
                case 'Pre-scrap':
                case 'Pre-repair on SRDC':
                case 'Pre-repair on SERK':
                case 'Pre-verefication':
                  Archive.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username
                  }, { where: { id: row.id } })

                  Total.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username
                  }, { where: { SU: row.SU } })

                  Storage.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username
                  }, { where: { SU: row.SU } })
                  break
              }
              switch (local_status) {
                case 'Transfer verefication':
                case 'Transfer to Consignmet':
                case 'Transfer to SERK':
                  Total.destroy({
                    where: {
                      SU: row.SU
                    }
                  })

                  Storage.destroy({
                    where: {
                      SU: row.SU
                    }
                  })

                  Archive.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                    'Outbound DATE': this.cur_date
                  }, { where: { id: row.id } })
                  break
              }
            }
            if (department === 'Repair') {
              if (local_status === 'Pending') {
                Archive.update({
                  'Global Status': department,
                  'Local Status': local_status,
                  Location: location,
                  BOX: box,
                  Responsible_user: username
                }, { where: { id: row.id } })

                Archive.findOne({
                  where: { id: row.id },
                  raw: true
                }).then((st) => {
                  delete st.id
                  Repair.create(st)
                  Repair.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username
                  }, { where: { SU: st.SU } })
                })

                Total.update({
                  'Global Status': department,
                  'Local Status': local_status,
                  Location: location,
                  BOX: box,
                  Responsible_user: username
                }, { where: { SU: row.SU } })

                Inspection.destroy({
                  where: {
                    SU: row.SU
                  }
                })

                Storage.destroy({
                  where: {
                    SU: row.SU
                  }
                })
              }
              switch (local_status) {
                case 'Pre-scrap':
                case 'SRDC repair complete':
                case 'Pre-stock after repair':
                  Total.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username
                  }, { where: { SU: row.SU } })

                  Repair.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username
                  }, { where: { SU: row.SU } })

                  Archive.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username
                  }, { where: { id: row.id } })
                  break
              }
            }

            switch (local_status) {
              case 'Scrap after approval':
              case 'Transfer Scrap':
                Total.destroy({
                  where: {
                    SU: row.SU
                  }
                })

                Inspection.destroy({
                  where: {
                    SU: row.SU
                  }
                })

                Storage.destroy({
                  where: {
                    SU: row.SU
                  }
                })

                Repair.destroy({
                  where: {
                    SU: row.SU
                  }
                })

                Archive.update({
                  'Global Status': department,
                  'Local Status': local_status,
                  Location: location,
                  BOX: box,
                  'Scrap DATE': this.cur_date,
                  Responsible_user: username
                }, { where: { id: row.id } })
                break
            }
          })
        })
    })
  }
}
