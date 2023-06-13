const Candidate = require('../models/candidate');
const Skill = require('../models/skill');

const getCandidates = async (req, res) => {
    const { page = 1, limit = 10, ...filterParams } = req.query;
    const skip = (page - 1) * limit;
    const filters = { userId: req.userId };
    if (filterParams.fullName) {
        filters.fullName = { $regex: new RegExp(filterParams.fullName, 'i') };
    }
    if (filterParams.recruiterContact) {
        filters.recruiterContact = filterParams.recruiterContact;
    }
    if (filterParams.grade) {
        filters.grade = filterParams.grade;
    }
    if (filterParams.experience) {
        filters.experience = filterParams.experience;
    }
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

const getCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.query.id);
        if (!candidate) {
            return res.status(400).json({ message: 'There is no such candidate' });
        }
        res.status(200).json(candidate);
    }   catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

const saveNewSkills = async (skills) => {
    const requestedSkills = skills.map((skill) => Skill.findOne({ value: skill }));
    const checkedSkills = await Promise.allSettled(requestedSkills);
    const skillsForSave = checkedSkills.reduce((acc, curr, index) => {
        if (curr.status === 'fulfilled' && !curr.value) {
            acc.push({ value: skills[index] });
        }
        return acc;
    }, []);
    return skillsForSave.length
        ? Skill.insertMany(skillsForSave)
        : Promise.resolve();
};

const createCandidate = async (req, res) => {
    try {
        const candidate = new Candidate({ ...req.body, userId: req.userId, });
        await candidate.save();
        const { skills } = req.body;
        await saveNewSkills(skills);
        res.status(201).json('Successfully created')
    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const editCandidate = async (req, res) => {
    const candidateId = req.params.id;
    const updatedCandidate = req.body;
    const { skills } = req.body;

    try {
        const result = await Candidate.findByIdAndUpdate(candidateId, updatedCandidate);
        await saveNewSkills(skills);
        if (result) {
            res.status(201).json({ message: 'Candidate updated successfully' });
        }   else {
            res.status(404).json({ message: 'Candidate not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteCandidate = async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Candidate deleted successfully!' });
    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCandidates = getCandidates;
exports.getCandidate = getCandidate;
exports.createCandidate = createCandidate;
exports.editCandidate = editCandidate;
exports.deleteCandidate = deleteCandidate;
