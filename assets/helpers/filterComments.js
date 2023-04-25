export const filterCommets = (data) => {
  const normalizedComments = Object.values(data).map((item) => ({ ...item }));

  return normalizedComments.sort((a, b) => b.currentDate - a.currentDate);
};
