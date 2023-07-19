const express=require('express')
const userRouter=express.Router()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UsersModel } = require('../model/userModel');
require("dotenv").config();



userRouter.post('/signin', async (req, res) => {
  const { name, email, password, location, role } = req.body;
  try {
    const isExists = await UsersModel.findOne({ email });
    if (isExists) {
      return res.status(208).json({ msg: 'Email Already has been registered!', status: false });
    } else {
      const hashedPassword = await bcrypt.hash(password, 5);
      const saveUser = new UsersModel({
        name,
        email,
        location,
        password: hashedPassword,
        role: role ? 'Dealer' : 'Customer',
      });
      const isSave = await saveUser.save();
      return res.status(201).json({ msg: 'Now, You are registered!', isSave, status: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});


userRouter.post("/login",async(req,res)=>{
    const { email, password } = req.body;
  try {
    const isExists = await UsersModel.findOne({ email });
    if (isExists) {
      bcrypt.compare(password, isExists.password).then((isValid) => {
        if (isValid) {
          return res
            .status(200)
            .json({
              msg: "Login Successfull",
              token: jwt.sign(
                { userId: isExists._id, userName: isExists.name,role:isExists.role },
                process.env.PRIVATE_KEY
              ),
              uid:isExists._id,
              isDelaer:isExists.role=="Dealer"?true:false,
              status:true
            });
        } else {
          return res.status(200).json({ msg: "Incorrect Password",status:false });
        }
      });
    } else {
      return res
        .status(203)
        .json({
          msg: "You are not registered. Please Register yourself first",
          status:false
        });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
})

module.exports={userRouter}


// "name":"sonia",
// "email":"sonia@gmail.com",
// "role":"Customer",
// "password":"123",
// "location":"delhi"