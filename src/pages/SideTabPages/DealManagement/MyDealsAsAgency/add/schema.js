import { z } from "zod";

const objectIdSchema = (fieldName) =>
  z.object(
    {
      label: z.string({ required_error: fieldName + " is Required" }),
      value: z.string({ required_error: fieldName + " is Required" }),
    },
    {
      invalid_type_error: fieldName + " is required",
      required_error: fieldName + " is Required",
    }
  );

export const addEditDealSchema = z
  .object({
    productName: z
      .string({ required_error: "This is Required" })
      .min(1, { message: "Name is required" }),
    brand: objectIdSchema("brand"),
    platForm: objectIdSchema("Plat form"),
    dealCategory: objectIdSchema("Deal Category"),
    productCategories: z
      .array(z.string())
      .refine((data) => !data.some((item) => item.trim() === ""), {
        message: "Product categories must contain at least one letter",
      })
      .optional(),
    postUrl: z.string().url({ invalid_type_error: "inValid post url" }),
    actualPrice: z
      .string({ required_error: "Actual Price is required" })
      .min(1, { message: "Actual Price is required" })
      .refine((data) => !isNaN(data), {
        message: "Actual Price must be numeric",
        paths: ["actualPrice"],
      }),
    lessAmount: z
      .string()
      .refine(
        (data) => {
          if (!data) return true;
          return !isNaN(data);
        },
        {
          message: "Less Amount must be numeric",
          paths: ["lessAmount"],
        }
      )
      .optional(),
    lessAmountToSubAdmin: z.string().optional(),
    adminCommission: z
      .string({ required_error: "Admin commission required" })
      .min(1, { message: "admin commission is required" })
      .refine((data) => !isNaN(data), {
        message: "Admin  commission should be numeric",
      }),
    slotAlloted: z
      .string({
        invalid_type_error: "invalid slotAlloted",
        required_error: "slot Alloted is required",
      })
      .min(1, { message: "Slot Alloted is required" })
      .refine((data) => !isNaN(data), {
        message: "slot Alloted should be numeric",
      }),
    finalCashBackForUser: z
      .string({
        invalid_type_error: "invalid finalCashBackForUser",
        required_error: "final Cash Back ForUser is required",
      })
      .min(1, { message: "final Cash Back ForUser is required" }),
    commissionValue: z.string().refine(
      (data) => {
        if (data && isNaN(data)) {
          return false;
        }
        return true;
      },
      { message: "commission should be numeric", path: ["commissionValue"] }
    ),
    commissionValueToSubAdmin: z.string().optional(),
    refundDays: z
      .string({
        invalid_type_error: "invalid Refund Days",
        required_error: "Refund Days is required",
      })
      .min(1, { message: "Refund Days is required" })
      .refine((data) => !isNaN(data), {
        message: "Refund Days should be Numeric",
      }),
    termsAndCondition: z
      .string({
        required_error: "Terms and condition is required",
      })
      .min(1, { message: "This  is required" }),
    uniqueIdentifier: z
      .string({
        required_error: "unique Identifier is required",
      })
      .min(1, { message: "unique Identifier  is required" }),
    imageUrl: z.string().optional(),
    exchangeDealProducts: z.array(z.string()).optional(),
    isExchangeDeal: z.boolean().optional(),
    isCommissionDeal: z.boolean(),
    showToSubAdmins: z.boolean(),
    showToUsers: z.boolean(),
  })
  .refine(
    (data) => {
      if (
        data?.isExchangeDeal &&
        (!data.exchangeDealProducts || !data.exchangeDealProducts[0])
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "If your deal is exchange deal , then please provide the exchange deals products fields",
      path: ["exchangeDealProducts"],
    }
  )
  .refine(
    (data) => {
      if (!data?.lessAmount && !data?.commissionValue) {
        return false;
      }
      return true;
    },
    {
      message: "Please fill either less Amount or commission",
      path: ["lessAmount"],
    }
  )
  .refine(
    (data) => {
      if (
        data?.showToSubAdmins &&
        data?.lessAmount &&
        !data?.lessAmountToSubAdmin
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please fill less Amount for the Mediator",
      path: ["lessAmountToSubAdmin"],
    }
  )
  .refine(
    (data) => {
      if (
        data?.showToSubAdmins &&
        data?.commissionValue &&
        !data?.commissionValueToSubAdmin
      ) {
        return false;
      } 
      return true;
    },
    {
      message: "Please fill commission for the Mediator",
      path: ["commissionValueToSubAdmin"],
    }
  );
