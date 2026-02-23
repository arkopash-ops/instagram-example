import UserModel from '../models/user.model';
import { generateToken } from '../config/jwt';
import bcrypt from "bcryptjs";

interface IUser {
    username: string;
    email: string;
    password: string;
}

interface UserWithoutPassword {
    _id: string;
    username: string;
    email: string;
}


export const register = async (data: IUser): Promise<{ user: UserWithoutPassword; token: string }> => {
    const userExists = await UserModel.findOne({ email: data.email });
    if (userExists) {
        throw {
            statusCode: 400,
            message: "Email already registered!",
        };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await UserModel.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
    });

    const token = generateToken(newUser._id.toString());

    const user: UserWithoutPassword = {
        _id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email,
    }

    return { user, token };
}


export const fetchAllRegisteredUser = async (): Promise<UserWithoutPassword[]> => {
    const users = await UserModel.find();

    if (users.length === 0) {
        throw {
            statusCode: 400,
            message: "List is empty. No user found.",
        }
    }

    const myUserWithoutPassword: UserWithoutPassword[] = users.map(u => ({
        _id: u._id.toString(),
        username: u.username,
        email: u.email,
    }));

    return myUserWithoutPassword;
}
