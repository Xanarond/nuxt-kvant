import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.56.1:81/api',
  headers: {
    // "Content-Type": "application/json",
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
})

export default instance
