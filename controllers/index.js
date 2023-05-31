const { login, signup, updateEmployeeByManager, getUser } = require("./user");
const {generateToken} = require("../token");
const { createDepartment, createCategory, updateDepartment, fetchingDepartments } = require("./management");
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

    getUserController : async (req,res, next) => {
        const user_id = req.query._id ;
        const {_id, role} = req.user || {}


        if(_id && user_id == "undefined"){
            const user =   await getUser(_id.toString())
            return res.send(user)
        }else if(role == "manager" || "Manager"){
            const user =   await getUser(user_id)
            const {password, ...rest} = user;
            return res.send(user)
        }


    },

    updateEmpController : async (req,res,next) => {
        const user = req.user ;
        const { password, name, email, ...rest} = req.body ;

       
        if(user._id == req.params.emp_id ){
            updatedEmp =  await updateEmployeeByManager(req.params.emp_id, req.body)
        }else if(user?.role == "manager"){
            updatedEmp =  await updateEmployeeByManager(req.params.emp_id, rest )
        }

        return res.status(200).json({
            success : true,
            msg : "Successfully Updated.. ! "
        })

    },


    createDepartmentController : async (req,res, next) => {
        const {role} = req.user ;
        if(role == "Manager"){
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
        const updateDep = await updateDepartment(dep_id, updateItems)
        return res.status(200).json({
            success : true,
            msg : "Successfully Updated.. ! "
        })

    },

    createCategoryController : async (req,res, next) => {
        const user = await createCategory(req.body)

        return res.status(200).json({
            success : true,
            msg : "Successfully Created.. ! "
        })
    },

    fetchingDepartmentsController : async (req,res) => {
        const {role} = req.user ;
        if(role == "Manager"){
            throw new ErrorHandler(401, "does not have permission.")
        }

        const result = await fetchingDepartments();
        res.send(result)
    },

    deleteDepartmentController : async (req,res) => {
        const {role} = req.user ;
        const {dept_id} = req.params ;

        if(role == "Manager"){
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

        if(role == "Manager"){
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