export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-white font-bold text-xl">LaserPack Designs</div>

        <div className="flex gap-8 text-sm">
          <a
            href="mailto:laserpackdesigner@gmail.com"
            className="hover:text-white transition-colors"
          >
            Contact Support
          </a>
        </div>

        <div className="text-xs">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
