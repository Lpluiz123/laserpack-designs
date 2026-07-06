export default function BenefitsSecion() {
  return (
    <>
      {/* Seção de Benefícios - Substituindo a antiga grade */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
          Fix Your Desk Pain In Just 7 Minutes a Day
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-3 text-slate-800">
              7-Minute Routine
            </h3>
            <p className="text-slate-600">
              Quick, effective movements you can perform discreetly at your
              workstation to instantly relieve stiffness.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-3 text-slate-800">
              Ergonomic Setup
            </h3>
            <p className="text-slate-600">
              Master the science of your workspace to prevent chronic back pain
              from ever returning.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-3 text-slate-800">
              Posture Correction
            </h3>
            <p className="text-slate-600">
              Long-term alignment techniques to keep you pain-free even after a
              long day at the computer.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-3 text-slate-800">
              Evidence-Based
            </h3>
            <p className="text-slate-600">
              Simple, doctor-approved methods designed specifically for the
              modern desk worker's body.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
