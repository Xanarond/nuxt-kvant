import api from './api'

class TableService {
  /**
   * Метод возвращает данные для таблицы главной страницы
   * @returns {Promise<AxiosResponse<any>>}
   */
  getPublicContent () {
    return api.get('tables/main')
  }

  /**
   * Метод возвращает данные для таблицы раздела инспекции
   * @returns {Promise<AxiosResponse<any>>}
   */
  getInspectionTable () {
    return api.get('tables/inspection')
  }

  /**
   * Метод возвращает данные для таблицы ремонта
   * @returns {Promise<AxiosResponse<[]>>}
   */
  getStorageTable () {
    return api.get('tables/storage')
  }

  /**
   * Метод возвращает данные для таблицы ремонта
   * @returns {Promise<AxiosResponse<[]>>}
   */
  getRepairTable () {
    return api.get('tables/repair')
  }

  /**
   * Метод возвращает данные для таблицы ремонта
   * @returns {Promise<AxiosResponse<[]>>}
   */
  getArchiveTable () {
    return api.get('tables/archive')
  }

  /**
   * Метод для передачи информации на сервер об изменении SU
   * @param {[string]} nums номера su
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

  /**
   * Метод возвращает информацию по текущему файлу для импорта
   * @returns {Promise<AxiosResponse<any>>}
   */
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
