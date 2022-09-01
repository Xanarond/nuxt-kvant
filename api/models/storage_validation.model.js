module.exports = (sequelize, Sequelize) =>
  sequelize.define('storage_validation', {
    'Local Status': {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    Stock: {
      type: Sequelize.BOOLEAN,
    },
    'Pre-repair on SRDC': {
      type: Sequelize.BOOLEAN,
    },
    'Pre-repair on SERK': {
      type: Sequelize.BOOLEAN,
    },
    'Transfer to SERK': {
      type: Sequelize.BOOLEAN,
    },
    'Transfer to Consignment': {
      type: Sequelize.BOOLEAN,
    },
    'Pre-verification': {
      type: Sequelize.BOOLEAN,
    },
    'Transfer verification': {
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
    tableName: 'storage_validation',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false
  })
