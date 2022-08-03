import express from "express";
import { findUser, createUser, deleteUser } from "../controllers/user.js";


const userRoutes = express.Router();
userRoutes.get('/find', findUser);
userRoutes.post('/create', createUser);
userRoutes.delete('/delete:id', deleteUser);


export default userRoutes;