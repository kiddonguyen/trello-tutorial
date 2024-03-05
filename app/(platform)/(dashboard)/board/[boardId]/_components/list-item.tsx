"use client";

import { ListWithCards } from "@/types";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { ListHeader } from "./list-header";
import { cn } from "@/lib/utils";
interface ListItemProps {
  data: ListWithCards;
  index: number;
}
export const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setEditing] = useState(false);

  const disableEditing = () => {
    setEditing(false);
  };

  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    });
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} onAddCard={enableEditing} />
        <ol
          className={cn(
            "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
            data.cards.length > 0 ? "mt-2" : "mt-0"
          )}
        >
          <li>
            {data.cards.map((card) => (
              <li key={card.id}>{card.title}</li>
            ))}
          </li>
        </ol>
        <CardForm
          listId={data.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
};
