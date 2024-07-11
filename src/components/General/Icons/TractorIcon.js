import React from "react";

const TractorIcon = (props) => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      viewBox="0 0 24 24"
      height="2.2em"
      width="2.2em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M11 15 A4 4 0 0 1 7 19 A4 4 0 0 1 3 15 A4 4 0 0 1 11 15 z" />
      <path d="M7 15v.01" />
      <path d="M21 17 A2 2 0 0 1 19 19 A2 2 0 0 1 17 17 A2 2 0 0 1 21 17 z" />
      <path d="M10.5 17H17M20 15.2V11a1 1 0 00-1-1h-6l-2-5H5v6.5" />
      <path d="M18 5h-1a1 1 0 00-1 1v4" />
    </svg>
  );
};

export default TractorIcon;
