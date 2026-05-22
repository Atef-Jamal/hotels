"use client";
import { IErrorPageProps } from "@/types";

export default function ErrorPage(props: IErrorPageProps) {
  return <p>{props.error.message}</p>;
}
