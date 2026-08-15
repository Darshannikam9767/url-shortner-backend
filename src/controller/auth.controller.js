import express from "express"
import wrapAsync from "../utils/tryCatchWrapper.js"
import { loginUser, registerUSer } from "../services/auth.service.js"
import { cookieOptions } from "../config/config.js"

export const register_user = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body

    const token = await registerUSer(name, email, password)
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({
        message: "register success"
    })
})

export const login_user = wrapAsync(async (req, res) => {
    const { email, password } = req.body
    const token = await loginUser(email, password)
    req.user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({
        message: "login success"
    })
})