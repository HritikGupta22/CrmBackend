import express from 'express';
import { checkAudienceController } from '../controllers/checkAudienceController.js';

const router = express.Router();

router.post('/check_audience', checkAudienceController);

export default router;
