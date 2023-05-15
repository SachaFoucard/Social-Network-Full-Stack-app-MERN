const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  description:{
    type: String,
    required: false,
  },
  mail: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true,
  },
  img:{
    data: Buffer,
    contentType: String,
  },
  date:{
    type: String,
    required: true,
  }
})

const TaskModel = mongoose.model('users', UserShema);
module.exports = TaskModel
