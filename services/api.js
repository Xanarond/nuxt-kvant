import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://92.63.98.23:81/api',
  headers: {
    // "Content-Type": "application/json",
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
})

export default instance
