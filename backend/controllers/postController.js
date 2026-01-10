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


export const getAllPosts = async (req, res) => {
try {
    const allPosts = await Posts.find();
    return res.status(200).json({status:"success",allPosts})
} catch (error) {
    return res.status(500).json({status:"error",message:error.message})
}
}

export const getSinglePost = async(req,res)=>{
    const {id}= req.params;
    try {
        const singlePost = await Posts.findById(id);
        return res.status(200).json({
            status:"success",
            singlePost
        })
    } catch (error) {
        return res.status(500).json({status:"error",message:error.message})
    }
}