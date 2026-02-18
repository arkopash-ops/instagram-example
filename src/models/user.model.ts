import mongoose, { Document, Schema } from "mongoose";
import { User } from "../types/user.types";

export interface UserDocument extends User, Document { }

const userSchema = new Schema<UserDocument>({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const userModel = mongoose.model<UserDocument>("User", userSchema);

export default userModel;
