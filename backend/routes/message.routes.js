import express from 'express';
import sendMessage from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// We are using protectRoute middleware to authenticate the user before sending the message
// We don't send any response in protectedRoute middleware, so with next() we move to the next function sendMessage
router.post('/send/:id', protectRoute, sendMessage);

export default router;