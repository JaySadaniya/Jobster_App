import { FC } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";

type IJobDetail = {
  id?: number;
  position?: string;
  company?: string;
  jobLocation?: string;
  status?: string;
  jobType?: string;
  jobPostingDate?: string;
  setDeleteModalObj?: any;
};

const JobDetail: FC<IJobDetail> = ({
  id,
  position,
  company,
  jobLocation,
  status,
  jobType,
  jobPostingDate,
  setDeleteModalObj,
}) => {
  const statusColor =
    status === "pending"
      ? "bg-pending-100 text-pending-500"
      : status === "scheduled"
      ? "bg-brand-100 text-brand-500"
      : "bg-declined-100 text-declined-500";

  return (
    <div className="bg-white rounded shadow-lg shadow-secondary-300 capitalize">
      <div className="p-5 flex gap-8 border-b border-secondary-400">
        <div className="h-14 w-14 bg-brand-500 text-white text-3xl font-semibold rounded flex items-center justify-center capitalize">
          {company?.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="text-2xl">{position}</span>
          <span className="text-secondary-500">{company}</span>
        </div>
      </div>

      <div className="px-5 pt-5 grid grid-cols-2">
        <span className="flex gap-5 items-center h-fit mb-4 mb-4">
          <svg
            className="text-secondary-500"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path>
          </svg>

          <span>{jobLocation}</span>
        </span>

        <span className="flex gap-5 items-center h-fit mb-4">
          <svg
            className="text-secondary-500"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
          </svg>

          <span>{moment(jobPostingDate).format("MMM Do, YYYY")}</span>
        </span>

        <span className="flex gap-5 items-center h-fit mb-4 py-1">
          <svg
            className="text-secondary-500"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z"></path>
          </svg>

          <span>{jobType}</span>
        </span>

        <span className={`capitalize h-fit w-fit px-3 py-1 ${statusColor}`}>
          {status}
        </span>
      </div>

      <div className="px-5 pb-5 flex gap-3">
        <Link to={`/edit-job/${id}`}>
          <button className="px-3 py-1 bg-green-200 text-green-700 rounded">
            Edit
          </button>
        </Link>
        <button
          onClick={() => setDeleteModalObj({ id, name: position, open: true })}
          className="px-3 py-1 bg-red-200 text-red-700 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
