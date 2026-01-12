import express from 'express';
import { notAllowed } from '../utils/notAllowed.js';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '../controllers/postController.js';
import { checkUser } from '../middleware/checkUser.js';

const router = express.Router();

router.route('/')
.post(checkUser,createPost)
.get(getAllPosts)
.all(notAllowed)

router.route('/:id')
.get(getSinglePost)
.patch(checkUser,updatePost)
.delete(checkUser,deletePost)
.all(notAllowed)

export default router;