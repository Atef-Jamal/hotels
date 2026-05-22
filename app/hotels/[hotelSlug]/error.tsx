"use client";

import { IErrorPageProps } from "@/types";

export default function ErrorPage(props: IErrorPageProps) {
  return (
    <div className="mx-4 space-x-4 rounded-lg bg-white p-4 text-center text-sm text-red-700">
      {props.error.message}
    </div>
  );
}
