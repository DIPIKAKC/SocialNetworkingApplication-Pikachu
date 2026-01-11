import Posts from "../models/Posts.js";

export const createPost = async (req, res) => {
    const { content, author } = req.body ?? {};

    if (!content || !author) {
        return res.status(400).json({
            status: "error",
            message: "content and author are required",
        });
    }

    try {
        const newPost = await Posts.create({
            content,
            author,
        })
        return res.status(200).json({ status: "success", message: "Post created successfully", newPost })
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}


export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body ?? {};
    try {
        const existingProduct = await Posts.findByIdAndUpdate(id);

        if (!existingProduct) {
            return res.status(404).json({ status: "error", message: "Post doesn't existing" })
        }

        existingProduct.content = content || existingProduct.content;
        await existingProduct.save();
        return res.status(200).json({
            status: 'success',
            data: 'Post successfully updated',
            existingProduct
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}


export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const isExist = await Posts.findById(id);
        if (!isExist) return res.status(404).json({ status: 'error', data: 'Post not found' });
        await isExist.deleteOne();
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
        const allPosts = await Posts.find();
        return res.status(200).json({ status: "success", allPosts })
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