import jwt from "jsonwebtoken"
import { asyncHandeller } from "../utils/errorHandeling.js";
import userModel from "../../DB/models/user.model.js";


export const auth = asyncHandeller(
    async(req,res,next) =>{
    const {authorization}=req.headers
    console.log({authorization});

    if(!authorization?.startsWith(process.env.TOKEN_BEARER)){
        return next(new Error("authorization is required or In-Valid Bearer key",{cause:400}))
    }
    console.log(authorization.startsWith(process.env.TOKEN_BEARER));

    const token = authorization.split(process.env.TOKEN_BEARER)[1]
    console.log({token});
    if (!token) {
        return next(new Error("token is required",{cause:400}))
    }
    const decoded = jwt.verify(token , process.env.TOKEN_SIGNITURE)
    console.log({decoded});

    if(!decoded?.id){
        return next(new Error("In-Valid token payload",{cause:400}))
    }
    const user = await userModel.findById(decoded.id)
    console.log({user});
    if(!user){
        return next(new Error("not register account",{cause:401}))
    }
    req.user=user
    next()
    })