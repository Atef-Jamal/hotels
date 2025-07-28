export default function loading() {
  return (
    <div className="mx-2 flex flex-col gap-4 max-md:my-2 lg:flex-row">
      <div className="flex-1 space-y-4">
        <div className="h-[360px] rounded-lg bg-white"></div>
        <div className="h-[180px] rounded-lg bg-white"></div>
        <div className="h-[130px] rounded-lg bg-white"></div>
        <div className="h-[180px] rounded-lg bg-white"></div>
      </div>
      <div className="w-full space-y-4 lg:w-[33%]">
        <div className="h-[135px] rounded-lg bg-white"></div>
        <div className="h-[135px] rounded-lg bg-white"></div>
        <div className="h-[300px] rounded-lg bg-white"></div>
      </div>
    </div>
  );
}
