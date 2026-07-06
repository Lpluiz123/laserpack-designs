import imagemDor2 from '../assets/postura2.png';

export default function ProblemSection() {
  return (
    <section className="py-16 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <img src={imagemDor2} alt="Poor posture" className="rounded-2xl shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Your Chair is Your Enemy</h2>
          <p className="text-lg text-slate-600">Hours of sedentary work wreak havoc on your spine. Traditional office chairs force your body into unnatural positions, leading to muscle atrophy, nerve compression, and chronic back pain that persists long after you clock out.</p>
        </div>
      </div>
    </section>
  );
}