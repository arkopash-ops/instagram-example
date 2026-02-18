import { Request, Response, NextFunction } from "express";
import * as profileService from "../services/profile.service";

export const _createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const profile = await profileService.createProfile({
            userId: req.body.userId,
            fullname: req.body.fullname,
            bio: req.body.bio,
            profileImage: req.body.profileImage,
        });

        return res.status(201).json({
            success: true,
            message: "Profile created successfully.",
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};


export const _fetchAllProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const profiles = await profileService.fetchAllProfile();

        return res.status(200).json({
            success: true,
            message: "Profiles retrived successfully.",
            length: profiles.length,
            data: profiles,
        });
    } catch (error) {
        next(error);
    }
};
