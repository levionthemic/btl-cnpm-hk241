module.exports.isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regex)) {
      return false;
  }

  const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));

  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

module.exports.isValidPhoneNumber = (phoneNumber) => {
  const regex = /^0[3|5|7|8|9]{1}[0-9]{8}$/;
  return regex.test(phoneNumber);
}

