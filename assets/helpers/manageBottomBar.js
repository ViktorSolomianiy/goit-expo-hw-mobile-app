const BLACKLIST_ARRAY = ["Comments", "Map"];

export const manageBottomBar = (pageName) =>
  BLACKLIST_ARRAY.find((item) => pageName === item);
