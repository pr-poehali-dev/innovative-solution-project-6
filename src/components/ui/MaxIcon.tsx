interface MaxIconProps {
  size?: number;
  className?: string;
}

const MaxIcon = ({ size = 24, className = "" }: MaxIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M16 5.5c6.2 0 10.8 4.4 10.8 10.2 0 5.8-4.6 10.2-10.8 10.2-1.3 0-2.6-.2-3.7-.6l-4.7 1.6a.7.7 0 0 1-.9-.9l1.4-4.2a9.7 9.7 0 0 1-2.9-6.9C5.2 9.9 9.8 5.5 16 5.5Z"
      fill="currentColor"
    />
    <circle cx="17.4" cy="15.6" r="4.1" fill="#7C3AED" />
  </svg>
);

export default MaxIcon;
