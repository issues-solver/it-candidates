const express = require('express');

const { verifyToken } = require('../middlewares/auth');

const candidateController = require('../controllers/candidate');

const { CandidateValidators } = require('../validation/candidate');

const router = express.Router();

router.get('/api/candidates', verifyToken, candidateController.getCandidates);

router.post('/api/create-candidate', verifyToken, CandidateValidators, candidateController.createCandidate);

module.exports = router;
