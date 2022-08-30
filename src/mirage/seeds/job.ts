import moment from "moment";

import { IJob } from "../../types/models/IJob";

const jobs: IJob[] = [
  {
    id: 1,
    position: "position 1",
    company: "company 1",
    jobLocation: "location 1",
    status: "pending",
    jobType: "full-time",
    jobPostingDate: moment.utc("2022-06-22").format(),
  },
  {
    id: 2,
    position: "position 2",
    company: "company 2",
    jobLocation: "location 2",
    status: "scheduled",
    jobType: "part-time",
    jobPostingDate: moment.utc("2022-04-12").format(),
  },
  {
    id: 3,
    position: "position 3",
    company: "company 3",
    jobLocation: "location 3",
    status: "declined",
    jobType: "remote",
    jobPostingDate: moment.utc("2022-03-02").format(),
  },
  {
    id: 4,
    position: "position 4",
    company: "company 4",
    jobLocation: "location 4",
    status: "pending",
    jobType: "internship",
    jobPostingDate: moment.utc("2022-06-15").format(),
  },
  {
    id: 5,
    position: "civil engineer",
    company: "bechtelar-bednar",
    jobLocation: "kiamba",
    status: "declined",
    jobType: "internship",
    jobPostingDate: moment.utc("2022-01-02").format(),
  },
  {
    id: 6,
    position: "accounting assistant III",
    company: "kunze and sons",
    jobLocation: "kafr mandā",
    status: "scheduled",
    jobType: "remote",
    jobPostingDate: moment.utc("2022-02-10").format(),
  },
  {
    id: 7,
    position: "environmental tech",
    company: "cremin LLC",
    jobLocation: "meixian",
    status: "declined",
    jobType: "part-time",
    jobPostingDate: moment.utc("2021-03-02").format(),
  },
  {
    id: 8,
    position: "actuary",
    company: "little LLC",
    jobLocation: "rebrikha",
    status: "scheduled",
    jobType: "internship",
    jobPostingDate: moment.utc("2022-06-15").format(),
  },
];

export default jobs;
