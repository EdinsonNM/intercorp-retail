export function calculateAge(birthday) { // birthday is a date
  var today = new Date();
  var age = today.getFullYear() - birthday.getFullYear();
  var m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate()))
  {
      age--;
  }
  return age;
}
