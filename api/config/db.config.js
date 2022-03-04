module.exports = {
  HOST: '127.0.0.1',
  USER: 'user_kwant',
  PASSWORD: '1',
  DB: 'kwantdb',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  port: 5432,
}
