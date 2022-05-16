import api from "./api"

class TableService {
  getPublicContent() {
    return api.get("tables/main")
  }

  getInspectionTable() {
    return api.get("tables/inspection")
  }

  /**
   * @param {*[]} nums номера su
   * @param {[]} gs глобальный статус
   * @param {string} ls локальный статус
   * @param loc Location
   * @param box BOX
   */
  postItems(nums, gs, ls, loc, box) {
    return api.post("datasets/update", {
      serial_nums: nums,
      global_status: gs,
      local_status: ls,
      location: loc,
      box
    })
  }

  postDataTable(items) {
    return api.post("datasets/insert", {
      items
    }, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    })
  }
}

export default new TableService()
