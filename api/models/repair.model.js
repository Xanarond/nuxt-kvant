module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    'repair',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      MATERIAL: {
        type: Sequelize.STRING,
      },
      CLAIM: {
        type: Sequelize.STRING,
      },
      'INCH (FACT)': {
        type: Sequelize.INTEGER,
      },
      'SERIAL NUMBER': {
        type: Sequelize.STRING,
      },
      SU: {
        type: Sequelize.STRING,
      },
      STATUS: {
        type: Sequelize.STRING,
      },
      LOC: {
        type: Sequelize.STRING,
      },
      'RB BARCODE': {
        type: Sequelize.INTEGER,
      },
      COMMENT: {
        type: Sequelize.TEXT,
      },
      'Repair DATE': {
        type: Sequelize.DATEONLY,
      },
    },
    {
      underscored: false,
      freezeTableName: true,
      tableName: 'repair',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  )
