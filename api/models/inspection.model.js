module.exports = (sequelize, Sequelize) => {
  return sequelize.define('inspection', {
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
  })
}
