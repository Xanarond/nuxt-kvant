module.exports = {
  HOST: '106.109.40.63',
  USER: 'postgres',
  PASSWORD: '2021',
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
