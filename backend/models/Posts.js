import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },

    //parent referencing
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    //parent referencing
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],

    //child referencing
    comments: [commentSchema],

    createdAt: {
        type: Date,
        default: Date.now,
    },


}, { timestamps: true })

const Posts = mongoose.model('Posts', postSchema);
export default Posts;