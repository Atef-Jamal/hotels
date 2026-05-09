export default function HotelsListLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-1 flex-col bg-[#623af3] md:pt-10">
      <div className="flex flex-1 flex-col items-center bg-purple-200 md:rounded-t-3xl">
        <div className="flex w-full max-w-300 flex-1 flex-col md:-translate-y-5">{children}</div>
      </div>
    </section>
  );
}
