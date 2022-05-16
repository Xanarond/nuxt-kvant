const db = require('../models')

const User = db.user
const Role = db.role

checkDuplicate = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Username is already in use!',
      })
      return
    }
    next()
  })
}

checkRolesExisted = (req, res, next) => {
  Role.findOne({
    where: {
      name: req.body.role,
    },
  }).then(role => {
    if (!role === req.body.role) {
      res.status(400).send({
        message: `Failed! Role does not exist = ${req.body.role}`,
      })
      return
    }
    next()
  })
}

const verifySignUp = {
  checkDuplicate,
  checkRolesExisted,
}

module.exports = verifySignUp
