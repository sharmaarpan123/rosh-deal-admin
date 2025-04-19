import { z } from "zod";

export const getSellerSchema = (editMode) =>
  z.object({
    name: z.string().min(1, { message: "Name is required" }),
   
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
    password: z.string().optional(),
    phoneNumber: z
      .string()
      .min(12, { message: "Minimum 10 digit mobile number is required" })
      .max(12, { message: "Maximum 10 digit mobile number is required" }),
    isActive: z.boolean({
      message: "This field is required",
      required_error: "This field is required",
      invalid_type_error: "This field is required!",
    }),
  });
