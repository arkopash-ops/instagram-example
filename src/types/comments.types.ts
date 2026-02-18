import { Types } from "mongoose";

export interface Comment {
    postId: Types.ObjectId;
    userId: Types.ObjectId;
    text: string;
}
