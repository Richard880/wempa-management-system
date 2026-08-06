const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default formatDate;
