import mongoose, { Document, Schema } from "mongoose";
import { Profile } from "../types/profile.types";

export interface ProfileDocument extends Profile, Document { }

const profileSchema = new Schema<ProfileDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    bio: {
        type: String,
        default: "",
        trim: true,
    },
    profileImage: {
        type: String,
        default: "/public/images/default-profile.jpg",
    },
}, {
    timestamps: true,
})

const ProfileModel = mongoose.model<ProfileDocument>("Profile", profileSchema);

export default ProfileModel;
