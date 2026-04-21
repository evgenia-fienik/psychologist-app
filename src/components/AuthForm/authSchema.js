import * as yup from "yup";

export const getAuthSchema = (type) => {
  const baseSchema = {
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),

    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  };

  if (type === "register") {
    baseSchema.name = yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be at most 30 characters")
      .required("Name is required");
  }

  return yup.object().shape(baseSchema);
};
