import { Router } from "express";
import { executePolicies } from "../middlewares/auth.js";
import viewsController from "../controllers/views.controller.js";

const router = Router();

router.get('/',executePolicies(["USER"]),viewsController.home);
router.get('/register',viewsController.register)
router.get('/login',viewsController.login)
router.get('/profile',executePolicies(["AUTHENTICATED"]),viewsController.profile)
router.get('/videogamecreator',viewsController.createVideogame);
router.get('/cart',executePolicies(["USER"]),viewsController.cart);
export default router;