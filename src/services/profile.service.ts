import { Types } from "mongoose";
import ProfileModel, { ProfileDocument } from "../models/profile.model";
import UserModel from "../models/user.model";
import { Profile } from "../types/profile.types";

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
