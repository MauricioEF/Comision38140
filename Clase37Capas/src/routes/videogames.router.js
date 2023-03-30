import { Router } from "express";
import videogamesController from "../controllers/videogames.controller.js";
import uploader from '../services/upload.js';

const router = Router();


router.post('/',uploader.single('image'),videogamesController.createVideogame)

export default router;