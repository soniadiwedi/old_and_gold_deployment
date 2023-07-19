const mongoose= require("mongoose");

const usersSchema= mongoose.Schema({
        name:{type:String,required:true},
        email:{type:String,required:true},
        role:{type:String,required:true,enum:["Dealer","Customer"]},
        password:{type:String,required:true},  
        location:{type:String,required:true},
},{
    versionKey:false
})


const UsersModel=mongoose.model("user",usersSchema);


module.exports={
    UsersModel
}