import * as yup from "yup";

export const jobSchema = yup.object().shape({
  position: yup.string().trim().required(),
  company: yup.string().trim().required(),
  jobLocation: yup.string().trim().required(),
  status: yup.number().required(),
  jobType: yup.number().required(),
});
