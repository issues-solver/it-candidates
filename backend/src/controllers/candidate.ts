import Candidate from '../mongoose-models/candidate.js';
import { saveNewSkills } from './skill.js';
import { OriginalRequest, OriginalResponse, RequestWithUserId } from '../models/common.js';

export const getCandidates = async (req: OriginalRequest, res: OriginalResponse) => {
    const { page = 1, limit = 10, ...filterParams } = req.query as any;
    const skip = (page - 1) * limit;
    const filters: Record<string, unknown> = { userId: (req as RequestWithUserId).userId };
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
        const skills = filterParams.skills.split(',').map((skill: string) => skill.trim().toLowerCase());
        const regexSkills = skills.map((skill: string) => new RegExp(`^${skill}$`, 'i'));
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

export const getCandidate = async (req: OriginalRequest, res: OriginalResponse) => {
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
};

export const createCandidate = async (req: OriginalRequest, res: OriginalResponse) => {
    try {
        const candidate = new Candidate({ ...req.body, userId: (req as RequestWithUserId).userId, });
        await candidate.save();
        const { skills } = req.body;
        await saveNewSkills(skills);
        res.status(201).json('Successfully created')
    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const editCandidate = async (req: OriginalRequest, res: OriginalResponse) => {
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

export const deleteCandidate = async (req: OriginalRequest, res: OriginalResponse) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Candidate deleted successfully!' });
    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
