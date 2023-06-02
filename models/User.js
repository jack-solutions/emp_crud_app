const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true,
    min : 8
  },
  role : {
    type : String,
    required : true
  },
  salary : {
    type : String,
  },
  hobbies : {
    type : Array
  },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },

  category : { type: Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('User', userSchema);
