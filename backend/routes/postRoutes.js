import express from 'express';
import { notAllowed } from '../utils/notAllowed.js';
import { createPost } from '../controllers/postController.js';

const router = express.Router();

router.route('/api/posts')
.post(createPost)
.all(notAllowed)


export default router;