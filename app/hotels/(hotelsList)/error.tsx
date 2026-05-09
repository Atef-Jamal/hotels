"use client";

export default function error(props: any) {
  return (
    <div className="m-2 rounded-lg bg-white p-4 break-all">
      an error occurred at Hotels List Page
      {props.error.message}
    </div>
  );
}
