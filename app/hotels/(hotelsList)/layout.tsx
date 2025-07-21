import FilterHotels from "@/components/FilterHotels";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-2 flex gap-x-2 lg:gap-x-4">
      <div
        style={{
          height: `calc(100vh - 70px)`,
        }}
        className="sticky top-[5.5rem] hidden w-[280px] overflow-y-auto overflow-x-hidden rounded-lg bg-white p-2 scrollbar-thin md:block"
      >
        <FilterHotels />
      </div>
      <div className="flex-1 pt-2 md:pt-0">{children}</div>
    </div>
  );
}
