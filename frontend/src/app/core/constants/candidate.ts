export enum Grade {
  Junior = 'Junior',
  Middle = 'Middle',
  Senior = 'Senior',
  Lead = 'Lead',
  Architect = 'Architect',
}

export const GRADES = [Grade.Junior, Grade.Middle, Grade.Senior, Grade.Lead, Grade.Architect];

export enum ExperienceYears {
  ToThree,
  ToFive,
  ToTen,
  More,
}

export const EXPERIENCE_YEARS_MAP = {
  [ExperienceYears.ToThree]: 'from 1 to 3 years',
  [ExperienceYears.ToFive]: 'from 3 to 5 years',
  [ExperienceYears.ToTen]: 'from 5 to 10 years',
  [ExperienceYears.More]: '10+ years',
};

export const EXPERIENCE_YEARS = [
  { value: ExperienceYears.ToThree, title: EXPERIENCE_YEARS_MAP[ExperienceYears.ToThree] },
  { value: ExperienceYears.ToFive, title: EXPERIENCE_YEARS_MAP[ExperienceYears.ToFive] },
  { value: ExperienceYears.ToTen, title: EXPERIENCE_YEARS_MAP[ExperienceYears.ToTen] },
  { value: ExperienceYears.More, title: EXPERIENCE_YEARS_MAP[ExperienceYears.More] },
];
