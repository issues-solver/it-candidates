const express = require('express');
const utilController = require("../controllers/util");

const router = express.Router();

router.get('/api/popular-skills', utilController.getPopularSkills);
router.get('/api/skills', utilController.getSkills);

module.exports = router;
