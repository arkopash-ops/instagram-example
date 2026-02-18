import { Types } from "mongoose";

export interface Comment {
    _id?: Types.ObjectId;
    postId: Types.ObjectId;
    userId: Types.ObjectId;
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
}
