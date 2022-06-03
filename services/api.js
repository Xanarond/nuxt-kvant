import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.baseAPI_HOST,
  headers: {
    // "Content-Type": "application/json",
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
})

export default instance
