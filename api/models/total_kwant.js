module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    'total_kwant',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
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
        primaryKey: true
      },
      SU: {
        type: Sequelize.INTEGER,
        unique: true,
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
        /* get () {
          return this.getDataValue('1st Insp DATE')
            .toLocaleString('de-DE', { timeZone: 'UTC' })
        } */
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
      tableName: 'total_kwant',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false
    }
  )
