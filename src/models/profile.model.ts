import mongoose, { Document, Schema } from "mongoose";
import { Profile } from "../types/profile.types";

export interface ProfileDocument extends Profile, Document { }

const profileSchema = new Schema<ProfileDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    bio: {
        type: String,
        default: "I'm new User.",
        trim: true,
        set: (s: string) => s || "I'm new User."
    },
    profileImage: {
        type: String,
        default: "/public/images/default-profile.jpg",
        set: (s: string) => s || "/public/images/default-profile.jpg"
    },
}, {
    timestamps: true,
})

const ProfileModel = mongoose.model<ProfileDocument>("Profile", profileSchema);

export default ProfileModel;
