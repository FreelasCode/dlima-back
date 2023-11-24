import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
  });
  
export const upload = multer({ storage });