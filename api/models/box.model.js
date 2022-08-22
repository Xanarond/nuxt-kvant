module.exports = (sequelize, Sequelize) =>
  sequelize.define('box_types', {
    Inch: {
      type: Sequelize.INTEGER,
    },
    BOX: {
      type: Sequelize.STRING,
    },
    Location: {
      type: Sequelize.STRING,
    },
    'Full qty': {
      type: Sequelize.INTEGER
    },
    'Empty qty': {
      type: Sequelize.INTEGER
    },
    Type: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: false,
    freezeTableName: true,
    tableName: 'box_types',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false
  })
