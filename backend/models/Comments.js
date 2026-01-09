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

const Comments = mongoose.model('Comments', commentSchema);
export default Comments;