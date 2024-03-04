import { z } from "zod";

export const CreateList = z.object({
  title: z
    .string({
      required_error: "Title is required!",
      invalid_type_error: "Title must be a string!",
    })
    .min(3, {
      message: "Minium length of 3 characters is required!",
    }),
  boardId: z.string(),
});
