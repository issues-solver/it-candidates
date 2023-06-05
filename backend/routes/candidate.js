const express = require('express');

const { verifyToken } = require('../middlewares/auth');

const candidateController = require('../controllers/candidate');

const { CandidateValidators } = require('../validation/candidate');

const router = express.Router();

router.get('/api/candidates', verifyToken, candidateController.getCandidates);

router.get('/api/candidate', verifyToken, candidateController.getCandidate);

router.post('/api/create-candidate', verifyToken, CandidateValidators, candidateController.createCandidate);

router.put('/api/edit-candidate/:id', verifyToken, CandidateValidators, candidateController.editCandidate);

router.delete('/api/delete-candidate/:id', verifyToken, candidateController.deleteCandidate);

module.exports = router;
