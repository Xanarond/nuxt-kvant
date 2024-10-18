import { verifySignUp } from '../middleware/index.js'
import { signin, signup, refreshToken } from '../controllers/auth.controller.js'
import {mainTable, inspectionTable, repairTable, storageTable, archiveTable} from '../controllers/user.controller.js'
import datasetCont from '../controllers/dataset.controller.js'
import {authJwt}  from '../middleware/index.js'
import { verifySUnumbers } from '../middleware/index.js'

export default (app) => {
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

  app.post('/api/auth/signin', signin)

  app.post(
    '/api/auth/signup',
    [verifySignUp.checkDuplicate, verifySignUp.checkRolesExisted],
    signup
  )

  app.post('/api/auth/refreshtoken', refreshToken)

  app.get('/api/tables/main', mainTable)

  app.get(
    '/api/tables/inspection',
    [authJwt.verifyToken, authJwt.isWorkerInspectionOrAdmin],
    inspectionTable
  )

  app.get(
    '/api/tables/storage',
    [authJwt.verifyToken, authJwt.isWorkerStorageOrAdmin],
    storageTable
  )

  app.get(
    '/api/tables/repair',
    [authJwt.verifyToken, authJwt.isWorkerRepairOrAdmin],
    repairTable
  )

  app.get(
    '/api/tables/archive',
    [authJwt.verifyToken, authJwt.isAdmin],
    archiveTable
  )

  app.post('/api/datasets/update', [authJwt.verifyToken, verifySUnumbers.checkWrongNumbers, verifySUnumbers.checkStatusValidation], datasetCont.postSerialNums)
  app.post('/api/datasets/insert', [authJwt.verifyToken, authJwt.isWorkerInspectionOrAdmin], datasetCont.postDataSet)

  app.get('/api/file_info', datasetCont.getFileInfo)
}