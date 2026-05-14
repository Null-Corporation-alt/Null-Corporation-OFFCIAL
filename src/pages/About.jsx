import SectionTitle from '../components/SectionTitle';
import { Shield, Terminal, Eye, Zap } from 'lucide-react';

const traits = [
  {
    icon: Terminal,
    title: 'DESARROLLO',
    description: 'Código limpio, arquitecturas escalables. Full-stack con enfoque en rendimiento y seguridad.',
  },
  {
    icon: Shield,
    title: 'SEGURIDAD',
    description: 'Hacking ético, pentesting, análisis de vulnerabilidades. Protegiendo sistemas desde adentro.',
  },
  {
    icon: Eye,
    title: 'ANÁLISIS',
    description: 'OSINT, reconocimiento de redes, análisis forense digital. Encontrar lo que otros no ven.',
  },
  {
    icon: Zap,
    title: 'AUTOMATIZACIÓN',
    description: 'Scripts, bots, herramientas custom. Automatizar es la clave de la eficiencia.',
  },
];

export default function About() {
  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="SOBRE MÍ" subtitle="// QUIÉN ESTÁ DETRÁS DEL CÓDIGO" />

        {/* Bio */}
        <div
          className="max-w-3xl mx-auto text-center mb-20 animate-fade-in-up"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <p className="text-white/60 text-sm leading-relaxed tracking-wider mb-6">
            Soy un desarrollador y hacker ético que vive en la intersección entre la seguridad
            y la creatividad. Mi código es mi herramienta, mi escudo y mi arma. Creo sistemas
            que no solo funcionan — funcionan de forma impenetrable.
          </p>
          <p className="text-white/40 text-xs tracking-[0.2em]">
            {'"EN UN MUNDO DE UNOS Y CEROS, YO SOY NULL."'}
          </p>
        </div>

        {/* Traits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {traits.map((trait, i) => (
            <div
              key={trait.title}
              className="group border border-cyan/10 p-8 hover:border-cyan/30 transition-all duration-500 bg-secondary/20 hover:bg-secondary/40 animate-fade-in-up"
              style={{ animationDelay: `${0.3 + i * 0.15}s`, opacity: 0 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border border-cyan/20 flex items-center justify-center group-hover:border-cyan/50 transition-colors shrink-0">
                  <trait.icon className="w-5 h-5 text-cyan/60 group-hover:text-cyan transition-colors" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-[0.2em] text-white mb-2">
                    {trait.title}
                  </h3>
                  <p className="text-xs text-white/40 leading-relaxed tracking-wider">
                    {trait.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal block */}
        <div
          className="mt-16 border border-cyan/10 bg-secondary/30 p-6 animate-fade-in-up"
          style={{ animationDelay: '0.9s', opacity: 0 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
            <span className="text-[10px] text-white/20 ml-2 tracking-wider">{"null@system:~$"}</span>
          </div>
          <div className="text-xs text-cyan/60 leading-loose tracking-wider font-mono">
            <p><span className="text-magenta/60">$</span> whoami</p>
            <p className="text-white/40 ml-4">{"null — ethical hacker & developer"}</p>
            <p className="mt-2"><span className="text-magenta/60">$</span> cat /etc/motd</p>
            <p className="text-white/40 ml-4">{'"Code is not just logic. It\'s art, power, and freedom."'}</p>
            <p className="mt-2"><span className="text-magenta/60">$</span> <span className="animate-flicker">_</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}