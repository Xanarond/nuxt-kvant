import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    // "Content-Type": "application/json",
    "Accept": "*/*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
})

export default instance
