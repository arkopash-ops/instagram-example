import mongoose, { Schema } from "mongoose";
import { Post } from "../types/post.types";

export interface PostDocument extends Post, Document { }

const postSchema = new Schema<PostDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
        trim: true,
    },
    caption: {
        type: String,
        default: "",
        trim: true,
    }
}, {
    timestamps: true,
});

const PostModel = mongoose.model<PostDocument>("Post", postSchema);

export default PostModel;
