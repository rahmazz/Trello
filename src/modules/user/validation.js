import joi from "joi"


export const changepassword = {
    body:joi.object({
            password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            cpassword:joi.string().valid(joi.ref("password")).required(),
            }).required(),
    headers:joi.object({
            authorization:joi.string().required(),
            }).required().options({allowUnknown:true})
}


export const update = {
    body:joi.object({
        fName:joi.string().min(3).max(15).required(),
        lName:joi.string().min(3).max(15).required(),
        age:joi.number().integer().positive().min(18).max(95),
        }).required(),
    headers:joi.object({
        authorization:joi.string().required(),
        }).required().options({allowUnknown:true})
}



export const userprofile  = {
    headers:joi.object({
        authorization:joi.string().required(),
        }).required().options({ allowUnknown: true }),
}


export const deleteuser = {
    headers: joi.object({
        authorization: joi.string().required(),
        }).required().options({ allowUnknown: true }),
}


export const softdeleteuser ={
    headers:joi.object({
        authorization:joi.string().required(),
        }).required().options({allowUnknown:true})
}



export const logout ={
    headers:joi.object({
        authorization:joi.string().required(),
        }).required().options({allowUnknown:true})
}


