module.exports = (sequelize, Sequelize) =>
  sequelize.define('storage_validation', {
    'Local Status': {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    Stock: {
      type: Sequelize.STRING,
    },
    'Pre-repair on SRDC': {
      type: Sequelize.STRING,
    },
    'Pre-repair on SERK': {
      type: Sequelize.STRING,
    },
    'Transfer to SERK': {
      type: Sequelize.STRING,
    },
    'Transfer to Consignment': {
      type: Sequelize.STRING,
    },
    'Pre-verification': {
      type: Sequelize.STRING,
    },
    'Transfer verification': {
      type: Sequelize.STRING,
    },
    'Pre-scrap': {
      type: Sequelize.STRING,
    },
    'Scrap after approval': {
      type: Sequelize.STRING,
    },
    'Transfer Scrap': {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: false,
    freezeTableName: true,
    tableName: 'storage_validation',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false
  })
