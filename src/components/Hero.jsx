import { handleClick } from "../services/api";
import { useEffect, useState } from "react";

export default function Hero() {
 const [sessionId, setSessionId] = useState('');
 

  useEffect(() =>{
    // 1. Tenta buscar no navegador do usuário
    let id = localStorage.getItem('user_session')

    // 2. Se não tem ID, é a primeira vez (ou ele limpou o cache)
    if(!id) {
        id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        localStorage.setItem('user_session', id)
    }

    // 3. Define o estado para o seu front-end usar no link
    setSessionId(id)
    console.log("Session ID carregado:", id);
},[])

  return (
    <section className="bg-slate-50 py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Título Vendedor */}
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
          Instant Access to <span className="text-orange-600">Premium</span>{" "}
          Laser Cut Designs for Your Projects
        </h1>

        {/* Subtítulo Atualizado */}
        <p className="mt-6 text-lg text-slate-600">
          Stop wasting wood with bad files. Download professional-grade,
          test-ready SVG/DXF projects. Get instant access today.
        </p>

        {/* Botão de Chamada para Ação (CTA) */}
        <div className="mt-10 flex justify-center hidden md:flex">
          <button
            onClick={() => handleClick(0)}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-all transform hover:scale-105 cursor-pointer"
          >
            SHOP ALL DESIGNS NOW
          </button>
        </div>

        {/* Prova de Garantia Nova */}
        <div className="mt-4 text-sm text-slate-600 font-semibold flex justify-center gap-4">
          <span>✅ Secure Checkout</span>
          <span>⭐ Satisfaction Guaranteed</span>
        </div>

        {/* Prova Social */}
        <div className="mt-6 text-sm text-slate-500 font-medium">
          ✓ Tested on Glowforge & LightBurn | ✓ Commercial License Included
        </div>

        {/* Seção de Vantagens */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Precision Cut", desc: "No burn marks or gaps" },
            { title: "Versatile", desc: "Works with any laser software" },
            { title: "Lifetime Access", desc: "Download anytime, forever" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
            >
              <h4 className="font-bold text-slate-800">{item.title}</h4>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
