import jsonwebtoken from "jsonwebtoken"

import { createUser, findUserByEmail } from "../dao/user.dao.js"
import { signToken } from "../utils/helper.js"
import bcrypt from "bcrypt"
export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email)

    if(user){
       throw new Error("User already exists, try login!")
    }

    const newUser = await createUser(name,email,password)
    const token = await signToken({id:newUser._id})
    return {token,newUser}
}

export const loginUser = async (email, password) => {

    const user = await findUserByEmail(email)
    
    if(!user || !(await bcrypt.compare(password, user.password))) throw new Error("Invalid Credentials")
    
    const token = await signToken({id : user._id})
    return {token,user}
}