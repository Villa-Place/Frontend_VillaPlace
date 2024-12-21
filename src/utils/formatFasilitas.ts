const formatFasilitas = (text: string) => {
  return text.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export default formatFasilitas;
