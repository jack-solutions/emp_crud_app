const { login, signup, updateEmployeeByManager, getUser, getAllUsers } = require("./user");
const {generateToken} = require("../token");
const { createDepartment, createCategory, updateDepartment, fetchingDepartments, fetchingCategories, removeEmpFromDepartment, deleteCategory, deleteDepartment } = require("./management");
const { ErrorHandler } = require("../error_handler");

const controllers = {
    loginController: async (req, res, next) => {
      
        console.log("POST authenticate called...req :", req.body);
        const {email, password} = req.body ;

        const user = await login(email, password);
        // if(userDoc && !userDoc.error){
          let access_token = generateToken(user)
          let data = {
             ...user,
             access_token:access_token,
          }

          return res.status(200).json(data)
    },

    signupController : async (req,res, next) => {

        const user = await signup(req.body)

        return res.status(200).json({
            success : true,
            msg : "Successfully Registered.. ! "
        })

    },

    getAllUsersController : async (req,res, next) => {
        const {_id, role} = req.user || {}
        if(role?.toLowerCase() == "manager"){
            let result = await getAllUsers()
            return res.send(result)
        }else{
            throw new ErrorHandler(403, "does not have permission")
        }
    },

    getUserController : async (req,res, next) => {
        const user_id = req.query._id ;
        const {_id, role} = req.user || {}

        if(_id && (user_id == undefined || user_id == "undefined")){
            const user =   await getUser(_id)
            return res.send(user)
        }else if(role?.toLowerCase() == "manager"){
            user =   await getUser(user_id)
            const {password, ...rest} = user?._doc || {};
            return res.send(rest)
        }
    },

    updateEmpController : async (req,res,next) => {
        const user = req.user ;
        const { password, name, email, ...rest} = req.body ;

       
        if(user?._id == req.params.user_id ){
            updatedEmp =  await updateEmployeeByManager(req.params.user_id, req.body)
        }else if(user?.role?.toLowerCase() == "manager"){
            updatedEmp =  await updateEmployeeByManager(req.params.user_id, req.body)
        }

        return res.status(200).json({
            success : true,
            msg : "Successfully Updated.. ! "
        })

    },


    createDepartmentController : async (req,res, next) => {
        const {role} = req.user ;
        if(role?.toLowerCase() !== "manager"){
            throw new ErrorHandler(401, "does not have permission.")
        }

        const user = await createDepartment(req.body)

        return res.status(200).json({
            success : true,
            msg : "Successfully Created.. ! "
        })
    },

    updateDepartmentController : async (req,res, next) => {
        const {dep_id , ...updateItems} = req.body
        const {role} = req.user ;
        if(role?.toLowerCase() !== "manager"){
            throw new ErrorHandler(401, "does not have permission.")
        }

        const updateDep = await updateDepartment(dep_id, updateItems)
        return res.status(200).json({
            success : true,
            msg : "Successfully Updated.. ! "
        })

    },

    removeEmpFromDepartmentController : async (req,res,next) => {
        const {role} = req.user || {}
        const {dep_id, emp_id} = req.body
        if(role?.toLowerCase() !== "manager"){
            throw new ErrorHandler(401, "does not have permission.")
        }

        await removeEmpFromDepartment({dep_id, emp_id })
        return res.status(200).json({
            success : true,
            msg : "Successfully Updated.. ! "
        })
    },

    createCategoryController : async (req,res, next) => {
        const {role} = req.user ;
        if(role?.toLowerCase() !== "manager"){
            throw new ErrorHandler(401, "does not have permission.")
        }

        const user = await createCategory(req.body)

        return res.status(200).json({
            success : true,
            msg : "Successfully Created.. ! "
        })
    },

    fetchingDepartmentsController : async (req,res) => {
        const {role} = req.user ;
        if(role?.toLowerCase() !== "manager"){
            new ErrorHandler(401, "does not have permission.")
        }

        const result = await fetchingDepartments();
        res.send(result)
    },

    fetchingCategoriesController : async (req,res) => {
        const {role} = req.user ;
        if(role?.toLowerCase() !== "manager"){
            new ErrorHandler(401, "does not have permission.")
        }

        const result = await fetchingCategories();
        res.send(result)
    },

    deleteDepartmentController : async (req,res) => {
        const {role} = req.user ;
        const {dept_id} = req.params ;

        if(role?.toLowerCase() == "manager"){
            await deleteDepartment(dept_id)
            return res.status(200).json({
                success : true,
                msg : "Successfully Deleted.. ! "
            })
        }else{
            throw new ErrorHandler(401, "does not have permission.")
        }
    },

    deleteCategoryController : async (req,res) => {
        const {role} = req.user ;
        const {cat_id} = req.params ;

        if(role?.toLowerCase() == "manager"){
            await deleteCategory(cat_id)
            return res.status(200).json({
                success : true,
                msg : "Successfully Deleted.. ! "
            })
        }else{
           throw new ErrorHandler(401, "does not have permission.")
        }
    }

}  


module.exports = controllers