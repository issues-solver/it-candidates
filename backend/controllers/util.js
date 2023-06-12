const Skills = require('../models/skill');
const popularSkills = ['ASP.NET', 'C', 'C#', 'C++', 'CSS', 'CoffeeScript', 'Crystal', 'DM', 'Dart', 'Docker', 'Elixir', 'EmberScript', 'Git', 'Go', 'GraphQL', 'Groovy', 'HTML', 'HTTP', 'JSON', 'Java', 'JavaScript', 'Kotlin', 'Linux', 'Nginx', 'Objective-C', 'PHP', 'Pascal', 'Perl', 'PowerShell', 'Python', 'Ruby', 'Rust', 'SQL', 'Scala', 'Shell', 'Svelte', 'Swift', 'Terra', 'TypeScript', 'Vue', 'WebAssembly', 'XML', 'YAML'];

const getPopularSkills = (req, res) => {
  return res.status(200).json(popularSkills);
};

const getSkills = async (req, res) => {
  const skillsData = await Skills.find().exec();
  const skills = skillsData.map((skill) => skill.value);
  const sortedSkills = skills.sort((a, b) => a.localeCompare(b))
  return res.status(200).json(sortedSkills);
};

// const updatePopularSkills = (req, res) => {
//   const { skills } = req.body;
//   Skills.updateMany({}, { skills })
// };

exports.getPopularSkills = getPopularSkills;
exports.getSkills = getSkills;
