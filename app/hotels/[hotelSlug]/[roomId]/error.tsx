"use client";

import { IErrorPageProps } from "@/types";

export default function ErrorPage(props: IErrorPageProps) {
  return <div className="m-2 rounded-lg bg-white p-4">{props.error.message}</div>;
}
