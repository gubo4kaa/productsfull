import type { FunctionComponent } from "react";


export const Spinner: FunctionComponent = () => {
  return (
    <>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#4F46E5"
      >
        <g fill="none" fillRule="evenodd">
          <circle
            cx="20"
            cy="20"
            r="18"
            strokeOpacity="0.25"
            strokeWidth="4"
          />
          <path
            d="M38 20c0-9.94-8.06-18-18-18"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
    </>
  );
};

export default Spinner;
