const express = require('express');

const candidateController = require('../controllers/candidate');

const router = express.Router();

router.get('/api/candidates', candidateController.getCandidates);

router.post('/api/create-candidate', candidateController.createCandidate);

module.exports = router;
