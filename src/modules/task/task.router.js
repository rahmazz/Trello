import { Router } from "express";
import * as taskController from "./controller/task.js";
const router=Router()
import {auth} from "../../middleWare/authontication.js"
import { validation } from "../../middleWare/validation.js";
import * as validatores from "./validation.js"
import { fileUpload ,fileValidation } from "../../utils/multer.cloud.js";


router.post('/addtask',validation(validatores.addtask),auth,taskController.addTask)
router.put('/:taskId',validation(validatores.updatetask),auth,taskController.updateTask )
router.delete('/:taskId',validation(validatores.deletetask),auth,taskController.deleteTask )
router.get('/',taskController.getAllTask )
router.get('/getOneUserTask',validation(validatores.getoneusertask),auth,taskController.getOneUserTask )
router.get('/mytask',validation(validatores.mytask),auth,taskController.myTask )
router.get('/tasksdonebeforedeadline',taskController.tasksDoneBeforeDeadline)
router.patch('/addattachment',
auth ,
fileUpload(fileValidation.allowMimeType).single('attachment'),
taskController.addAttachmentToTask)

export default router