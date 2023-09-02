import { Schema } from "mongoose"
import * as validatores from "../modules/auth/validation.js"

const dataMethods = [ 'body' , 'params' , 'headers' , 'files' , 'query']

export const validation = (joiSchema) =>{
    return (req,res,next) => {
        const ValidationErr=[]
        dataMethods.forEach(key =>{
            if (joiSchema[key]) {
                const validationResult = joiSchema[key].validate(req[key] , { abortEarly: false})
                if (validationResult.error) {
                    ValidationErr.push(validationResult.error.details)
                }
            }
        })
        if (ValidationErr.length > 0) {
            res.json({message:"Validation Error" ,ValidationErr})
        }
        return next()
    } 
}


