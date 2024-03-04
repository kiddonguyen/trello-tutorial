import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";

interface BoardNavbarProps {
  data: Board;
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="fixed w-full h-14 z-[40] flex top-14 items-center justify-between gap-x-4 px-6 text-white bg-black/50">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={ data.id } />
      </div>
    </div>
  );
};
