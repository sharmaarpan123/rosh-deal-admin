import z from "zod";

export const optionsSchema = (key) =>
  z.object(
    {
      label: z.string({ required_error: key + " is required" }),
      value: z.string({ required_error: key + " is required" }),
    },
    {
      invalid_type_error: key + " is required",
    }
  );
