import express from 'express';
import multer from 'multer';

const router = express.Router();

// this code is gonna remain always same in your project
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });

router.post(
    '/',
    upload.single('file', (req, res) => {
        try {
            return res.status(200).json('File Uploaded Successfully');
        } catch (error) {
            console.log(error);
        }
    }),
); // this is a middleware provided by builder

export default router;
