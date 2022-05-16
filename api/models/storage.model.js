module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    'storage',
    {
      'ID': {
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
      BOX: {
        type: Sequelize.INTEGER,
      },
      LOC: {
        type: Sequelize.STRING,
      },
      DESTINATION: {
        type: Sequelize.STRING,
      },
      'RB BARCODE': {
        type: Sequelize.STRING,
      },
      COMMENT: {
        type: Sequelize.TEXT,
      },
      'Storage DATE': {
        type: Sequelize.DATEONLY,
      },
      '2nd Insp DATE': {
        type: Sequelize.DATEONLY,
      },
      'Outbound DATE': {
        type: Sequelize.DATEONLY,
      },
      'Scrap DATE': {
        type: Sequelize.DATEONLY,
      },
    },
    {
      underscored: false,
      freezeTableName: true,
      tableName: 'storage',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  )
