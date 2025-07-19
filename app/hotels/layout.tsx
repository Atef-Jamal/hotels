import HotelsLayoutHeader from "@/components/HotelsLayoutHeader";
function HotelsListLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#623af3] md:pt-10">
      <div className="relative bg-purple-200 md:rounded-t-3xl">
        <HotelsLayoutHeader />
        <div className="mx-auto max-w-[1200px] md:-translate-y-5">{children}</div>
      </div>
    </section>
  );
}

export default HotelsListLayout;
