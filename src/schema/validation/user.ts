import * as yup from "yup";

export const userSchema = yup.object().shape({
  userName: yup.string().trim().required(),
  email: yup.string().email().trim().required(),
  password: yup.string().min(3).required(),
});
