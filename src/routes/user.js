import express from "express";
import UserController from "../controllers/user.js";


const userRoutes = express.Router();
userRoutes.get('/find', UserController.findUser);
userRoutes.post('/create', UserController.createUser);
userRoutes.delete('/delete:id', UserController.deleteUser);


export default userRoutes;