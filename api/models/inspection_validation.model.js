module.exports = (sequelize, Sequelize) =>
  sequelize.define('inspection_validation', {
    'Local Status': {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    Pending: {
      type: Sequelize.BOOLEAN,
    },
    'Pre-stock after Inspection': {
      type: Sequelize.BOOLEAN,
    },
    'Pre-scrap': {
      type: Sequelize.BOOLEAN,
    },
    'Scrap after approval': {
      type: Sequelize.BOOLEAN,
    },
    'Transfer Scrap': {
      type: Sequelize.BOOLEAN,
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
