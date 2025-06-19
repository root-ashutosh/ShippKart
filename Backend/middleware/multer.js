import multer from "multer";

const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})
// here we will have to keep the filename "storage" else this middleware will not work

const upload = multer({storage})

export default upload 