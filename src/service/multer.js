import multer from 'multer';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class MulterService{
    constructor(){
        this.initStorate();
    }
    fileFilter(req, file, cb){
        const allowedFileTypes = /jpeg|jpg|png/;
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedFileTypes.test(file.mimetype);
        if(extname && mimetype){
            cb(null, true);
        }else {
            cb(new Error('Only allowed jpg and png'), false);
        }
    }
    initStorate(){
        const storage = multer.diskStorage({
            destination: (req, file, cb)=>{
                cb(null, path.join(__dirname, '..', '..', 'uploads'))
            },
            filename: (req, file, cb)=>{
                cb(null, Date.now() +'_'+ file.originalname)
            }
        })  
        this.upload = multer({
            storage,
            limits: {
               fileSize: 1024*1024*10//10mb
            },
            fileFilter: this.fileFilter
        })
    }
}