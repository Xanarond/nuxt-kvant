export default (sequelize, Sequelize) =>
  sequelize.define(
    'archive',
    {
      MATERIAL: {
        type: Sequelize.STRING
      },
      CLAIM: {
        type: Sequelize.STRING
      },
      'INCH (FACT)': {
        type: Sequelize.STRING
      },
      'SERIAL NUMBER': {
        type: Sequelize.STRING,
      },
      SU: {
        type: Sequelize.INTEGER,
      },
      DESTINATION: {
        type: Sequelize.STRING
      },
      CODE: {
        type: Sequelize.INTEGER
      },
      'RB BARCODE': {
        type: Sequelize.STRING
      },
      COMMENT: {
        type: Sequelize.STRING
      },
      'Upload DATE': {
        type: Sequelize.DATEONLY
      },
      '1st Insp DATE': {
        type: Sequelize.DATEONLY,
      },
      '2nd Insp DATE': {
        type: Sequelize.DATEONLY
      },
      '2nd Insp TIME': {
        type: Sequelize.TIME
      },
      'Putaway DATE': {
        type: Sequelize.DATEONLY
      },
      'Outbound DATE': {
        type: Sequelize.DATEONLY
      },
      'Scrap DATE': {
        type: Sequelize.DATEONLY
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
      tableName: 'archive',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false
    }
  )
