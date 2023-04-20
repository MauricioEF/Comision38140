import cartsController from "../controllers/carts.controller.js";
import { Router } from 'express';
import { executePolicies } from "../middlewares/auth.js";


const router = Router();

router.get('/videogame/:vid',executePolicies(["USER"]),cartsController.insertGameToCart)

export default router;