import imagemDor from '../assets/imagem_dor1.png'

const Hero = () => {
  return (

<section className="py-16 px-6 text-center">
      <div className="mb-8">
        <img 
          src={imagemDor}
          alt="Desk worker relief" 
          className="mx-auto rounded-2xl shadow-xl max-w-full md:max-w-2xl"
        />
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
        Stop the Silent Destruction of Your Back While Working
      </h1>

      <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
        Discover the doctor-approved, 7-minute daily routine to eliminate
        desk-induced back pain and reclaim your posture.
      </p>

      <div className="hidden md:flex flex-col items-center gap-4">
        <a
          href="https://www.betterdailyguide.site/ds24/the-desk-job-survival-guide"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition"
        >
          Get Instant Access Now
        </a>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>✅ Secure Checkout</span>
          <span>⭐ Satisfaction Guaranteed</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
