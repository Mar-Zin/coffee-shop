const pagination = (items, selectedPage, pageSize) => {
  const startIndex = (selectedPage - 1) * pageSize;
  return [...items].slice(startIndex, pageSize * selectedPage);
};

export default pagination;
