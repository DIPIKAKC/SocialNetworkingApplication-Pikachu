import express from 'express';
import { notAllowed } from '../utils/notAllowed.js';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/postController.js';
import { checkUser } from '../middleware/checkUser.js';
import { upload } from '../utils/Multer.js';

const router = express.Router();

router.route('/')
.post(checkUser, upload.single("image"),createPost)
.get(getAllPosts)
.all(notAllowed)

router.route('/:id')
.get(getSinglePost)
.patch(checkUser, upload.single("image"), updatePost)
.delete(checkUser,deletePost)
.all(notAllowed)

export default router;