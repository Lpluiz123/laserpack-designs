export function Cards() {
  return (
<section className="py-16 bg-slate-50">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-slate-950 mb-12">
      What our members are saying
    </h2>


    <div className="grid gap-11 md:grid-cols-3">
        {/* Depoimento 1 */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="text-yellow-400 mb-4 text-lg">★★★★★</div>
        <p className="text-slate-600 mb-6 italic">
          "I'm a software developer who sits 12+ hours daily. After just 2 weeks, my chronic lower back pain is completely gone. My energy levels are through the roof. This saved my career and my health!"
        </p>
        <p className="font-bold text-slate-950">— Jessica K.</p>
        <p className="text-sm text-slate-500">Software Developer, Seattle</p>
      </div>

      {/* Depoimento 2 */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="text-yellow-400 mb-4 text-lg">★★★★★</div>
        <p className="text-slate-600 mb-6 italic">
          "I was skeptical that 7 minutes could make a difference. In one week, my neck pain vanished and I stopped needing afternoon coffee. Six months later, I've never felt better."
        </p>
        <p className="font-bold text-slate-950">Amanda L.</p>
        <p className="text-sm text-slate-500">Financial Analyst, New York</p>
      </div>

      {/* Depoimento 3 */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="text-yellow-400 mb-4 text-lg">★★★★★</div>
        <p className="text-slate-600 mb-6 italic">
          "As a busy executive, I thought pain was just part of the job. The 7-minute routine fits perfectly into my schedule, and my team says I look more energetic in meetings. A true revolution!"
        </p>
        <p className="font-bold text-slate-950">Robert M.</p>
        <p className="text-sm text-slate-500">VP of Marketing, Chicago</p>
      </div>
    </div>
  </div>
</section>
  );
}
