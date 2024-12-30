import { z } from "zod";
import { ADMIN_ROLE_TYPE_ENUM } from "../../../../utilities/const";

export const getAdminSchema = (editMode) =>
  z
    .object({
      name: z.string().min(1, { message: "Name is required" }),
      userName: z
        .string()
        .min(5, { message: "Username must be at least 5 characters long." })
        .max(10, { message: "Username must not exceed 10 characters." })
        .regex(/^[a-zA-Z0-9]+$/, {
          message: "Username can only contain alphanumeric characters.",
        }),
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
      passwordToggle: z.boolean(), // this for the edit mode
      // isActive : z.boolean({required_error : ""
      roles: z
        .array(
          z.object(
            {
              label: z.string(),
              value: z.nativeEnum(Object.values(ADMIN_ROLE_TYPE_ENUM), {
                message: "In Valid roles Type",
              }),
            },
            {
              invalid_type_error: "in Valid Roles Type",
              required_error: "Please select the role",
            }
          )
        )
        .min(1, { message: "Please select the role" }),
    })
    .refine(
      (data) => {
        if (!editMode) {
          if (data.password === "") {
            return false;
          }
        }
        if (data.passwordToggle && data.password === "") {
          return false;
        }
        return true;
      },
      { message: "Password is required", path: ["password"] }
    );
