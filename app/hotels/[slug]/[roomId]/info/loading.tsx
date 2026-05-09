export default function Loading() {
  return (
    <div className="mx-2 flex flex-col gap-4 max-md:my-2 lg:flex-row">
      <div className="flex-1 space-y-4">
        <div className="h-90 rounded-lg bg-white"></div>
        <div className="h-45 rounded-lg bg-white"></div>
        <div className="h-32.5 rounded-lg bg-white"></div>
        <div className="h-45 rounded-lg bg-white"></div>
      </div>
      <div className="w-full space-y-4 lg:w-[33%]">
        <div className="h-33.75 rounded-lg bg-white"></div>
        <div className="h-33.75 rounded-lg bg-white"></div>
        <div className="h-75 rounded-lg bg-white"></div>
      </div>
    </div>
  );
}
