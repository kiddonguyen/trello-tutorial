"use server";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageUsername, imageLinkHTML] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUsername ||
    !imageLinkHTML
  ) {
    return {
      error: "Missing fields. Failed to create board!",
    };
  }
  let board;
  try {
    board = await db.board.create({
      data: {
        orgId,
        title,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUsername,
        imageLinkHTML,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create!",
    };
  }

  createAuditLog({
    entityId: board.id,
    entityTitle: board.title,
    entityType: ENTITY_TYPE.BOARD,
    action: ACTION.CREATE,
  });

  revalidatePath(`/board/${board.id}`);
  return {
    data: board,
  };
};

export const createBoard = createSafeAction(CreateBoard, handler);
