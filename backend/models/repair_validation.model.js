export default (sequelize, Sequelize) =>
  sequelize.define('repair_validation', {
    'Local Status': {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'On Repair': {
      type: Sequelize.BOOLEAN,
    },
    'Pre-stock after repair': {
      type: Sequelize.BOOLEAN,
    }
  },
  {
    underscored: false,
    freezeTableName: true,
    tableName: 'repair_validation',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false
  })
