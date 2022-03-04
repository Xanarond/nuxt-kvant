const Sequelize = require('sequelize')
const config = require('../config/db.config.js')

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  port: config.port
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('../models/user.model.js')(sequelize, Sequelize)
db.role = require('../models/role.model.js')(sequelize, Sequelize)
db.refreshToken = require('../models/refreshToken.model.js')(sequelize, Sequelize)
db.inspection = require('../models/inspection.model')(sequelize, Sequelize)
db.repair = require('../models/repair.model')(sequelize, Sequelize)
db.storage = require('../models/storage.model')(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
})

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
})

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id',
})
db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId',
  targetKey: 'id',
})

db.ROLES = ['worker', 'admin']

module.exports = db
