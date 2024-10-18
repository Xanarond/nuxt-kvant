export default (sequelize, Sequelize) =>
  sequelize.define(
    'inspection',
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
      tableName: 'inspection',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    },
  )
