import Posts from "../models/Posts.js";
import Users from "../models/Users.js";

export const globalSearch = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                status: "error",
                message: "Search query is required"
            });
        }

        //posts by content
        const posts = await Posts.find({
            content: { $regex: q, $options: "i" }
        })
            .populate("author", "username profilePicture")
            .limit(20)
            .sort({ createdAt: -1 });

        //users by username or bio
        const users = await Users.find({
            $or: [
                { username: { $regex: q, $options: "i" } },
                { bio: { $regex: q, $options: "i" } }
            ]
        })
            .select("username profilePicture bio following followers")
            .limit(20);

        return res.status(200).json({
            status: "success",
            posts,
            users
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

