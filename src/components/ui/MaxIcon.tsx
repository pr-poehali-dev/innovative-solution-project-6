interface MaxIconProps {
  size?: number;
  className?: string;
}

const MaxIcon = ({ size = 24, className = "" }: MaxIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.6 4C31.2 4 37.4 11 37.4 19.8c0 8.9-6.9 15.9-15.8 15.9-3 0-5.8-.8-8.2-2.2l-7.9 2.4c-1.5.4-2.9-1-2.4-2.5l2.6-8A15.7 15.7 0 0 1 5.8 19.8C5.8 11 12.1 4 21.6 4Zm0 9.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Z"
      fill="currentColor"
    />
  </svg>
);

export default MaxIcon;
