"use client";

export default function error(props: any) {
  return (
    <div className="mx-4 space-x-4 rounded-lg bg-white p-4 text-center text-sm text-red-700">
      error occurred at Hotel Details Page {props.error.message}
    </div>
  );
}
