const {signupController, loginController, createDepartmentController, createCategoryController, updateDepartmentController, fetchingDepartmentsController, deleteDepartmentController, deleteCategoryController } = require("../controllers")
const { auth } = require("../middlewares")
const { catchAsync } = require("../middlewares/catchAsync")



const managementRoutes = (app) => {
    app.post("/categories/create", auth, catchAsync(createDepartmentController))

    app.post("/departments/create", auth, catchAsync(createCategoryController))

    app.put("/departments/update", auth, catchAsync(updateDepartmentController))

    app.get("/departments", auth, catchAsync(fetchingDepartmentsController))

    app.delete("/department/delete/:dep_id" , auth, catchAsync(deleteDepartmentController) )

    app.delete("/categories/delete/:cat_id", auth , catchAsync(deleteCategoryController))
}

module.exports = {managementRoutes}