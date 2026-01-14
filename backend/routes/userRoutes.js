import express from 'express';
import { getUserById, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { upload } from '../utils/Multer.js';

const router = express.Router();

router.route('/register')
.post(upload.single("profilePicture"),registerUser)
.all(notAllowed)

router.route('/login')
.post(loginUser)
.all(notAllowed)

router.route('/:id')
.get(getUserById)
.patch(updateUser)
.all(notAllowed)

export default router;