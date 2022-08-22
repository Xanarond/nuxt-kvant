module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    'storage',
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
      DESTINATION: {
        type: Sequelize.STRING,
      },
      'RB BARCODE': {
        type: Sequelize.STRING,
      },
      COMMENT: {
        type: Sequelize.TEXT,
      },
      'Putaway DATE': {
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
      }
    },
    {
      underscored: false,
      freezeTableName: true,
      tableName: 'storage',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false
    },
  )
