import { Types } from "mongoose";

export interface Post {
    userId: Types.ObjectId;
    imageURL: string;
    caption?: string;
}
