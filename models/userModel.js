const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username:  { type: String, required: true, trim: true },
  userid:  { type: Number, required: true, trim: true },
  name:  { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true , minlength: 3 },
  role: { type: String, default: 'member' },
  roledesc: { type: String, default: 'member' }
},{
  collection: 'users'
});

userSchema.methods.encryptPassword = async (password)  => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

userSchema.methods.comparePassword = async function (password)  {
  console.log(password);
  console.log(this.password);
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
}
  
  const user = mongoose.model('User', userSchema);
  
  module.exports = user;;