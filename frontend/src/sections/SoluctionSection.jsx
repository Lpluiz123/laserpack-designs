import imagemDor3 from '../assets/trabalho3.png';

export default function SolutionSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10">
        
        {/* Lado direito: Imagem */}
        <div className="md:w-1/2">
          <img 
            src={imagemDor3} 
            alt="Easy daily routine" 
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Lado esquerdo: Texto */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Simple, Effective, Discreet
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            You don't need a gym, expensive equipment, or hours of free time. 
            Our 7-minute method was designed specifically for busy professionals.
          </p>
          <ul className="space-y-4 text-slate-700">
            <li className="flex items-start gap-3">
              <span>✅</span> Perform these movements discreetly at your desk.
            </li>
            <li className="flex items-start gap-3">
              <span>✅</span> Zero equipment needed—just you and your chair.
            </li>
            <li className="flex items-start gap-3">
              <span>✅</span> Feel the tension release in less than 7 minutes a day.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}