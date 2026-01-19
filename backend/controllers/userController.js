import Users from "../models/Users.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Posts from "../models/Posts.js";

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


//user and their posts
export const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    //Fetch posts of this user
    const posts = await Posts.find({ author: req.params.id })
      .populate("author", "username profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      user,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//all except me
export const getAllUser = async (req, res) => {
    try {
        const allUser = await Users.find({
            _id: { $ne: req.userId }, // excluding current user
        }).select("-password");
        if (!allUser) return res.status(404).json({ status: 'error', data: 'allUser not found' })

        return res.status(200).json({
            status: "success",
            allUser: allUser
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })

    }
}


//follow user
export const followUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params; // id of user to follow

    if (userId === id) {
      return res.status(400).json({ status: "error", message: "You can't follow yourself" });
    }

    const userToFollow = await Users.findById(id);
    const currentUser = await Users.findById(userId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // UNFOLLOW
      currentUser.following.pull(id);
      userToFollow.followers.pull(userId);
    } else {
      // FOLLOW
      currentUser.following.push(id);
      userToFollow.followers.push(userId);
    }

    await currentUser.save();
    await userToFollow.save();

    return res.status(200).json({
      status: "success",
      following: !isFollowing,
      followersCount: userToFollow.followers.length,
      followingCount: currentUser.following.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


export const getFollowCounts = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findById(id)
      .select("followers following");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      followers: user.followers.length,
      following: user.following.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
