import UserModel, { UserDocument } from '../models/user.model';

interface IUser {
    username: string;
    email: string;
    password: string;
}


export const createUser = async (data: IUser): Promise<UserDocument> => {
    const userExists = await UserModel.findOne({ email: data.email });
    if (userExists) {
        throw {
            statusCode: 400,
            message: "Email already registered!",
        };
    }

    const newUser = await UserModel.create({
        username: data.username,
        email: data.email,
        password: data.password,
    });

    return newUser;
}


export const fetchAllUser = async (): Promise<UserDocument[]> => {
    const users = await UserModel.find();

    if (users.length === 0) {
        throw {
            statusCode: 400,
            message: "List is empty. No user found.",
        }
    }

    return users;
}
