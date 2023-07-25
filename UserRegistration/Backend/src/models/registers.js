const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});
//now we need to create a collection
const Registers=new mongoose.model('Register',userSchema);
module.exports=Registers;