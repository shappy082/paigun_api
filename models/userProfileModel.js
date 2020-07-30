const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = Schema({
  username:  { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true , minlength: 3 },
  userid: { type: Number, required: true, trim: true  },
  name:  { type: String, required: true, trim: true },
  role: { type: String, default: 'member' },
  roledesc: { type: String, default: 'member' }
},{
  collection: 'User_Authen'
});


  const user_authen2 = mongoose.model('user_authen2', userProfileSchema);

  module.exports = user_authen2;