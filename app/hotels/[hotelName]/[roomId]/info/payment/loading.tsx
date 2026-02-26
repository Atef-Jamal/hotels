export default function loading() {
  return (
    <div className="mx-2 flex flex-col gap-4 max-md:my-4 md:flex-row">
      <div className="md:order-2 md:w-[30%]">
        <div className="h-52 rounded-lg bg-white p-4"></div>
      </div>
      <form className="min-h-96 flex-1 rounded-lg bg-white p-2 md:p-4"></form>
    </div>
  );
}
