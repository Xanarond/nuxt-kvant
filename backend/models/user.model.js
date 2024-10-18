export default (sequelize, Sequelize) =>
  sequelize.define('users', {
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    division: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
  })
