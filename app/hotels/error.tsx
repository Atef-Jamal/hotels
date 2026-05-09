"use client";
export default function error(props: any) {
  return (
    <div className="mx-2 rounded-lg bg-white p-4 max-md:my-2">
      an error occurred at Hotels Layout {props.error.message}
    </div>
  );
}
