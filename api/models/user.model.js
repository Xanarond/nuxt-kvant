module.exports = (sequelize, Sequelize) => {
  return sequelize.define('users', {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    division: {
      type: Sequelize.STRING,
    },
  })
}
