import express from "express"
import wrapAsync from "../utils/tryCatchWrapper.js"
import { loginUser, registerUSer } from "../services/auth.service.js"
import { cookieOptions } from "../config/config.js"

export const register_user = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body

    const { token, newUser } = await registerUSer(name, email, password)
    req.user = newUser
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({
        message: "register success", newUser
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
        message: "login success"
    })
})