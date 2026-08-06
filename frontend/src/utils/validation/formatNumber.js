const formatNumber = (number) => {
  if (number === null || number === undefined) return "—";
  return new Intl.NumberFormat("en-KE").format(number);
};

export default formatNumber;
