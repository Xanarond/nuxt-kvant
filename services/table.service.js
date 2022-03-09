import api from './api'

class TableService {
  getPublicContent() {
    return api.get('test/all')
  }

  getInspectionTable() {
    return api.get('test/user')
  }
}

export default new TableService()
