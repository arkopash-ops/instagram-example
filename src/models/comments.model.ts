import mongoose, { Document, Schema } from "mongoose";
import { Comment } from '../types/comments.types';

export interface CommentsDocument extends Comment, Document { }

const commentsSchema = new Schema<CommentsDocument>({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const CommentModel = mongoose.model<CommentsDocument>("Comment", commentsSchema);

export default CommentModel;