import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);
router.get("/users/:userId", getUser);

export default router; 
