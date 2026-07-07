const truncateText = (text, length = 120) => {
    if (text.length <= length) return text;
  
    return text.substring(0, length) + "...";
  };
  
  export default truncateText;