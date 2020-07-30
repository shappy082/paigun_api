const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userFaceSchema = Schema({
  username:  { type: String, required: true, trim: true },
  userid:  { type: Number, required: true, trim: true },
  name:  { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true , minlength: 3 },
  role: { type: String, default: 'member' },
  roledesc: { type: String, default: 'member' }
},{
  collection: 'User_Authen'
});

  
  const user_authen = mongoose.model('user_authen', userFaceSchema);
  
  module.exports = user_authen;