const mongoose = require("mongoose")
const { Schema } = mongoose;

const catSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  description : {
    type : String
  }
});

module.exports = mongoose.model('Category', catSchema);
