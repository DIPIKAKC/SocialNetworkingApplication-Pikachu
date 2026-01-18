import Users from "../models/Users.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body || {};
    const profilePicture = req.file
        ? `${process.env.BASE_URL}/${req.file.path.replace(/\\/g, "/")}`
        : null;
    console.log('profilePicture', profilePicture);

    try {

        if (!username || !email || !password || !profilePicture) {
            return res.status(400).json({
                status: "error",
                message: "all details are required",
            });
        }

        const hashPass = bcrypt.hashSync(password, 10)

        const newUser = await Users.create({
            username,
            email,
            password: hashPass,
            profilePicture: profilePicture
        });
        return res.status(200).json({ status: "success", message: "user registered successfully", data: newUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "error", message: error.message })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) return res.status(400).json({ status: 'error', data: ('please provide your details to login') })

        let account = await Users.findOne({ email });
        if (!account) return res.status(404).json({ status: 'error', data: "User doesnot exist" })

        const pass = bcrypt.compareSync(password, account.password);
        if (!pass) return res.status(400).json({ status: 'error', data: "Invalid password" });

        const token = jwt.sign({
            id: account.id,
        }, process.env.JWT_SECRET);
        return res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: account.id,
                    email: account.email,
                    profilePicture: account.profilePicture,
                },
                token,
            },
        })

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}


export const updateUser = async (req, res) => {
    const { bio, username, email } = req.body ?? {};
    const profilePicture = req.file
        ? `${process.env.BASE_URL}/${req.file.path.replace(/\\/g, "/")}`
        : null;
    const { id } = req.params;

    try {
        const existingUser = await Users.findById(id);

        if (!existingUser) {
            return res.status(404).json({ status: "error", message: "User doesn't exist" })
        }

        if (id !== req.userId) {
            return res.status(403).json({
                status: "error",
                message: "You are not authorized to update this user",
            });
        }

        existingUser.username = username ?? existingUser.username;
        existingUser.email = email ?? existingUser.email;
        existingUser.bio = bio ?? existingUser.bio;
        existingUser.profilePicture = profilePicture ?? existingUser.profilePicture;

        await existingUser.save();
        return res.status(200).json({
            status: 'success',
            data: 'User successfully updated',
            user: existingUser
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message })
    }
}


export const getUser = async (req, res) => {
    try {
        const user = await Users.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ status: 'error', data: 'user not found' })

        return res.status(200).json({
            status: "success",
            user: user
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })

    }
}


//personal prof
export const toggleLikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const userId = req.userId;
        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            post.likes = post.likes.filter(
                (id) => id.toString() !== userId
            );
        } else {
            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json({
            success: true,
            message: isLiked ? "Post unliked" : "Post liked",
            likesCount: post.likes.length,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * Add comment
 */
export const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        post.comments.push({
            text,
            author: req.user.id,
        });

        await post.save();

        res.status(201).json({
            success: true,
            message: "Comment added",
            data: post.comments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};