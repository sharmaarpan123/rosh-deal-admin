import z from "zod";

export const optionsSchema = (key) => {
  const requiredMessage = key + " is required";
  return z.object(
    {
      label: z
        .string({ required_error: requiredMessage })
        .min(1, { message: requiredMessage }),
      value: z
        .string({ required_error: requiredMessage })
        .min(1, { message: requiredMessage }),
    },
    {
      invalid_type_error: requiredMessage,
      required_error: requiredMessage,
    }
  );
};
