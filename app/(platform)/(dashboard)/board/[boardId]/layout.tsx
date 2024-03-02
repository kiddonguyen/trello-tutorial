import React from "react";

const BoardIdLayout = ({
  children,
  params: { boardId },
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  return (
    <div>
      <main className="relative h-full pt-28">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
