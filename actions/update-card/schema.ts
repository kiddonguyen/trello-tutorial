import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z.string({
      required_error: "Description is required!",
      invalid_type_error: "Description is required!",
    })
  ),
  title: z
    .string({
      required_error: "Title is required!",
      invalid_type_error: "Title must be a string!",
    })
    .min(3, {
      message: "Minium length of 3 characters is required!",
    }),
  id: z.string(),
});
