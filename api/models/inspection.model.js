module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    'inspection',
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
      'RB BARCODE': {
        type: Sequelize.INTEGER,
      },
      COMMENT: {
        type: Sequelize.TEXT,
      },
      '1st Insp DATE': {
        type: Sequelize.DATEONLY,
      },
      '2nd Insp DATE': {
        type: Sequelize.DATEONLY,
      },
      '2nd Insp TIME': {
        type: Sequelize.TIME,
      },
    },
    {
      underscored: false,
      freezeTableName: true,
      tableName: 'inspection',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  )
