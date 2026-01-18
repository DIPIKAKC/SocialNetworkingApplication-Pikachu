import express from 'express';
import { getUser, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { upload } from '../utils/Multer.js';
import { checkUser } from '../middleware/checkUser.js';
import { checkId } from '../middleware/CheckId.js';

const router = express.Router();

router.route('/register')
.post(upload.single("profilePicture"),registerUser)
.all(notAllowed)

router.route('/login')
.post(loginUser)
.all(notAllowed)

router.route('/')
.get(checkUser, getUser)
.all(notAllowed)

router.route('/:id')
.patch(checkUser,upload.single("profilePicture"), updateUser)
.all(notAllowed)

export default router;