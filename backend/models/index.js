import Sequelize from 'sequelize'; // Импортируйте Sequelize, если он используется
import { DB, USER, PASSWORD, HOST, pool as _pool, port as _port } from '../config/db.config.js'
import userModel from './user.model.js';
import roleModel from './role.model.js';
import refreshTokenModel from './refreshToken.model.js';
import inspectionModel from './inspection.model.js';
import repairModel from './repair.model.js';
import storageModel from './storage.model.js';
import totalKvantModel from './total_kwant.js';
import archiveModel from './archive.model.js';
import boxModel from './box.model.js';
import inspectionValidationModel from './inspection_validation.model.js';
import storageValidationModel from './storage_validation.model.js';
import repairValidationModel from './repair_validation.model.js';

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: 'postgres',
  operatorsAliases: 0,
  omitNull: true,
  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle,
  },
  port: _port,
  logging: false
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = userModel(sequelize, Sequelize)
db.role = roleModel(sequelize, Sequelize)
db.refreshToken = refreshTokenModel(sequelize, Sequelize)
db.inspection = inspectionModel(sequelize, Sequelize)
db.repair = repairModel(sequelize, Sequelize)
db.storage = storageModel(sequelize, Sequelize)
db.total = totalKvantModel(sequelize, Sequelize)
db.archive = archiveModel(sequelize, Sequelize)
db.box = boxModel(sequelize, Sequelize)
db.inspection_validation = inspectionValidationModel(sequelize, Sequelize)
db.storage_validation = storageValidationModel(sequelize, Sequelize)
db.repair_validation = repairValidationModel(sequelize, Sequelize)

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

export default db
