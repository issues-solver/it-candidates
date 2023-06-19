import { Router } from 'express';

import { verifyToken } from '../middlewares/auth.js';
import {
    getCandidates,
    getCandidate,
    createCandidate,
    editCandidate,
    deleteCandidate
} from '../controllers/candidate.js';

import { CandidateValidators } from '../validation/candidate.js';

const router = Router();

router.get('/api/candidates', verifyToken, getCandidates);

router.get('/api/candidate', verifyToken, getCandidate);

router.post('/api/create-candidate', verifyToken, CandidateValidators, createCandidate);

router.put('/api/edit-candidate/:id', verifyToken, CandidateValidators, editCandidate);

router.delete('/api/delete-candidate/:id', verifyToken, deleteCandidate);

export default router;
