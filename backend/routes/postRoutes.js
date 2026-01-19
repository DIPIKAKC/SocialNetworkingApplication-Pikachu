import express from 'express';
import { notAllowed } from '../utils/notAllowed.js';
import { createPost, deletePost, getAllPosts, getMyPosts, getSinglePost, toggleLikePost, updatePost } from '../controllers/postController.js';
import { checkUser } from '../middleware/checkUser.js';
import { upload } from '../utils/cloudinary.js';

const router = express.Router();

router.route('/')
    .post(checkUser, upload.single("image"), createPost)
    .get(getAllPosts)
    .all(notAllowed)

router.route("/myposts")
    .get(checkUser, getMyPosts)
    .all(notAllowed);

router.route('/:id')
    .get(getSinglePost)
    .patch(checkUser, upload.single("image"), updatePost)
    .delete(checkUser, deletePost)
    .all(notAllowed)

router.route('/:id/like')
    .patch(toggleLikePost)
    .all(notAllowed)


export default router;