const asyncHandlder = require("express-async-handler")

//@description Register user
//@route Get /api/users/register
//@access public
const registerUser =asyncHandlder( async (req,res)=>{
    res.json({message: 'Regsiter the user'})
})
//@description Login
//@route Get /api/users/login
//@access public
const loginUser = asyncHandlder( async (req,res)=>{
    res.json({message: "Login user"})
})
//@description current user info
//@route Get /api/users/current
//@access private
const currentUser = asyncHandlder( async(req,res)=>{
    res.json({message: "Current user information"})
})

module.exports = {registerUser,loginUser,currentUser}