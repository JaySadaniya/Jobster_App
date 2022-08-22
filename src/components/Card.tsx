import { FC } from "react";

const Card: FC<{ theme: string; totalJobs?: number }> = ({
  theme,
  totalJobs,
}) => {
  const borderColor =
    theme === "pending"
      ? "border-pending-400"
      : theme === "brand"
      ? "border-brand-400"
      : "border-declined-400";
  const textColor =
    theme === "pending"
      ? "text-pending-400"
      : theme === "brand"
      ? "text-brand-400"
      : "text-declined-400";
  const bgColor =
    theme === "pending"
      ? "bg-pending-100"
      : theme === "brand"
      ? "bg-brand-100"
      : "bg-declined-100";

  return (
    <div
      className={`${borderColor} grow p-8 flex flex-col gap-5 justify-between bg-white rounded border-b-4`}
    >
      <header className={` ${textColor} text-6xl flex justify-between mt-5`}>
        <span className="flex items-center font-medium">{totalJobs}</span>
        <span className={`${bgColor} p-5`}>
          {theme === "pending" && (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 384 512"
              height="0.55em"
              width="0.55em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M336 160H48c-26.51 0-48 21.49-48 48v224c0 26.51 21.49 48 48 48h16v16c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-16h128v16c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-16h16c26.51 0 48-21.49 48-48V208c0-26.51-21.49-48-48-48zm-16 216c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h240c4.42 0 8 3.58 8 8v16zm0-96c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h240c4.42 0 8 3.58 8 8v16zM144 48h96v80h48V48c0-26.51-21.49-48-48-48h-96c-26.51 0-48 21.49-48 48v80h48V48z"></path>
            </svg>
          )}
          {theme === "brand" && (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="0.55em"
              width="0.55em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M436 160H12c-6.627 0-12-5.373-12-12v-36c0-26.51 21.49-48 48-48h48V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h128V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h48c26.51 0 48 21.49 48 48v36c0 6.627-5.373 12-12 12zM12 192h424c6.627 0 12 5.373 12 12v260c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V204c0-6.627 5.373-12 12-12zm333.296 95.947l-28.169-28.398c-4.667-4.705-12.265-4.736-16.97-.068L194.12 364.665l-45.98-46.352c-4.667-4.705-12.266-4.736-16.971-.068l-28.397 28.17c-4.705 4.667-4.736 12.265-.068 16.97l82.601 83.269c4.667 4.705 12.265 4.736 16.97.068l142.953-141.805c4.705-4.667 4.736-12.265.068-16.97z"></path>
            </svg>
          )}
          {theme === "declined" && (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="0.55em"
              width="0.55em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"></path>
            </svg>
          )}
        </span>
      </header>
      <span className="text-lg">
        {theme === "pending" && "Pending Applications"}
        {theme === "brand" && "Interviews Scheduled"}
        {theme === "declined" && "Jobs Declined"}
      </span>
    </div>
  );
};

export default Card;
