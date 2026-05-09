"use client";
export default function error(props: any) {
  return <div className="m-2 rounded-lg bg-white p-4">error occurred at Room Info {props.error.message}</div>;
}
