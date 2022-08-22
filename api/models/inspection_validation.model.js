module.exports = (sequelize, Sequelize) =>
  sequelize.define('inspection_validation', {
    'Local Status': {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    Pending: {
      type: Sequelize.STRING,
    },
    'Pre-stock after inspection': {
      type: Sequelize.STRING,
    },
    'Pre-scrap': {
      type: Sequelize.STRING,
    },
    'Scrap after approval': {
      type: Sequelize.STRING,
    },
    'Transfer scrap': {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: false,
    freezeTableName: true,
    tableName: 'inspection_validation',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false
  })
