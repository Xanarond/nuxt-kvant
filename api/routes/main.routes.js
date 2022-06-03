const { verifySignUp } = require('../middleware')
const authCont = require('../controllers/auth.controller')
const userCont = require('../controllers/user.controller')
const datasetCont = require('../controllers/dataset.controller')
const { authJwt } = require('../middleware')

module.exports = (app) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome for Kwant API!' })
  })

  app.post('/api/auth/signin', authCont.signin)

  app.post(
    '/api/auth/signup',
    [verifySignUp.checkDuplicate, verifySignUp.checkRolesExisted],
    authCont.signup
  )

  app.post('/api/auth/refreshtoken', authCont.refreshToken)

  app.get('/api/tables/main', userCont.mainTable)

  app.get(
    '/api/tables/inspection',
    [authJwt.verifyToken, authJwt.isWorkerInspectionOrAdmin],
    userCont.inspectionTable
  )

  app.get(
    '/api/tables/storage',
    [authJwt.verifyToken, authJwt.isWorkerStorageOrAdmin],
    userCont.storageTable
  )

  app.get(
    '/api/tables/repair',
    [authJwt.verifyToken, authJwt.isWorkerRepairOrAdmin],
    userCont.repairTable
  )

  app.get(
    '/api/tables/archive',
    [authJwt.verifyToken, authJwt.isAdmin],
    userCont.archiveTable
  )

  app.post('/api/datasets/update', [authJwt.verifyToken], datasetCont.postSerialNums)
  app.post('/api/datasets/insert', [authJwt.verifyToken, authJwt.isAdmin], datasetCont.postDataSet)

  app.get('/api/file_info', datasetCont.getFileInfo)
}
