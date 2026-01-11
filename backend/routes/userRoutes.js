import express from 'express';
import { getUserById, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import { notAllowed } from '../utils/notAllowed.js';

const router = express.Router();

router.route('/api/users/register')
.post(registerUser)
.all(notAllowed)

router.route('/api/users/login')
.post(loginUser)
.all(notAllowed)

router.route('/api/users/:id')
.get(getUserById)
.patch(updateUser)
.all(notAllowed)

export default router;