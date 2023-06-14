import Skill from '../models/skill.js';

export const getSkills = async (req, res) => {
  const skillsData = await Skill.find().exec();
  const skills = skillsData.map((skill) => skill.value);
  const sortedSkills = skills.sort((a, b) => a.localeCompare(b))
  return res.status(200).json(sortedSkills);
};

export const saveNewSkills = async (skills) => {
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
