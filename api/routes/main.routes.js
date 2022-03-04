const { verifySignUp } = require('../../api/middleware')
const controller = require('../controllers/auth.controller')
const userCont = require('../controllers/user.controller')
const { authJwt } = require('../../api/middleware')

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome for Kwant API!' })
  })

  app.post('/api/auth/signin', controller.signin)

  app.post(
    '/api/auth/signup',
    [verifySignUp.checkDuplicate, verifySignUp.checkRolesExisted],
    controller.signup
  )

  app.post('/api/auth/refreshtoken', controller.refreshToken)

  /*  app.get("/api/articles", mongoDB.getArticles);
    app.get("/api/sections", mongoDB.getMenuStruct); */

  app.get('/api/test/all', userCont.allAccess)

  app.get('/api/test/user', [authJwt.verifyToken], userCont.userBoard)

  app.get(
    '/api/test/mod',
    [authJwt.verifyToken, authJwt.isModerator],
    userCont.moderatorBoard
  )

  app.get(
    '/api/test/admin',
    [authJwt.verifyToken, authJwt.isAdmin],
    userCont.adminBoard
  )
}
