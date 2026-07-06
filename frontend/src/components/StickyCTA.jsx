import { handleClick } from "../services/api";

export default function StickyCTA() {
  
  const handleCtaClick = (e) => {
    e.preventDefault();
    
    // O sessionId continua sendo fundamental para o seu rastreamento
    const sessionId = localStorage.getItem('user_session') || "SEM_SESSAO";
    
    // Dispara o evento de clique para o seu Dashboard
    handleClick(0, sessionId); 

    window.location.href = "https://www.betterdailyguide.site/ds24/the-desk-job-survival-guide"; 
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-50 md:hidden">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={handleCtaClick}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-center text-lg shadow-lg transition-transform active:scale-95"
        >
          Get Pain-Free Now
        </button>
      </div>
    </div>
  );
}