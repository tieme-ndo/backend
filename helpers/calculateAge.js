const calculateAge = (dateOfBirth) => {
  const yearOfBirth = new Date(`${dateOfBirth}`).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - yearOfBirth;
};

module.exports = calculateAge;
