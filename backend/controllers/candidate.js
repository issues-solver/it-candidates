const Candidate = require('../models/candidate');

const getCandidates = (req, res) => {
  return Candidate.find()
    .then((candidates) => {
      return res.status(200).json({ candidates });
    })
    .catch((err) => console.log(err));
};

const createCandidate = (req, res) => {
  const candidate = new Candidate({ ...req.body });
  return candidate.save()
    .then((data) => {
      console.log(data);
      return res.status(201).json('Successfully created');
    })
    .catch((err) => console.log(err));
};

exports.getCandidates = getCandidates;
exports.createCandidate = createCandidate;
