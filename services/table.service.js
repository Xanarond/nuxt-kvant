import api from "./api"

class TableService {
  getPublicContent() {
    return api.get("tables/main")
  }

  getInspectionTable() {
    return api.get("tables/inspection")
  }

  postItems(num, loc, stat) {
    return api.post("datasets/update", {
      serial_nums: num,
      location: loc,
      status: stat
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
