import * as yup from "yup";

export const searchSchema = yup.object().shape({
  searchText: yup.string().trim(),
  status: yup.number(),
  type: yup.number(),
  sort: yup.number(),
  from_date: yup.string().nullable(),
  to_date: yup.string().nullable(),
});
