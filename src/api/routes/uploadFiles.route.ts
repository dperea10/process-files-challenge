import multer from 'multer';
import { Router } from "express";
import validate from './../middleware/validate';
import middleware from "../middleware/auth";
import fileController from "../../controllers";
import uploadValidation from "../validations/uploadFiles.validation";

const uploadRoute = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage })

uploadRoute.post('/upload-file',  
    upload.single('XLSX'),
    middleware.auth, 
    validate(uploadValidation.upload),
    fileController.getFileAndCreateRegisters
)

uploadRoute.get('/upload-file',  
    middleware.auth, 
    validate(uploadValidation.getUploadFile),
    fileController.getInfoTransaction
)


export {uploadRoute};