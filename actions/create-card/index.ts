"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CreateCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId, listId } = data;
  let card;

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });
    
    // Find the list that we want to add the card
    if (!list) {
      return {error: "List not found"};
    }

    // Find the last card
    const lastCard = await db.card.findFirst(
      {
        where: {
          listId
        },
        orderBy: {
          order: "desc",
        },
        select: {
          order: true,
        }
      }
    );

    // Order of the new card
    const newOrder = lastCard ? lastCard.order + 1 : 0;

    card = await db.card.create({
      data: {
        listId,
        title,
        order: newOrder
      }
    })
  } catch (error) {
    return {
      error: "Failed to create!",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
