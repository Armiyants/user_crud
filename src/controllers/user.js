import mongoose from "mongoose";
import validateEmail from "../utils/validator.js";

const UserModel = mongoose.model('User');



class UserController {
    constructor() {
    }

    static async findUser(req, res) {
        try {
            const reqBody = req?.body;
            if (Object.values(reqBody).length < 1) {
                return res.status(422).send('Please enter at least one parameter.');
            }

            if (reqBody.email) {
                if (!validateEmail(reqBody.email)) {
                    return res.status(422).send('Please enter valid email address')
                }
            }

            const user = await UserModel.find(reqBody);
            if (!user) {
                return res.status(200).json([]);
            }
            user.entitize();
            user.dateRequest = reqBody;

            return res.status(200).json(user);
        } catch (err) {
            console.error("Error while finding user: " + err);
            return res.status(500).send('Error while finding user.');
        }
    };

    static async createUser(req, res) {
        try {
            const reqBody = req?.body;

            if (Object.values(reqBody).length < 1) {
                return res.status(422).send('Please enter at least one parameter.');
            }

            if (reqBody.email) {
                if (!validateEmail(reqBody.email)) {
                    return res.status(422).send('Please enter valid email address')
                }
            }

            //check if user already exists
            const user = await UserModel.find(reqBody);

            if (user) {
                return res.status(409).send('User with mentioned credentials already exists');
            }

            const newUser = new UserModel({
                name: reqBody?.name || '',
                username: reqBody?.username || '',
                email: reqBody?.email || '',
                phone: reqBody?.phone || '',
                website: reqBody?.website || ''
            });

            await newUser.save();
            return res.status(200).send('User successfully created.');
        } catch (err) {
            console.error("Error while creating user: " + err);
            return res.status(500).send('Error while creating user.');
        }
    };

    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;

            if (!userId) {
                return res.status(422).send('User id missing.');
            }

            await UserModel.findByIdAndRemove(userId);
            return res.status(200).send('User successfully deleted.');
        } catch (err) {
            console.error("Error while deleting user: " + err);
            return res.status(500).send('Error while deleting user.');
        }
    };
}


export default UserController;