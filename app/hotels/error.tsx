"use client";

import { IErrorPageProps } from "@/types";

export default function ErrorPage(props: IErrorPageProps) {
  return <div className="mx-2 rounded-lg bg-white p-4 max-md:my-2">{props.error.message}</div>;
}
