import Skill from '../mongoose-models/skill.js';
import { OriginalRequest, OriginalResponse } from '../models/common.js';

export const getSkills = async (req: OriginalRequest, res: OriginalResponse) => {
  const skillsData = await Skill.find().exec();
  const skills = skillsData.map((skill) => skill.value) as string[];
  const sortedSkills = skills.sort((a: string, b: string) => a.localeCompare(b))
  return res.status(200).json(sortedSkills);
};

export const saveNewSkills = async (skills: string[]) => {
  const requestedSkills = skills.map((skill: string) => Skill.findOne({ value: skill }));
  const checkedSkills = await Promise.allSettled(requestedSkills);
  const skillsForSave = checkedSkills.reduce<{ value: string }[]>((acc, curr, index) => {
    if (curr.status === 'fulfilled' && !curr.value) {
      acc.push({ value: skills[index] });
    }
    return acc;
  }, []);
  return skillsForSave.length
      ? Skill.insertMany(skillsForSave)
      : Promise.resolve();
};
