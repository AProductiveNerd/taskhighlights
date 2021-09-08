export const EmptyCircleIcon = ({
  className: classes
}: {
  className: string;
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <circle
        r={9}
        cx={11}
        cy={13}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
};
