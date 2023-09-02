import * as userController from "./controller/user.js"
import { Router } from "express"
const router = Router()
import {auth} from "../../middleWare/authontication.js"
import { validation } from "../../middleWare/validation.js";
import * as validatores from "./validation.js"
import { fileUpload , fileValidation } from "../../utils/multer.cloud.js";


router.get(`/`,auth,validation(validatores.userprofile),userController.userProfile)
router.put(`/changepassword`,validation(validatores.changepassword),auth,userController.changePassword)
router.put(`/update`,validation(validatores.update),auth,userController.updateUser)
router.delete(`/delete`,validation(validatores.deleteuser),auth,userController.deleteUser)
router.put(`/softdelete`,validation(validatores.softdeleteuser),auth,userController.softDelete)
router.put(`/logout`,validation(validatores.logout),auth,userController.logout)

router.patch(`/profile/image`,
auth,
fileUpload(fileValidation.allowMimeType).single('image'),
userController.profileImage
)

router.patch(`/profile/cover/image`,
auth,
fileUpload(fileValidation.allowMimeType).array('image' , 5),
userController.profileCoverImages
)

export default router



