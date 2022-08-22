import * as yup from "yup";

export const jobSchema = yup.object().shape({
  position: yup.string().lowercase().trim().required(),
  company: yup.string().trim().required(),
  jobLocation: yup.string().lowercase().trim().required(),
  status: yup.number().required(),
  jobType: yup.number().required(),
});
