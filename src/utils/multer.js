// import multer from "multer";
// import { nanoid } from "nanoid";
// import path from "path";
// import fs from "fs"
// import { fileURLToPath } from "url"
// const __dirname = fileURLToPath(import.meta.url)



// export const fileValidation = {
//     allowMimeType:['image/jpeg', 'image/png', 'image/gif' , 'image/jpg' , 'application/pdf' ,'application/msword']
// }


// export  function fileUpload( customPath ="general" , customValidation = [] ){

//     const filePath = `uploads/${customPath}`
//     const fullPath = path.join( __dirname ,  `../../${filePath}`)

//     if (!fs.existsSync(fullPath)) {
//         fs.mkdirSync(fullPath , {recursive:true})
//     }
//     const storage = multer.diskStorage({
//         destination:( req, file, cb )=>{
//             cb( null, fullPath)
//         },
//         filename:( req, file, cb )=>{
//             console.log({DISKFILE: file });
//             const uniqeOriginalName= nanoid() + "_" + file.originalname
//             file.finalDest = `${filePath}/${uniqeOriginalName}`
//             cb( null, uniqeOriginalName)
//         }
//     })

//     function fileFilter(req, file, cb) {
//         if (customValidation.includes(file.mimetype)) {
//             cb(null , true)
//         }else{
//             cb(new Error("In-Valid File Format"), {cause:400} , false)
//         }
//     }
//     const uupload = multer({ storage , fileFilter })
//     return uupload

// }




























// import multer from 'multer'
// import { nanoid } from 'nanoid';
// import fs from 'fs'
// import path from 'path';

// import { fileURLToPath } from 'url';
// const __dirname = fileURLToPath(import.meta.url)

// export const fileValidation = {
//     allowMimeType:['image/jpeg', 'image/png', 'image/gif' , 'image/jpg' , 'application/pdf' ,'application/msword']
//     // image: ['image/jpeg' , 'image/png' , 'image/gif' , 'image/jpg'],
//     // file: [ 'application/pdf' , 'application/msword']
// }

// export function fileUpload(customPath = "general",customValidation = []){

//     const filePath = `uploads/${ customPath }`
//     const fullPath = path.join( __dirname , `../../${filePath}`)
//     console.log({ dirname: __dirname });
//     console.log(filePath);

//     console.log({ customPath , isExist:fs.existsSync(filePath)});
//     if ( !fs.existsSync(fullPath) ) {
//         fs.mkdirSync( fullPath , { recursive: true})
//     }

//     const storage = multer.diskStorage({
//         destination:(req,file,cb)=>{
//             cb(null, fullPath )
//         },
//         filename:(req,file,cb)=>{
//             console.log({DISKFILE: file });
//             const uniqueFileName = nanoid() + "_" + file.originalname
//             file.finalDest = `${filePath}/${uniqueFileName}`
//             cb(null, uniqueFileName)
//         }
//     })
//     function fileFilter(req,file,cb){
//         if (customValidation.includes(file.mimetype)) {
//             cb(null, true)
//         }else{
//             cb(new Error("In-Valid File Format"), {cause:400}, false)
//         }
//     }
//     const upload = multer({ fileFilter, storage })
//     return upload
// }


















