import moment from 'moment'

import db from '../models/index.js';
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
    const compareArr = []
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
          compareArr.push(rows.SU)
        }
      })
    })
    return compareArr
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
                    'Scrap DATE': this.cur_date
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
                    'Scrap DATE': this.cur_date
                  }, { where: { id: row.id } })
                  break
              }
            }
            if (department === 'Storage') {
              if (local_status === 'Stock') {
                Total.findOne({
                  where: { SU: row.SU },
                  raw: true
                }).then((st) => {
                  Storage.create(st)
                  Storage.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                    'Putaway DATE': this.cur_date
                  }, { where: { SU: st.SU } })
                })

                Total.update({
                  'Global Status': department,
                  'Local Status': local_status,
                  Location: location,
                  BOX: box,
                  Responsible_user: username,
                  'Putaway DATE': this.cur_date
                }, { where: { SU: row.SU } })

                Archive.update({
                  'Global Status': department,
                  'Local Status': local_status,
                  Location: location,
                  BOX: box,
                  Responsible_user: username,
                  'Putaway DATE': this.cur_date
                }, { where: { id: row.id } })

                Storage.update({
                  'Global Status': department,
                  'Local Status': local_status,
                  Location: location,
                  BOX: box,
                  Responsible_user: username,
                  'Putaway DATE': this.cur_date
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
                case 'Pre-repair on SERK':
                case 'Pre-repair on SRDC':
                case 'Pre-verification':
                  Total.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                  }, { where: { SU: row.SU } })

                  Storage.update({
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
                  }, { where: { id: row.id, } })
                  break
                case 'Scrap after approval':
                  Total.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                    'Scrap DATE': this.cur_date
                  }, { where: { SU: row.SU } })

                  Storage.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                    'Scrap DATE': this.cur_date
                  }, { where: { SU: row.SU } })

                  Archive.update({
                    'Global Status': department,
                    'Local Status': local_status,
                    Location: location,
                    BOX: box,
                    Responsible_user: username,
                    'Scrap DATE': this.cur_date
                  }, { where: { id: row.id, } })
                  break
              }
              switch (local_status) {
                case 'Transfer verification':
                case 'Transfer to Consignment':
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
            // eslint-disable-next-line no-empty
            if (department !== 'Repair') {
            } else {
              if (local_status === 'On Repair') {
                Total.update({
                  'Global Status': department,
                  'Local Status': local_status,
                  Location: location,
                  BOX: box,
                  Responsible_user: username
                }, { where: { id: row.id } })

                Total.findOne({
                  where: { SU: row.SU },
                  raw: true
                }).then((st) => {
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

                Archive.update({
                  'Global Status': department,
                  'Local Status': local_status,
                  Location: location,
                  BOX: box,
                  Responsible_user: username
                }, { where: { id: row.id } })

                Repair.update({
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
              if (local_status === 'Pre-stock after repair') {
                Total.update({
                  'Global Status': department,
                  'Local Status': local_status,
                  Location: location,
                  BOX: box,
                  Responsible_user: username,
                  'Scrap DATE': this.cur_date
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
              }
            }
            // Общая логика по статусам
            switch (local_status) {
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
