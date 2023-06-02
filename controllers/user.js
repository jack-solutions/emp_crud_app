const { ErrorHandler } = require("../error_handler")
const User = require("../models/User")
const bcrypt = require("bcryptjs");



const login = async (email, password) => {
    if(!email || !password){
        throw new ErrorHandler(400, "Missing required information")
    }

    const user = await User.findOne({email}) ;

    if(!user){
        throw new ErrorHandler(401, "Email or Password incorrect ... ")
    }

    let hashPassword = await bcrypt.compare(password, user.password); // true

    if(!hashPassword){
        throw new ErrorHandler(401, "Email or Password incorrect ... ")
    }

    const {password : pass , ...rest_user} = user._doc ;


   return rest_user

}

const signup = async (body) => {
    const {name, email ,password, hobbies, role} = body

    if(!name || !email || !password || !role){
        throw new ErrorHandler(400, "Missing required information")
    }

    const salt = bcrypt.genSaltSync(10);
    const hash_password = bcrypt.hashSync(password, salt);

    const user = new User({name, email, password : hash_password, hobbies, role})

    const response = await user.save()

    return response

}

const getUser = async (id) => {
    const user = await User.findById({_id : id?.toString().trim()}).populate({ path: 'category', select: 'name' }).populate({ path: 'department', select: 'name' }).exec(); 
    if(!user){
        throw new ErrorHandler(404, "User not found ... ") 
    }
    return user 
}

const getAllUsers = async () => {
    const user = await User.find().populate({ path: 'category', select: 'name' }).populate({ path: 'department', select: 'name' }).exec(); 
    if(!user){
        throw new ErrorHandler(404, "User not found ... ") 
    }
    return user 
}

const updateEmployeeByManager = async (_id , body) => {
   const result = await User.updateOne({_id}, {...body})

   return result ;
}



module.exports = {login , signup, getUser, getAllUsers, updateEmployeeByManager}