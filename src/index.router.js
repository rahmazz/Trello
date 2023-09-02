import DBconnection from "../DB/connection.js"
import userRouter from "./modules/user/user.router.js"
import authRouter from "./modules/auth/auth.router.js"
import taskRouter from "./modules/task/task.router.js"
import { globalErrorHandelling } from "./utils/errorHandeling.js"
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';


const bootstrap = (app,express) =>{
    app.use(express.json())
    app.use(`/user`,userRouter)
    app.use(`/task`,taskRouter)
    app.use(`/auth`,authRouter)
    app.use(`*`,(req,res,next)=>{
        res.json({message:"In-Valid routing"})
    })
    app.use(globalErrorHandelling)


    DBconnection()
}

export default bootstrap