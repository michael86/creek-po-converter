import * as yup from "yup";
import { loginSchema } from "./login";

export const registerSchema = loginSchema.shape({
  name: yup.string().required("Name is required"),
});
