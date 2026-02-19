import { Types } from "mongoose";
import ProfileModel, { ProfileDocument } from "../models/profile.model";
import UserModel from "../models/user.model";
import { Profile } from "../types/profile.types";
import PostModel from "../models/post.model";
import CommentModel from "../models/comments.model";

interface IProfile extends Profile { }

export const createProfile = async (data: IProfile): Promise<ProfileDocument> => {
    const userExists = await UserModel.findById(data.userId);
    if (!userExists) {
        throw {
            statusCode: 404,
            message: "User not found.",
        };
    }

    const profileExists = await ProfileModel.findOne({ userId: data.userId });
    if (profileExists) {
        throw {
            statusCode: 400,
            message: "Profile already exists for this user.",
        };
    }

    const newProfile = await ProfileModel.create({
        userId: data.userId,
        fullname: data.fullname,
        bio: data.bio,
        profileImage: data.profileImage
    });

    return newProfile;
}


export const fetchAllProfile = async (): Promise<ProfileDocument[]> => {
    const profiles = await ProfileModel.find();

    if (profiles.length === 0) {
        throw {
            statusCode: 400,
            message: "List is empty. No Profile found.",
        }
    }

    return profiles;
}


export const updateProfile = async (
    userId: string,
    data: Partial<IProfile>
): Promise<ProfileDocument> => {
    const userExists = await UserModel.findById(userId);

    if (!userExists) {
        throw {
            statusCode: 404,
            message: "User not found.",
        };
    }

    const updatedProfile = await ProfileModel.findOneAndUpdate(
        { userId },
        { $set: data },
        { returnDocument: "after" }
    );

    if (!updatedProfile) {
        throw {
            statusCode: 404,
            message: "Profile not found for this user.",
        };
    }

    return updatedProfile;
}


export const deleteProfile = async (
    userId: string
): Promise<ProfileDocument> => {
    const userObjectId = new Types.ObjectId(userId);

    const userExists = await UserModel.findById(userObjectId);
    if (!userExists) {
        throw {
            statusCode: 404,
            message: "User not found.",
        };
    }

    const profileExists = await ProfileModel.findOne({ userId: userObjectId });
    if (!profileExists) {
        throw {
            statusCode: 404,
            message: "Profile not found for this user.",
        };
    }

    // 1. Find all posts of this user
    const userPosts = await PostModel.find({ userId: userObjectId });
    const postIds = userPosts.map((post) => post._id);

    // 2. Delete comments related to those posts
    if (postIds.length > 0) {
        await CommentModel.deleteMany({ postId: { $in: postIds } });
    }

    // 3. Delete posts related to this profile/user
    await PostModel.deleteMany({ userId: userObjectId });

    // 4. Delete profile related to user
    const deletedProfile = await ProfileModel.findOneAndDelete({
        userId: userObjectId,
    });

    if (!deletedProfile) {
        throw {
            statusCode: 500,
            message: "Failed to delete the Profile.",
        };
    }

    // 5. Finally delete user
    await UserModel.findByIdAndDelete(userObjectId);

    return deletedProfile;
};
