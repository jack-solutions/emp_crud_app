const {signupController, loginController, updateEmpController, getUserController } = require("../controllers")
const { auth } = require("../middlewares")
const { catchAsync } = require("../middlewares/catchAsync")



const userRoutes = (app) => {
    app.post("/login", catchAsync(loginController))

    app.post("/signup", catchAsync(signupController))

    app.get("/getuser" , auth, catchAsync(getUserController))

    app.put("/update-emp/:emp_id", catchAsync(updateEmpController))

}

module.exports = {userRoutes}