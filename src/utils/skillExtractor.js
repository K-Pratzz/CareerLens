export const extractSkills = (text) => {
  const skills = ["react", "javascript", "python", "node", "aws", "docker"];

  return skills.filter((skill) =>
    text.toLowerCase().includes(skill)
  );
};