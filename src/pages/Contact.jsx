import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { Send, Mail, MapPin, Github, AtSign, Heart, X, ExternalLink } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'EMAIL', value: 'anonymous.lard060@passinbox.com' },
  { icon: MapPin, label: 'UBICACIÓN', value: 'SOMEWHERE IN THE NETWORK' },
  { icon: Github, label: 'GITHUB', value: 'github.com/Null-Corporation-alt' },
  { icon: AtSign, label: 'DISCORD', value: 'mr_tostador' },
];

const PRESET_AMOUNTS = [0.5, 1, 5, 10, 20, 50, 100];

const STRIPE_URL = 'https://buy.stripe.com/test_eVq9AM29Y8GN4UlaEH4Ni00';

function ContributeModal({ onClose }) {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const finalAmount = isCustom
    ? parseFloat(customAmount) || 0
    : selectedAmount;

  const handlePreset = (amount) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustom = (val) => {
    setCustomAmount(val);
    setIsCustom(true);
    setSelectedAmount(null);
  };

  const handlePay = () => {
    // Open Stripe checkout (static URL). It will handle the amount internally.
    window.open(STRIPE_URL, '_blank', 'noopener');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg mx-4 bg-background border border-cyan/20 shadow-[0_0_60px_rgba(0,243,255,0.1)] overflow-hidden">

        {/* Glowing top bar */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Heart size={16} className="text-cyan" />
            <span className="text-xs tracking-[0.3em] font-bold text-white uppercase">Contribuir</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-7 space-y-8">
          {/* Presets */}
          <div className="grid grid-cols-4 gap-3">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => handlePreset(amt)}
                className={`py-3 border text-sm font-mono transition-all ${
                  selectedAmount === amt
                    ? 'border-cyan bg-cyan/10 text-cyan'
                    : 'border-white/5 hover:border-cyan/30 text-white/50'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            className="w-full py-4 text-xs tracking-[0.3em] font-bold bg-cyan text-background hover:bg-cyan/90 transition-all duration-300 flex items-center justify-center gap-2 uppercase"
          >
            <ExternalLink size={14} />
            Pagar con Stripe
          </button>
        </div>

        {/* Bottom glow */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
      </div>
    </div>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [contributeOpen, setContributeOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="CONTACTO" subtitle="// ESTABLECE CONEXIÓN" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: '0.2s', opacity: 0 }}
            >
              <p className="text-sm text-white/50 leading-relaxed tracking-wider mb-8">
                ¿Tienes un proyecto en mente? ¿Necesitas una auditoría de seguridad?
                ¿O simplemente quieres hablar de código? Envíame un mensaje.
              </p>
            </div>

            {contactInfo.map((info, i) => (
              <div
                key={info.label}
                className="flex items-center gap-4 group animate-fade-in-up"
                style={{ animationDelay: `${0.3 + i * 0.1}s`, opacity: 0 }}
              >
                <div className="w-10 h-10 border border-cyan/15 flex items-center justify-center group-hover:border-cyan/40 transition-colors">
                  <info.icon className="w-4 h-4 text-cyan/40 group-hover:text-cyan transition-colors" />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] text-white/30">{info.label}</p>
                  <p className="text-xs tracking-wider text-white/60 group-hover:text-white/80 transition-colors">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Contribute Button */}
            <div
              className="animate-fade-in-up pt-4"
              style={{ animationDelay: '0.75s', opacity: 0 }}
            >
              <button
                onClick={() => setContributeOpen(true)}
                className="group flex items-center gap-3 px-6 py-4 border border-cyan/20 hover:border-cyan/60 bg-cyan/5 hover:bg-cyan/10 transition-all duration-300 w-full hover:shadow-[0_0_25px_rgba(0,243,255,0.1)]"
              >
                <Heart size={16} className="text-cyan group-hover:scale-110 transition-transform duration-300" />
                <div className="text-left">
                  <p className="text-xs font-bold tracking-[0.25em] text-cyan uppercase">Contribuir</p>
                  <p className="text-[10px] tracking-wider text-white/30 mt-0.5">Apoya este proyecto</p>
                </div>
                <div className="ml-auto text-white/20 group-hover:text-cyan/50 transition-colors">→</div>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 animate-fade-in-up"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-white/40 mb-2">NOMBRE</label>
              <input
                type="text"
                required
                className="w-full bg-secondary/30 border border-cyan/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-cyan/40 transition-all duration-300 placeholder:text-white/15 font-mono tracking-wider"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-white/40 mb-2">EMAIL</label>
              <input
                type="email"
                required
                className="w-full bg-secondary/30 border border-cyan/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-cyan/40 transition-all duration-300 placeholder:text-white/15 font-mono tracking-wider"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-white/40 mb-2">MENSAJE</label>
              <textarea
                required
                rows={5}
                className="w-full bg-secondary/30 border border-cyan/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-cyan/40 transition-all duration-300 placeholder:text-white/15 font-mono tracking-wider resize-none"
                placeholder="Escribe tu mensaje..."
              />
            </div>

            <button
              type="submit"
              className={`w-full py-4 text-sm font-bold tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-3 ${
                sent
                  ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                  : 'bg-cyan text-background hover:bg-cyan/90 hover:shadow-[0_0_30px_#00f3ff44]'
              }`}
            >
              {sent ? (
                <>MENSAJE ENVIADO</>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  ENVIAR MENSAJE
                </>
              )}
            </button>
          </form>
        </div>

        {/* Encrypted message */}
        <div
          className="mt-20 text-center animate-fade-in-up"
          style={{ animationDelay: '0.8s', opacity: 0 }}
        >
          <p className="text-[10px] tracking-[0.3em] text-white/10 font-mono">
            {'> ENCRYPTED CHANNEL READY // AWAITING TRANSMISSION...'}
          </p>
        </div>
      </div>

      {/* Contribute Modal */}
      {contributeOpen && <ContributeModal onClose={() => setContributeOpen(false)} />}
    </div>
  );
}