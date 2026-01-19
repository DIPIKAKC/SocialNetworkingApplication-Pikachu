import express from 'express';
import { followUser, getAllUser, getFollowCounts, getUser, getUserById, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import { notAllowed } from '../utils/notAllowed.js';
import { checkUser } from '../middleware/checkUser.js';
import { upload } from '../utils/cloudinary.js';

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

router.route('/exceptme')
.get(checkUser, getAllUser)
.all(notAllowed)

router.route('/profile/:id')
  .get(checkUser, getUserById)
  .all(notAllowed);

router.route('/:id')
.patch(checkUser,upload.single("profilePicture"), updateUser)
.all(notAllowed)

router.post("/:id/follow", checkUser, followUser);
router.get("/:id/follow-counts", getFollowCounts);


export default router;