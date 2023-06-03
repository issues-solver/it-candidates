const Candidate = require('../models/candidate');

const getCandidates = async (req, res) => {
    const { page = 1, limit = 10, ...filterParams } = req.query;
    const skip = (page - 1) * limit;
    const filters = { userId: req.userId };
    if (filterParams.skills) {
        const skills = filterParams.skills.split(',').map(skill => skill.trim().toLowerCase());
        const regexSkills = skills.map(skill => new RegExp(`^${skill}$`, 'i'));
        filters.skills = { $all: regexSkills };
    }
    try {
        const totalItems = await Candidate.countDocuments(filters);
        const data = await Candidate.find(filters)
            .skip(skip)
            .limit(limit)
            .exec();
        res.status(200).json({
            data,
            page,
            totalItems
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const createCandidate = (req, res) => {
  const candidate = new Candidate({ ...req.body, userId: req.userId, });
  return candidate.save()
    .then(() => {
      return res.status(201).json('Successfully created');
    })
    .catch((err) => console.log(err));
};

exports.getCandidates = getCandidates;
exports.createCandidate = createCandidate;
