import { FaExclamationCircle } from "react-icons/fa";

export default function ErrorComponent({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="flex size-full w-full items-center justify-center gap-x-3 rounded-lg bg-white max-md:text-sm">
      <FaExclamationCircle size={25} />
      <p className="font-medium wrap-break-word text-red-600">{errorMessage}</p>
    </div>
  );
}
