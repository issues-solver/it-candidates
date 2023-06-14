import express from 'express';
import { getSkills } from '../controllers/skill.js';

const router = express.Router();

router.get('/api/skills', getSkills);

export default router;
