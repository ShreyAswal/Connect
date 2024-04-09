import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getAllUsersToChat } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', protectRoute , getAllUsersToChat );

export default router;