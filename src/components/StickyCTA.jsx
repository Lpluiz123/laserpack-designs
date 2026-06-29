export default function StickyCTA() {
  return (
    // A div externa garante o posicionamento fixo
    <div className="fixed bottom-0 left-0 w-full p-4 z-50 md:hidden">
      {/* Esta div interna centraliza o botão exatamente como o resto da sua página */}
      <div className="max-w-5xl mx-auto">
        <a 
          href="https://www.digilabzone.com/lasercutfiles?aff=luizfellipeilha25e3" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl text-center text-lg shadow-lg transition-transform active:scale-95"
        >
          SHOP ALL DESIGNS NOW
        </a>
      </div>
    </div>
  );
}