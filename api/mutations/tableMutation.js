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
   * Метод производит вставку SU при работе с файлом
   *
   * @param {[number]} su_numbers
   */
  initialRows (su_numbers) {
    Total.bulkCreate(su_numbers, {
      updateOnDuplicate: ['id', 'SERIAL NUMBER', 'SU']
    }).then()
    Inspection.bulkCreate(su_numbers, {
      updateOnDuplicate: ['id', 'SERIAL NUMBER', 'SU']
    }).then()
    Archive.bulkCreate(su_numbers, {
      updateOnDuplicate: ['id', 'SERIAL NUMBER', 'SU']
    }).then()
  }

  addRows (su_numbers, department = '', local_status = '', location = '', box = '-', username = '') {
    switch (department) {
      case 'Inspection':
        break
      case 'Storage':
        break
      case 'Repair':
        break
    }
  }

  removeRows (department) {
    switch (department) {
      case 'Inspection':
        Inspection.destroy({
          where: {
            SU: val
          }
        })
        break
      case 'Storage':
        Storage.destroy({
          where: {
            SU: val
          }
        })
        break
      case 'Repair':
        Repair.destroy({
          where: {
            SU: val
          }
        })
        break
    }
  }

  updateRows (su_numbers, department) {
    switch (department) {
      case 'Inspection':
        su_numbers.forEach((val) => {
          Total.update({
            'Global Status': department,
            'Local Status': local_status,
            Location: location,
            BOX: box,
            '2nd Insp DATE': this.cur_date,
            '2nd Insp TIME': this.cur_time,
            Responsible_user: username
          }, { where: { id: val.id } })
        })
        break
      case 'Storage':
        break
      case 'Repair':
        break
    }
  }
}
