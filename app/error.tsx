"use client";

import { IErrorPageProps } from "@/types";

export default function ErrorPage(props: IErrorPageProps) {
  return (
    <div className="m-4 w-[95%] max-w-300 self-center rounded-lg bg-white p-4">{props.error.message}</div>
  );
}
