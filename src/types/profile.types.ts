import { Types } from "mongoose";

export interface Profile {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    fullname: string;
    bio?: string;
    profileImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
