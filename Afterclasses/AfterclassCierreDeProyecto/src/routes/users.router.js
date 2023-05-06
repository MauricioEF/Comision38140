import { Router } from "express";
import usersController from "../controllers/users.controller.js";


const router = Router();

router.get('/',usersController.getUsers);
router.get('/:uid',usersController.getUserById);
router.post('/:uid',usersController.addFriend);

export default router;