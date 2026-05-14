import { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import LoginModal from './LoginModal.jsx';

const ADMIN_PASSWORD = 'SolLuna42Mar';
const ADMIN_SESSION_KEY = 'null_corp_admin';

const navLinks = [
  { to: '/about', label: 'SOBRE MÍ' },
  { to: '/skills', label: 'HABILIDADES' },
  { to: '/projects', label: 'PROYECTOS' },
  { to: '/contact', label: 'CONTACTO' },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
      setAdminModalOpen(false);
      setAdminPass('');
      setAdminError('');
      navigate('/admin');
    } else {
      setAdminError('Acceso denegado. Contraseña incorrecta.');
      setAdminPass('');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-cyan/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo - Single click: home | Double click: admin access */}
          <span
            onClick={() => navigate('/')}
            onDoubleClick={() => { setAdminModalOpen(true); setAdminError(''); }}
            className="text-2xl font-bold tracking-widest text-white glow-cyan-subtle hover:glow-cyan transition-all duration-300 cursor-pointer select-none"
          >
            NULL
          </span>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs tracking-[0.2em] font-medium transition-all duration-300 hover:text-cyan ${
                  location.pathname === link.to ? 'text-cyan glow-cyan-subtle' : 'text-white/60'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center gap-6 border-l border-cyan/10 ml-4 pl-8">
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 text-xs tracking-[0.2em] font-medium transition-all duration-300 hover:text-cyan ${
                    location.pathname === '/profile' ? 'text-cyan glow-cyan-subtle' : 'text-white/60'
                  }`}
                >
                  <img src={user?.avatar} className="w-5 h-5 rounded-full border border-cyan/30 p-[1px]" alt="" />
                  PERFIL
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="ml-4 px-5 py-2 text-xs tracking-[0.2em] font-bold border border-cyan/50 text-cyan hover:bg-cyan/10 hover:border-cyan transition-all duration-300 box-glow-cyan-hover"
              >
                INICIAR SESIÓN
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white/80 hover:text-cyan transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-cyan/10 animate-fade-in">
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm tracking-[0.15em] font-medium transition-all duration-300 hover:text-cyan ${
                    location.pathname === link.to ? 'text-cyan' : 'text-white/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm tracking-[0.15em] font-medium text-cyan flex items-center gap-2"
                  >
                    <img src={user?.avatar} className="w-5 h-5 rounded-full border border-cyan/30 p-[1px]" alt="" />
                    MI PERFIL
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => { setLoginOpen(true); setMobileOpen(false); }}
                  className="mt-2 px-5 py-3 text-xs tracking-[0.2em] font-bold border border-cyan/50 text-cyan hover:bg-cyan/10 transition-all duration-300 w-full"
                >
                  INICIAR SESIÓN
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* Admin Password Modal */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => { setAdminModalOpen(false); setAdminError(''); setAdminPass(''); }} />
          <div className="relative z-10 w-full max-w-sm mx-4 bg-background border border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.2)] p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ShieldAlert size={20} className="text-red-400" />
                <span className="text-xs tracking-[0.3em] font-bold text-red-400 uppercase">Acceso Restringido</span>
              </div>
              <button onClick={() => { setAdminModalOpen(false); setAdminError(''); setAdminPass(''); }} className="text-white/40 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Decorative line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent mb-6" />

            <p className="text-white/50 text-xs tracking-[0.1em] mb-6 text-center">Introduce la contraseña de administrador para continuar.</p>

            <div className="space-y-4">
              <input
                type="password"
                value={adminPass}
                onChange={(e) => { setAdminPass(e.target.value); setAdminError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                placeholder="Contraseña"
                autoFocus
                className="w-full bg-black/40 border border-red-500/20 focus:border-red-500/60 text-white text-sm px-4 py-3 outline-none placeholder:text-white/20 tracking-widest transition-colors"
              />

              {adminError && (
                <p className="text-red-400 text-xs tracking-[0.1em] text-center animate-pulse">{adminError}</p>
              )}

              <button
                onClick={handleAdminLogin}
                className="w-full py-3 text-xs tracking-[0.3em] font-bold bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500/20 hover:border-red-500/70 transition-all duration-300 uppercase"
              >
                Verificar Identidad
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}