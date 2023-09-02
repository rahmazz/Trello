import multer from "multer";

export const fileValidation = {
    allowMimeType:['image/jpeg', 'image/png', 'image/gif' , 'image/jpg' ,
    'application/pdf' ,'application/msword','text/css', 'text/html' , 'text/javascript' ]
}

export  function fileUpload( customValidation = [] ){

    const storage = multer.diskStorage({})
    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null , true)
        }else{
            cb(new Error("In-Valid File Format"), {cause:400} , false)
        }
    }
    const uupload = multer({ storage , fileFilter })
    return uupload

}