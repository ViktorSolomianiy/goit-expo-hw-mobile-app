import { Circle, Defs, G, Path, Rect, Svg, ClipPath } from "react-native-svg";

export const SvgAddUserImage = () => {
  return (
    <Svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="12.5" cy="12.5" r="12" fill="#fff" stroke="#FF6C00" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6Z"
        fill="#FF6C00"
      />
    </Svg>
  );
};

export const SvgRemoveUserImage = () => {
  return (
    <Svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle
        cx="18.4999"
        cy="18.5"
        r="12"
        transform="rotate(-45 18.4999 18.5)"
        fill="white"
        stroke="#E8E8E8"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2574 13.5503L13.5503 14.2574L17.7929 18.5L13.5503 22.7426L14.2574 23.4497L18.5 19.2071L22.7426 23.4497L23.4498 22.7426L19.2071 18.5L23.4498 14.2574L22.7426 13.5503L18.5 17.7929L14.2574 13.5503Z"
        fill="#BDBDBD"
      />
    </Svg>
  );
};

export const SvgCreatePost = () => {
  return (
    <Svg
      width="70"
      height="40"
      viewBox="0 0 70 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_12_109)">
        <Rect width="70" height="40" rx="20" fill="#FF6C00" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.5 13.5H34.5V19.5H28.5V20.5H34.5V26.5H35.5V20.5H41.5V19.5H35.5V13.5Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_12_109">
          <Rect width="70" height="40" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const SvgCommentsPost = ({ fill }) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill ? "#FF6C00" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 11.5C2.99656 12.8199 3.30493 14.1219 3.9 15.3C5.33904 18.1793 8.28109 19.9988 11.5 20C12.8199 20.0034 14.1219 19.6951 15.3 19.1L21 21L19.1 15.3C19.6951 14.1219 20.0034 12.8199 20 11.5C19.9988 8.28109 18.1793 5.33904 15.3 3.9C14.1219 3.30493 12.8199 2.99656 11.5 3H11C6.68419 3.2381 3.2381 6.68419 3 11V11.5V11.5Z"
        stroke={fill ? "#FF6C00" : "#BDBDBD"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const SvgSendComments = () => {
  return (
    <Svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx="17" cy="17" r="17" fill="#FF6C00" />
      <Path
        d="M17 10L17.3536 9.64645C17.1583 9.45118 16.8417 9.45118 16.6464 9.64645L17 10ZM21.6464 15.3536C21.8417 15.5488 22.1583 15.5488 22.3536 15.3536C22.5488 15.1583 22.5488 14.8417 22.3536 14.6464L21.6464 15.3536ZM11.6464 14.6464C11.4512 14.8417 11.4512 15.1583 11.6464 15.3536C11.8417 15.5488 12.1583 15.5488 12.3536 15.3536L11.6464 14.6464ZM16.5 24C16.5 24.2761 16.7239 24.5 17 24.5C17.2761 24.5 17.5 24.2761 17.5 24H16.5ZM16.6464 10.3536L21.6464 15.3536L22.3536 14.6464L17.3536 9.64645L16.6464 10.3536ZM16.6464 9.64645L11.6464 14.6464L12.3536 15.3536L17.3536 10.3536L16.6464 9.64645ZM16.5 10V17H17.5V10H16.5ZM16.5 17V24H17.5V17H16.5Z"
        fill="white"
      />
    </Svg>
  );
};

export const SvgCamera = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_36_0)">
        <Path
          d="M11.9998 15.2C13.7671 15.2 15.1998 13.7673 15.1998 12C15.1998 10.2327 13.7671 8.79999 11.9998 8.79999C10.2325 8.79999 8.7998 10.2327 8.7998 12C8.7998 13.7673 10.2325 15.2 11.9998 15.2Z"
          fill="#BDBDBD"
        />
        <Path
          d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z"
          fill="#BDBDBD"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_36_0">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const SvgCameraImage = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_36_45)">
        <Path
          d="M11.9998 15.2C13.7671 15.2 15.1998 13.7673 15.1998 12C15.1998 10.2327 13.7671 8.79999 11.9998 8.79999C10.2325 8.79999 8.7998 10.2327 8.7998 12C8.7998 13.7673 10.2325 15.2 11.9998 15.2Z"
          fill="white"
        />
        <Path
          d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_36_45">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const SvgLogOut = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10"
        stroke="#BDBDBD"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 16L21 12L17 8"
        stroke="#BDBDBD"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 12H9"
        stroke="#BDBDBD"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const SvgArrowLeft = () => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M20 12H4"
        stroke="#212121"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 18L4 12L10 6"
        stroke="#212121"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
