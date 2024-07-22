export const sixtyArray = Array.from({ length: 60 }, (_, index) => index);
export const hoursArray = Array.from({ length: 24 }, (_, index) => index);

export const iconLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-arrow-badge-left"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    strokeWidth="1.25"
    stroke="#ffffff"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M11 17h6l-4 -5l4 -5h-6l-4 5z" />
  </svg>
);

export const iconRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-arrow-badge-right"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    strokeWidth="1.25"
    stroke="#ffffff"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M13 7h-6l4 5l-4 5h6l4 -5z" />
  </svg>
);
