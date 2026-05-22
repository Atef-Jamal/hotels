"use client";
import { IErrorPageProps } from "@/types";

export default function ErrorPage(props: IErrorPageProps) {
  return <div>{props.error.message}</div>;
}
