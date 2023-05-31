const Department = require("../models/Department")
const Category = require("../models/Category")


const createDepartment = async (body) => {
    const department =  new Department({...body})
    const result = await department.save()

    return result 
}

const updateDepartment = async (dep_id, updatingItems) => {
    const result = await Department.updateOne({_id : dep_id}, {...updatingItems})
    return result
}

const createCategory = async (body) => {
    const department =  new Category({...body})
    const result = await department.save()

    return result 
}

const fetchingDepartments = async () => {
    const departments = await Department.find().populate({ path: 'categories', select: 'name' }).populate({ path: 'employees', select: 'name' }).exec() ;
    console.log(departments)
    return departments
}

const deleteDepartment = async dep_id => {
   const department =  await Department.findOneAndDelete({_id : dep_id});
}

const deleteCategory = async cat_id => {
    const category =  await Category.findOneAndDelete({_id : cat_id});
 }

module.exports = {createCategory , createDepartment, updateDepartment, fetchingDepartments, deleteDepartment, deleteCategory}