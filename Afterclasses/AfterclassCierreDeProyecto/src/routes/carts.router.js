import cartsController from "../controllers/carts.controller.js";
import { Router } from 'express';
import { executePolicies } from "../middlewares/auth.js";


const router = Router();

router.get('/videogame/:vid',executePolicies(["USER"]),cartsController.insertGameToCart)
router.post('/:cid',executePolicies(["USER"]),cartsController.finishPurchase)

export default router;