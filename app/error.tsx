"use client";
export default function error(props: any) {
  return (
    <div className="m-4 w-[95%] max-w-300 self-center rounded-lg bg-white p-4">
      an error occured at Home Page {props.error.message}
    </div>
  );
}
