import dotenv from 'dotenv'
dotenv.config()
import  express  from "express"
import bootstrap from "./src/index.router.js"
import sendEmail from './src/utils/email.js'
const app = express()
const port = process.env.PORT || 5000

app.use(`/uploads`,express.static("./src/uploads"))
bootstrap(app,express)


app.listen(port,()=>{
    console.log(`port is running on port.......${port}`);
})