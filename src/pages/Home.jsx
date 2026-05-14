import { Link } from 'react-router-dom';
import Particles from '../components/Particles';

const HERO_IMAGE = "https://static.base44.io/img-6ed5e0dc324e.png";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden scanline">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
      
      {/* Dark overlays */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />

      {/* Particles */}
      <Particles count={50} />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Main Title */}
        <h1
          className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-[0.3em] text-white glow-cyan animate-fade-in-up"
          style={{ animationDuration: '1s' }}>
          
          NULL
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 text-lg sm:text-xl md:text-2xl tracking-[0.4em] text-cyan animate-glow-pulse animate-fade-in-up font-medium"
          style={{ animationDelay: '0.3s', animationDuration: '1s', opacity: 0 }}>
          
          CODE IS MY WEAPON
        </p>

        {/* Decorative line */}
        <div
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent mx-auto mt-8 animate-fade-in"
          style={{ animationDelay: '0.6s', opacity: 0 }} />
        

        {/* Buttons */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: '0.8s', opacity: 0 }}>
          
          <Link
            to="/about"
            className="px-10 py-4 bg-cyan text-background text-sm font-bold tracking-[0.3em] hover:bg-cyan/90 transition-all duration-300 hover:shadow-[0_0_40px_#00f3ff44] min-w-[220px]">
            
            CONÓCEME
          </Link>
          <Link
            to="/projects"
            className="px-10 py-4 border border-white/30 text-white text-sm font-bold tracking-[0.3em] hover:border-cyan hover:text-cyan transition-all duration-300 box-glow-cyan-hover min-w-[220px]">
            
            VER PROYECTOS
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-20 animate-fade-in"
          style={{ animationDelay: '1.2s', opacity: 0 }}>
          
          
          <p className="text-[10px] tracking-[0.4em] text-white/20 mt-2 hidden">SCROLL</p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </div>);

}