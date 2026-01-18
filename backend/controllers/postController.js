import Posts from "../models/Posts.js";

export const createPost = async (req, res) => {
    const { content } = req.body ?? {};
    const author = req.userId;
    const image = req.file
        ? `${process.env.BASE_URL}/${req.file.path.replace(/\\/g, "/")}`
        : null;
    console.log('image', image);

    if (!content) {
        return res.status(400).json({
            status: "error",
            message: "one of them are required",
        });
    }

    try {
        const newPost = await Posts.create({
            content,
            author,
            image
        })
        return res.status(200).json({ status: "success", message: "Post created successfully", post: newPost })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body ?? {};
    const image = req.file
        ? `${process.env.BASE_URL}/${req.file.path.replace(/\\/g, "/")}`
        : null;
    console.log('image', image);
    try {
        const existingPost = await Posts.findById(id).populate("author");
        console.log("author id:", existingPost.author._id)
        console.log("req id:", req.userId)
        if (!existingPost) {
            return res.status(404).json({ status: "error", message: "Post doesn't existing" })
        }

        if (existingPost.author._id.toString() !== req.userId) {
            return res.status(403).json({
                status: "error",
                message: "You are not authorized to update this post",
            });
        }

        existingPost.content = content ?? existingPost.content;
        existingPost.image = image ?? existingPost.image;
        await existingPost.save();
        return res.status(200).json({
            status: 'success',
            data: 'Post successfully updated',
            post: existingPost
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}


export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const isExist = await Posts.findById(id).populate("author");
        if (!isExist) return res.status(404).json({ status: 'error', data: 'Post not found' });

        if (isExist.author._id.toString() !== req.userId) {
            return res.status(403).json({
                status: "error",
                message: "You are not authorized to delete this post",
            });
        }

        await Posts.findByIdAndDelete(id);
        return res.status(200).json({
            status: 'success',
            message: 'Post deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}



export const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find().populate("author", "username profilePicture");
        return res.status(200).json({ status: "success", posts: posts })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}

export const getSinglePost = async (req, res) => {
    const { id } = req.params;
    try {
        const singlePost = await Posts.findById(id);
        return res.status(200).json({
            status: "success",
            singlePost
        })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}