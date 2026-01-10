import express from 'express';
import { notAllowed } from '../utils/notAllowed.js';
import { createPost, getAllPosts, getSinglePost } from '../controllers/postController.js';

const router = express.Router();

router.route('/api/posts')
.post(createPost)
.get(getAllPosts)
.all(notAllowed)

router.route('/api/posts/:id')
.get(getSinglePost)
.all(notAllowed)

export default router;