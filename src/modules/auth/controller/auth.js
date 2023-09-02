import { asyncHandeller } from "../../../utils/errorHandeling.js";
import userModel from "../../../../DB/models/user.model.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { decrypt } from "dotenv";
import jwt from "jsonwebtoken"
import sendEmail from "../../../utils/email.js";
import * as validatores from "../validation.js"


export const signUp = asyncHandeller(
    async(req,res,next) =>{
        console.log(req.protocol);
        console.log(req.headers.host);
        // const {email,password,userName,fName,lName,gender,age,phone,cpassword}=req.body
        // console.log({email,password,userName,fName,lName,gender,age,phone,cpassword});

        // if(password!=cpassword){
        //     return next(new Error("password doesn't match cpassword",{cause:400}))
        // }
        const checkData = await userModel.findOne({$or:[{email},{phone},{userName}]})
        if(checkData){
            if(checkData.email==email){
                return next(new Error("Email already exist ",{cause:409}))
            }
            if(checkData.phone==phone){
                return next(new Error("phone already exist"))
            }
            return next(new Error("userName already exist"))
        }
        const hassPassword=bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND))
        const user = await userModel.create({email,password:hassPassword,userName,fName,lName,gender,age,phone})

        //make it authinticated after sign up and return token with result

        const token = jwt.sign(
            { id: user._id , email: user.email},
            process.env.EMAIL_SIGNITURE,
            {expiresIn: 60*5 }
            )
        const newConfirmEmailToken = jwt.sign(
            { id: user._id , email: user.email},
            process.env.EMAIL_SIGNITURE,
            {expiresIn: 60*60*24*30 }
            )
        const unSubscribetoken = jwt.sign(
            { id: user._id , email: user.email},
            process.env.EMAIL_SIGNITURE,
            {expiresIn: 60*5 }
            )

            
        const emaillink = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
        const requestNewEmailLink =` ${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${newConfirmEmailToken}`
        const UnSubscribeLink =` ${req.protocol}://${req.headers.host}/auth/unSubscribe/${unSubscribetoken}`
        const html =
        `
        <a href="${emaillink}">Confirm Email</a>
        <br>
        <br>
        <br>
        <a href="${requestNewEmailLink}">Request new confirmation email</a>
        <br>
        <br>
        <a href="${UnSubscribeLink}">Un Subscribe</a>
        `
        await sendEmail({to:email ,subject:"Confirmation Email",html})
        res.status(201).json({message:"user added sucessfully",user});
    }
)


export const confirmEmail = asyncHandeller(
    async(req,res,next) =>{
        const {token} = req.params
        console.log({token}); 
        const decoded = jwt.verify(token , process.env.EMAIL_SIGNITURE)
        console.log(decoded);
        const user = await userModel.findByIdAndUpdate( decoded.id , {confirmemail:true})
        return user ? res.send("welcome to login page") : next(new Error("Not register account",{cause:404}))

        // or res.send(`<a href="signUp">OPs look like u don't have account yet follow me to signUp</a>`)
    }
)


export const newConfirmEmail = asyncHandeller(
    async(req,res,next) =>{
        const {token} = req.params
        console.log({token}); 
        const decoded = jwt.verify(token , process.env.EMAIL_SIGNITURE)
        console.log(decoded);
        const user = await userModel.findById( decoded.id )
        if (!user) {
            return next(new Error("Not register account",{cause:404}))
            //or res.send(`<a href="signUp">OPs look like u don't have account yet follow me to signUp</a>`)
        }
        if(user.confirmemail){
            return res.send("welcome to login page")
            // or return res.redirect("//login.pg")
        }
        const newToken = jwt.sign(
            { id: user._id , email: user.email},
            process.env.EMAIL_SIGNITURE,
            {expiresIn: 60*2 }
            )
        const emaillink = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
        const html = `<a href="${emaillink}">Confirm Email</a>`
        await sendEmail({to : user.email ,subject:"Confirmation Email",html})

        res.json({message:"Check your inbox now"});
    }
)


export const unSubscribe = asyncHandeller(
    async(req,res,next) =>{
        const {token} = req.params
        console.log({token}); 
        const decoded = jwt.verify(token , process.env.EMAIL_SIGNITURE)
        console.log(decoded);
        const user = await userModel.findById( decoded.id )
        if (!user) {
            return next(new Error("Not Subscibe account with this email",{cause:404}))
        }
        const deleteAccount = await userModel.findByIdAndDelete( decoded.id )
        res.status(201).json({message:"user deleted sucessfully"});
    }
)


export const signIn = asyncHandeller(
    async(req,res,next) =>{
        const {email,password}=req.body
        console.log({email,password});

        const user = await userModel.findOne({email})
        if(!user){
            return next(new Error("Email not Exist",{cause:404}))
        }
        const matchpass= bcrypt.compareSync(password,user.password)
        if(!matchpass){
            const passwordToken = jwt.sign(
                { id: user._id , email: user.email},
                process.env.EMAIL_SIGNITURE,
                {expiresIn: 60*5 }
                )
            const passwordLink=`${req.protocol}://${req.headers.host}/auth/forgetPassword/${passwordToken}`
            const html =`<a href="${passwordLink}">Confirm password</a>`
            await sendEmail({to:user.email ,subject:"Forget password",html})
            res.json({message:"Check your inbox now to confirm your password"});
    
        }
        const loguser = await userModel.findOneAndUpdate({email},{isOnline:true,isDeleted:false})
        const token =jwt.sign(
            {userName:user.userName ,id:user._id, isOnline:true},
            process.env.TOKEN_SIGNITURE,
            {expiresIn:'1y'}
            )
            return res.status(StatusCodes.OK).json({ massege: "Done",token });
        }
)


export const  forgetPassword = asyncHandeller(
    async(req,res,next) =>{
        const {token} = req.params
        console.log({token}); 
        const decoded = jwt.verify(token , process.env.EMAIL_SIGNITURE)
        console.log(decoded);
        const user = await userModel.findById( decoded.id )
        if (!user) {
            return next(new Error("In-Valid User-id",{cause:404}))
        }
        const updatedPassword = await userModel.findById( decoded.id)
        res.status(201).json({message:"hello to homePg"});
    }
)


