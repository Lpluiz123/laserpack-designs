export default function TrustBar() {
  return (
    <section className="bg-white py-8 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">
          Compatible with your favorite machines
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          <span className="font-bold text-xl text-slate-800">Glowforge</span>
          <span className="font-bold text-xl text-slate-800">xTool</span>
          <span className="font-bold text-xl text-slate-800">LightBurn</span>
          <span className="font-bold text-xl text-slate-800">Cricut</span>
        </div>
      </div>
    </section>
  );
}