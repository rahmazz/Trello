import { Router } from "express";
import* as authController from "./controller/auth.js"
import { validation } from "../../middleWare/validation.js";
import * as validatores from "./validation.js"

const  router = Router()

router.post(`/signup`,validation(validatores.signup),authController.signUp)
router.get(`/confirmEmail/:token`,validation(validatores.confirmemail),authController.confirmEmail)
router.get(`/newconfirmEmail/:token`,validation(validatores.newconfirmemail),authController.newConfirmEmail)
router.get(`/unsubscribe/:token`,validation(validatores.unsubscribe),authController.unSubscribe)
router.get(`/forgetpassword/:token`,validation(validatores.confirmpassword),authController.forgetPassword)
router.post(`/signin`,validation(validatores.login),authController.signIn)


export default router