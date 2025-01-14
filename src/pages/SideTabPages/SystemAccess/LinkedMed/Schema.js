import { z } from "zod";
import { ADMIN_ROLE_TYPE_ENUM } from "../../../../utilities/const";

export const getSubAdminLinkingSchema = ({ actionByRole }) =>
  z
    .object({
      adminUserName: z.string().optional(),
      subAdminUserName: z
        .string({
          required_error: "Med User Name is required",
        })
        .min(1, {
          message: "Med User Name is required",
        }),
    })
    .refine(
      (data) => {
        if (
          actionByRole.includes(ADMIN_ROLE_TYPE_ENUM.SUPERADMIN) &&
          !data?.adminUserName
        ) {
          return false;
        }
        return true;
      },
      { message: "Agency User Name is required", path: ["adminUserName"] }
    );
