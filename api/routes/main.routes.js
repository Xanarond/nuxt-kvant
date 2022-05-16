const { verifySignUp } = require("../middleware")
const authCont = require("../controllers/auth.controller")
const userCont = require("../controllers/user.controller")
const datasetCont = require("../controllers/dataset.controller")
const { authJwt } = require("../middleware")

module.exports = app => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })
  app.get("/", (req, res) => {
    res.json({ message: "Welcome for Kwant API!" })
  })

  app.post("/api/auth/signin", authCont.signin)

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicate, verifySignUp.checkRolesExisted],
    authCont.signup
  )

  app.post("/api/auth/refreshtoken", authCont.refreshToken)

  app.get("/api/tables/main", userCont.mainTable)

  app.get(
    "/api/tables/inspection",
    [authJwt.verifyToken],
    userCont.inspectionTable
  )

  app.post("/api/datasets/update", datasetCont.postSerialNums)
  app.post("/api/datasets/insert", [authJwt.verifyToken], datasetCont.postDataSet)

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userCont.adminBoard
  )
}
