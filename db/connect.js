const mongoose = require('mongoose');
const mongo = mongoose.connect('mongodb://127.0.0.1:27017/Authentication')
  .then(() => console.log('Connected!'));

  const authSchema = mongoose.Schema({
    
    username: String,
    email:String,
    password: String,
  })

  const dbModel = mongoose.model("Basic-Auth",authSchema);
module.exports = dbModel;