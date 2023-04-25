export const formatDate = (dateInMilliseconds) => {
  const currentDate = new Date(dateInMilliseconds);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormatted = currentDate.toLocaleDateString("en-US", options);
  const timeFormatted = currentDate.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  const finalFormatted = dateFormatted + " | " + timeFormatted;

  return finalFormatted;
};
