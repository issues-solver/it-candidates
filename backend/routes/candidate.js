const express = require('express');

const candidateController = require('../controllers/candidate');

const { CandidateValidators } = require('../validation/candidate');

const router = express.Router();

router.get('/api/candidates', candidateController.getCandidates);

router.post('/api/create-candidate', CandidateValidators, candidateController.createCandidate);

module.exports = router;
