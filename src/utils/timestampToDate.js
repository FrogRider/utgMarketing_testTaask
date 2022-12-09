const getTimeInteger = (integer) => {
  return String(integer).length === 1 ? `0${integer}` : integer;
};

export const getDateFromTimestamp = (timestamp, showTime = true) => {
  const date = new Date(timestamp * 1000);
  const months = [
    'січ.',
    'лют.',
    'бер.',
    'квіт.',
    'трав.',
    'черв.',
    'лип.',
    'серп.',
    'вер.',
    'жовт.',
    'лист.',
    'груд.',
  ];
  const dateString = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} `;
  const timeString = `
    ${getTimeInteger(date.getHours())}:${getTimeInteger(date.getMinutes())}:${getTimeInteger(date.getSeconds())}
  `;
  return showTime ? `${dateString}${timeString}` : `${dateString}`;
};