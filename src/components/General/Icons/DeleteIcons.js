import * as React from "react";

function DeleteIcon(props) {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 2)"
      >
        <path d="M16.5 8.5 A8 8 0 0 1 8.5 16.5 A8 8 0 0 1 0.5 8.5 A8 8 0 0 1 16.5 8.5 z" />
        <path d="M5.5 5.5l6 6M11.5 5.5l-6 6" />
      </g>
    </svg>
  );
}

export default DeleteIcon;
