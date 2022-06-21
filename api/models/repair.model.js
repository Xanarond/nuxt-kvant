module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    'repair',
    {
      MATERIAL: {
        type: Sequelize.STRING,
      },
      CLAIM: {
        type: Sequelize.STRING,
      },
      'INCH (FACT)': {
        type: Sequelize.STRING,
      },
      'SERIAL NUMBER': {
        type: Sequelize.STRING,
      },
      SU: {
        type: Sequelize.INTEGER,
        unique: true
      },
      STATUS: {
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
      'Global Status': {
        type: Sequelize.STRING
      },
      'Local Status': {
        type: Sequelize.STRING
      },
      BOX: {
        type: Sequelize.STRING
      },
      Location: {
        type: Sequelize.STRING
      },
      Responsible_user: {
        type: Sequelize.STRING
      }
    },
    {
      underscored: false,
      freezeTableName: true,
      tableName: 'repair',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false
    },
  )
