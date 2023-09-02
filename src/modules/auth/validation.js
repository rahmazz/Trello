import joi from "joi"

export const signup = {

    body:joi.object({
            email:joi.string().email({ minDomainSegments:2 , maxDomainSegments:3 , tlds:{ allow: [ 'com' , 'edu' , 'eg' , 'net'] } }).required(),
            password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            cpassword:joi.string().valid(joi.ref("password")).required(),
            userName:joi.string().alphanum().min(3).max(15).required(),
            fName:joi.string().min(3).max(15).required(),
            lName:joi.string().min(3).max(15).required(),
            age:joi.number().integer().positive().min(18).max(95),
            phone:joi.string().min(11).max(11).required(),
            gender:joi.string().alphanum(),
            }).required(),
            // .options({allowUnknown:true})
    params:joi.object({
            flag:joi.boolean().truthy("1").falsy("0").sensitive(),
            ingrediants:joi.array().items(joi.string().required(),joi.number()).length(5),
            })

}

export const login = {
    body:joi.object({
        email:joi.string().email({ minDomainSegments:2 , maxDomainSegments:3 , tlds:{ allow: [ 'com' , 'edu' , 'eg' , 'net'] } }).required(),
        password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }).required()
}


export const confirmemail ={
    params:joi.object({
        authorization:joi.string().required(),
        }).required().options({allowUnknown:true})
}



export const newconfirmemail ={
    params:joi.object({
        authorization:joi.string().required(),
        }).required()
}



export const unsubscribe ={
    params:joi.object({
        authorization:joi.string().required(),
        }).required()
}



export const confirmpassword ={
    params:joi.object({
        authorization:joi.string().required(),
        }).required()
}