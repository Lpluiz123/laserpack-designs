import { handleClick } from "../services/api"; // Importe a função

export default function StickyCTA() {
  
  // Função para lidar com o clique
  const handleCtaClick = (e) => {
    e.preventDefault(); // Impede o redirecionamento imediato
    
    // Pega o ID que salvamos no localStorage lá no Hero
    const sessionId = localStorage.getItem('user_session') || "SEM_SESSAO";
    
    // Chama a função de rastreamento que você já tem
    // Supondo que você queira passar um valor de "0" ou preço fixo inicial
    handleClick(0, sessionId); 
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-50 md:hidden">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={handleCtaClick}
          className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl text-center text-lg shadow-lg transition-transform active:scale-95"
        >
          SHOP ALL DESIGNS NOW
        </button>
      </div>
    </div>
  );
}