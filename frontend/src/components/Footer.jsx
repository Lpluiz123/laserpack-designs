export default function Footer() {
  return (
    // Adicionamos 'mt-16' (margin-top) e 'pb-8' (padding-bottom) para dar respiro
    <footer className="mt-16 py-12 bg-slate-900 text-slate-400 text-center text-sm border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        

        {/* Direitos autorais */}
        <p className="mb-6">
          &copy; {new Date().getFullYear()} Desk Job Survival Guide. All rights reserved.
        </p>

        {/* Disclaimer com max-width para não quebrar a leitura */}
        <p className="max-w-2xl mx-auto text-xs text-slate-600 leading-relaxed">
          Disclaimer: This guide is for educational purposes only and does not replace professional medical advice.
        </p>
      </div>
    </footer>
  );
}