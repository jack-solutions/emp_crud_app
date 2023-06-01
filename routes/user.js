const {signupController, loginController, updateEmpController, getUserController, getAllUsersController } = require("../controllers")
const { auth } = require("../middlewares")
const { catchAsync } = require("../middlewares/catchAsync")



const userRoutes = (app) => {
    app.post("/login", catchAsync(loginController))

    app.post("/signup", catchAsync(signupController))

    app.get("/getuser" , auth, catchAsync(getUserController))

    app.get("/getallusers" , auth, catchAsync(getAllUsersController))

    app.put("/update-user/:user_id", auth, catchAsync(updateEmpController))

}

module.exports = {userRoutes}