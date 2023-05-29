const popularSkills = ['ASP.NET', 'C', 'C#', 'C++', 'CSS', 'CoffeeScript', 'Crystal', 'DM', 'Dart', 'Docker', 'Elixir', 'EmberScript', 'Git', 'Go', 'GraphQL', 'Groovy', 'HTML', 'HTTP', 'JSON', 'Java', 'JavaScript', 'Kotlin', 'Linux', 'Nginx', 'Objective-C', 'PHP', 'Pascal', 'Perl', 'PowerShell', 'Python', 'Ruby', 'Rust', 'SQL', 'Scala', 'Shell', 'Svelte', 'Swift', 'Terra', 'TypeScript', 'Vue', 'WebAssembly', 'XML', 'YAML'];

const getPopularSkills = (req, res) => {
  return res.status(200).json(popularSkills);
};

exports.getPopularSkills = getPopularSkills;
