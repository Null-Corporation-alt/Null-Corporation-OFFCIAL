import SectionTitle from '../components/SectionTitle';
import { ExternalLink, Github, Lock, Globe, Terminal } from 'lucide-react';

const projects = [
  {
    title: 'PHANTOM SCANNER',
    category: 'SECURITY TOOL',
    description: 'Escáner de vulnerabilidades automatizado con detección de CVEs en tiempo real. Interfaz CLI con output estilo Matrix.',
    tags: ['Python', 'Nmap', 'CVE API'],
    icon: Terminal,
    status: 'OPEN SOURCE',
  },
  {
    title: 'GHOST NET',
    category: 'NETWORK TOOL',
    description: 'Monitor de tráfico de red con análisis de paquetes en tiempo real. Detección de intrusiones y anomalías.',
    tags: ['Python', 'Scapy', 'React'],
    icon: Globe,
    status: 'PRIVADO',
  },
  {
    title: 'CIPHER VAULT',
    category: 'ENCRYPTION',
    description: 'Sistema de cifrado de archivos con múltiples algoritmos. Interfaz web minimalista para gestión de claves.',
    tags: ['TypeScript', 'AES-256', 'Node.js'],
    icon: Lock,
    status: 'OPEN SOURCE',
  },
  {
    title: 'NULL PORTFOLIO',
    category: 'WEB DEV',
    description: 'Este mismo portafolio. Diseño cyberpunk minimalista inspirado en terminales y estética hacker.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    icon: ExternalLink,
    status: 'LIVE',
  },
];

export default function Projects() {
  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="PROYECTOS" subtitle="// CÓDIGO EN PRODUCCIÓN" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="group border border-cyan/10 bg-secondary/10 hover:border-cyan/30 transition-all duration-500 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${0.2 + i * 0.15}s`, opacity: 0 }}
            >
              {/* Header */}
              <div className="p-6 pb-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 border border-cyan/20 flex items-center justify-center group-hover:border-cyan/50 transition-colors">
                    <project.icon className="w-4 h-4 text-cyan/50 group-hover:text-cyan transition-colors" />
                  </div>
                  <span className={`text-[9px] tracking-[0.2em] px-3 py-1 border ${
                    project.status === 'OPEN SOURCE'
                      ? 'border-green-500/30 text-green-400/60'
                      : project.status === 'LIVE'
                      ? 'border-cyan/30 text-cyan/60'
                      : 'border-white/10 text-white/30'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-[10px] tracking-[0.2em] text-cyan/40 mb-1">{project.category}</p>
                <h3 className="text-lg font-bold tracking-[0.15em] text-white mb-3 group-hover:text-cyan/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed tracking-wider">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="p-6 pt-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] tracking-[0.15em] px-2.5 py-1 bg-cyan/5 text-cyan/40 border border-cyan/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div
          className="mt-16 text-center animate-fade-in-up"
          style={{ animationDelay: '0.9s', opacity: 0 }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/60 text-xs tracking-[0.2em] hover:border-cyan/50 hover:text-cyan transition-all duration-300 box-glow-cyan-hover"
          >
            <Github className="w-4 h-4" />
            VER MÁS EN GITHUB
          </a>
        </div>
      </div>
    </div>
  );
}