import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://106.109.33.145:8081/api',
  headers: {
    // "Content-Type": "application/json",
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
})

export default instance
