function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let ageMonths = today.getMonth() - dob.getMonth();
  let ageYears = today.getFullYear() - dob.getFullYear();

  if (ageMonths < 0) {
    ageMonths += 12;
    ageYears--;
  }

  if (ageYears === 0) {
    return `${ageMonths} mos`;
  } else {
    return `${ageYears} yrs ${ageMonths} mos`;
  }
}

export default calculateAge;
