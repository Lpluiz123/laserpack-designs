// components/ProductCard.jsx
export default function ProductCard({ title, imageUrl }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
      <div className="overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      
      {/* Área de Texto Unificada */}
      <div className="p-4 text-center">
        <h3 className="font-bold text-lg text-slate-800">{title}</h3>
        <p className="text-slate-400 text-xs mt-1 italic">
          Digital file for laser cutting
        </p>
      </div>
    </div>
  );
}