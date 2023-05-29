const express = require('express');
const utilController = require("../controllers/util");

const router = express.Router();

router.get('/api/popular-skills', utilController.getPopularSkills);

module.exports = router;
