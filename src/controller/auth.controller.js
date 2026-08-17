import express from "express"
import wrapAsync from "../utils/tryCatchWrapper.js"
import { loginUser, registerUser } from "../services/auth.service.js"
import { cookieOptions } from "../config/config.js"

export const register_user = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body
    const { token, newUser } = await registerUser(name, email, password)
    req.user = newUser
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({
        message: "register success",
        user: {
            id:newUser._id,
            name:newUser.name,
            email:newUser.email
        } 
    })
})

export const login_user = wrapAsync(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" })
    }
    
    const { token, user } = await loginUser(email, password)
    req.user = user

    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({
        message: "login success",
        user: {
            id:user._id,
            name:user.name,
            email:user.email
        }
    })
})

export const get_current_user = wrapAsync( async(req,res) => {
   if(req.user){
     return res.status(200).json({
        user:req.user
    })
   }
   return res.status(401).json({
        message:"Unauthrized"
    })

})