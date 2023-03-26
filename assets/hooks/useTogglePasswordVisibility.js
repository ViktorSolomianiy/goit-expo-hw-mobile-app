import { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightShow, setRightIcon] = useState("Show");

  const handlePasswordVisibility = () => {
    if (rightShow === "Show") {
      setRightIcon("Hidden");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightShow === "Hidden") {
      setRightIcon("Show");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightShow,
    handlePasswordVisibility,
  };
};
