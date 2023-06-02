const {signupController, loginController, createDepartmentController, createCategoryController, updateDepartmentController, fetchingDepartmentsController, deleteDepartmentController, deleteCategoryController, fetchingCategoriesController, removeEmpFromDepartmentController } = require("../controllers")
const { auth } = require("../middlewares")
const { catchAsync } = require("../middlewares/catchAsync")



const managementRoutes = (app) => {
    app.post("/categories/create", auth, catchAsync(createDepartmentController))

    app.post("/departments/create", auth, catchAsync(createCategoryController))

    app.put("/departments/update", auth, catchAsync(updateDepartmentController))

    app.get("/departments", auth, catchAsync(fetchingDepartmentsController))

    app.get("/categories", auth, catchAsync(fetchingCategoriesController))

    app.delete("/department/delete/:dep_id" , auth, catchAsync(deleteDepartmentController) )

    app.delete("/categories/delete/:cat_id", auth , catchAsync(deleteCategoryController))

    app.put("/department/remove_emp", auth, catchAsync(removeEmpFromDepartmentController))
}

module.exports = {managementRoutes}