import * as Yup from "yup";
import { object, string, number, date, InferType } from "yup";

export let userSchema = object({
  email: string().min(8).email(),
  password: string().email().required(),
});
