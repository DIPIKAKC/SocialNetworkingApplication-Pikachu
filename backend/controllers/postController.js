import Posts from "../models/Posts.js";

export const createPost = async(req,res) =>{
    const {content, author, likes, comments} = req.body ?? {};
    try {
        const newPost= await Posts.create({
            content,
            author,
            likes,
            comments
        })
        return res.status(200).json({status:"success",message:"Post created successfully",newPost})
    } catch (error) {
        return res.status(500).json({status:"error",message:error.message})
    }
}