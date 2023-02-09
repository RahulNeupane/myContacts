const asyncHandlder = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
//@description Register user
//@route Get /api/users/register
//@access public
const registerUser = asyncHandlder( async (req,res)=>{
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields required")
    }
    const userAvailable = await User.findOne({email})

    if(userAvailable){
        res.status(400)
        throw new Error("user already registered");
    }
    //hash password 
    const hashedPass = await bcrypt.hash(password,10)
    const user = await User.create({
        username,
        email,
        password: hashedPass,
    })
    console.log(`User created ${user}`)
    if(user){
        res.status(201).json({_id: user.id,email: user.email})
    }else{
        res.status(400)
        throw new Error("user data not valid !")
    }
    res.json({message: 'Regsiter the user'})
})
//@description Login
//@route Get /api/users/login
//@access public
const loginUser = asyncHandlder( async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields required")
    }
    const user = await User.findOne({email})
    // compare given pass with hashed pass 
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            // payload 
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACTION_TOKEN_SECRET,
        {expiresIn: "1m"}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("email or password is not valid")
    }
})
//@description current user info
//@route Get /api/users/current
//@access private
const currentUser = asyncHandlder( async(req,res)=>{
    res.json(req.user)
})
module.exports = {registerUser,loginUser,currentUser}