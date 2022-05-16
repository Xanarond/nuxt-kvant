module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    "total_kwant",
    {
      MATERIAL: {
        type: Sequelize.STRING
      },
      CLAIM: {
        type: Sequelize.STRING
      },
      "INCH (FACT)": {
        type: Sequelize.STRING
      },
      "SERIAL NUMBER": {
        type: Sequelize.STRING,
      },
      SU: {
        type: Sequelize.INTEGER
      },
      DESTINATION: {
        type: Sequelize.STRING
      },
      CODE: {
        type: Sequelize.INTEGER
      },
      "RB BARCODE": {
        type: Sequelize.STRING
      },
      COMMENT: {
        type: Sequelize.STRING
      },
      "Upload DATE": {
        type: Sequelize.DATEONLY
      },
      "1st Insp DATE": {
        type: Sequelize.DATEONLY,
        get() {
          return this.getDataValue('1st Insp DATE')
            .toLocaleString("de-DE", { timeZone: 'UTC' });
        }
      },
      "2nd Insp DATE": {
        type: Sequelize.DATEONLY
      },
      "Putaway DATE": {
        type: Sequelize.DATEONLY
      },
      "Outbound DATE": {
        type: Sequelize.DATEONLY
      },
      "Scrap DATE": {
        type: Sequelize.DATEONLY
      },
      "Global Status": {
        type: Sequelize.STRING
      },
      "Local Status": {
        type: Sequelize.STRING
      },
      "BOX": {
        type: Sequelize.INTEGER
      },
      "Location": {
        type: Sequelize.STRING
      }
    },
    {
      underscored: false,
      freezeTableName: true,
      tableName: "total_kwant",
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  )
