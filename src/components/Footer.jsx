import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-cyan/10 bg-background/80">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="text-xl font-bold tracking-[0.3em] text-white glow-cyan-subtle">
            NULL
          </Link>
          <div className="flex items-center gap-8">
            <Link to="/about" className="text-xs tracking-[0.15em] text-white/40 hover:text-cyan transition-colors">SOBRE MÍ</Link>
            <Link to="/skills" className="text-xs tracking-[0.15em] text-white/40 hover:text-cyan transition-colors">HABILIDADES</Link>
            <Link to="/projects" className="text-xs tracking-[0.15em] text-white/40 hover:text-cyan transition-colors">PROYECTOS</Link>
            <Link to="/contact" className="text-xs tracking-[0.15em] text-white/40 hover:text-cyan transition-colors">CONTACTO</Link>
          </div>
          <p className="text-xs text-white/20 tracking-wider">
            © 2026 NULL — ALL RIGHTS RESERVED
          </p>
        </div>
        <div className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
        <p className="text-center text-[10px] text-white/10 tracking-[0.3em] mt-4">
          SYSTEM ONLINE // SECURE CONNECTION ESTABLISHED
        </p>
      </div>
    </footer>
  );
}