import { Types } from "mongoose";

export interface Post {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    imageURL: string;
    caption?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
