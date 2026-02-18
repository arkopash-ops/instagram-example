import { Types } from "mongoose";

export interface Profile {
    userId: Types.ObjectId;
    fullname: string;
    bio?: string;
    profileImage?: string;
}
