const mongoose = require("mongoose")
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  description : {
    type : String
  },
  location : {
    type : String
  },
  categories : [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  employees : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Department', departmentSchema);
