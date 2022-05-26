import api from './api'

class TableService {
  getPublicContent () {
    return api.get('tables/main')
  }

  getInspectionTable () {
    return api.get('tables/inspection')
  }

  getRepairTable () {
    return api.get('tables/repair')
  }

  /**
   * Метод для передачи информации на сервер об изменении SU
   * @param {[]} nums номера su
   * @param {string} gs глобальный статус
   * @param {string} ls локальный статус
   * @param loc {string} Location
   * @param box {int} BOX
   * @param username {string} имя активного пользователя
   */
  postItems (nums, gs, ls, loc, box, username) {
    return api.post('datasets/update', {
      serial_nums: nums,
      global_status: gs,
      local_status: ls,
      location: loc,
      box,
      username
    })
  }

  getFileInfo () {
    return api.get('/file_info')
  }

  /**
   * Запуск процесса парсинга из файла
   * @returns {Promise<AxiosResponse<any>>}
   * @param user {string} имя активного пользователя
   */
  postDataTable (user) {
    return api.post('datasets/insert',
      user, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        },
      })
  }
}

export default new TableService()
