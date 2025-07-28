import React from "react";

export default function loading() {
  return (
    <div className="flex flex-col gap-2 rounded-lg">
      <div className="mx-2 mb-4 hidden rounded-lg bg-white py-[30px] md:block"></div>
      <div className="h-[178px] bg-white md:hidden"></div>
      <div className="hidde mx-2 h-[100rem] rounded-lg bg-white"></div>
    </div>
  );
}
