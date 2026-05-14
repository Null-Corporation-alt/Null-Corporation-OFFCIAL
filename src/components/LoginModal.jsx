import { useEffect, useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function LoginModal({ open, onClose }) {
  const { login, register, generateResetToken } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'registered' | 'forgot_password' | 'reset_sent'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [resetLink, setResetLink] = useState('');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setError('');
      setMode('login');
      setCredentials(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const email = e.target.email.value;
    try {
      const result = await register(email);
      setCredentials(result);
      setMode('registered');
    } catch (err) {
      setError(err.message || 'Error al registrar. El email puede que ya esté en uso.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const email = e.target.email.value;
    try {
      const token = await generateResetToken(email);
      // Simulate email by providing the link directly in UI
      const link = `${window.location.origin}/reset-password?token=${token}`;
      setResetLink(link);
      setMode('reset_sent');
    } catch (err) {
      setError(err.message || 'No se pudo generar el enlace de recuperación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" />
      <div
        className="relative w-full max-w-md bg-background border border-cyan/20 box-glow-cyan animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        style={{ animationDuration: '0.4s' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-cyan transition-colors">
          <X size={20} />
        </button>

        <div className="p-8 pt-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 border border-cyan/30 mb-4">
              {mode === 'registered' ? (
                <CheckCircle2 className="w-6 h-6 text-cyan" />
              ) : (
                <Lock className="w-6 h-6 text-cyan" />
              )}
            </div>
            <h2 className="text-2xl font-bold tracking-[0.2em] text-white">
              {mode === 'login' ? 'INICIAR SESIÓN' : 
               mode === 'register' ? 'REGISTRO' : 
               mode === 'forgot_password' ? 'RECUPERAR ACCESO' :
               mode === 'reset_sent' ? 'CORREO ENVIADO' :
               'REGISTRO COMPLETO'}
            </h2>
            <div className="w-12 h-[1px] bg-cyan/50 mx-auto mt-3" />
          </div>

          {mode === 'registered' ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-cyan/80 tracking-wider mb-2">¡Credenciales generadas con éxito!</p>
                <p className="text-xs text-white/40 tracking-wider">Se ha "enviado" un correo con tus datos de acceso.</p>
              </div>
              
              <div className="bg-secondary/50 border border-cyan/10 p-4 rounded-sm space-y-3 font-mono">
                <div>
                  <label className="block text-[10px] text-white/30 tracking-widest mb-1 uppercase">Email</label>
                  <p className="text-sm text-cyan">{credentials?.email}</p>
                </div>
                <div>
                  <label className="block text-[10px] text-white/30 tracking-widest mb-1 uppercase">Contraseña</label>
                  <p className="text-sm text-white select-all">{credentials?.password}</p>
                </div>
              </div>

              <p className="text-[10px] text-white/30 text-center italic">Copia tu contraseña para iniciar sesión ahora.</p>

              <button 
                onClick={() => setMode('login')} 
                className="w-full py-3 bg-cyan text-background text-xs font-bold tracking-[0.2em] hover:bg-cyan/90 transition-all duration-300"
              >
                IR AL LOGIN
              </button>
            </div>
          ) : mode === 'login' ? (
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs tracking-[0.15em] text-white/50 mb-2 font-medium uppercase">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan/40" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-secondary/50 border border-cyan/10 text-white text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-cyan/50 transition-all duration-300 placeholder:text-white/20 font-mono"
                    placeholder="null@system.io"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] text-white/50 mb-2 font-medium uppercase">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan/40" />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full bg-secondary/50 border border-cyan/10 text-white text-sm pl-10 pr-10 py-3 focus:outline-none focus:border-cyan/50 transition-all duration-300 placeholder:text-white/20 font-mono"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan/40 hover:text-cyan transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {error && <p className="text-xs text-red-400 tracking-wider animate-pulse">{error}</p>}
              <div className="flex justify-between items-center mt-2">
                <button
                  type="button"
                  onClick={() => setMode('forgot_password')}
                  className="text-[10px] text-white/30 hover:text-cyan transition-colors tracking-widest uppercase"
                >
                  ¿He olvidado mi contraseña?
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-cyan text-background text-sm font-bold tracking-[0.2em] hover:bg-cyan/90 transition-all duration-300 mt-2 hover:shadow-[0_0_30px_#00f3ff44] disabled:opacity-50"
              >
                {loading ? 'PROCESANDO...' : 'ENTRAR AL SISTEMA'}
              </button>
              <div className="mt-4 text-center">
                <button type="button" onClick={() => setMode('register')} className="text-xs text-white/40 hover:text-cyan transition-colors tracking-wider">
                  ¿No tienes cuenta? Regístrate
                </button>
              </div>
            </form>
          ) : mode === 'forgot_password' ? (
            <form className="space-y-5" onSubmit={handleForgotPassword}>
              <div>
                <p className="text-xs text-white/40 mb-4 leading-relaxed text-center italic">
                  Ingresa tu email. Si la cuenta existe, te enviaremos un enlace para restablecer tu contraseña.
                </p>
                <label className="block text-xs tracking-[0.15em] text-white/50 mb-2 font-medium uppercase">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan/40" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-secondary/50 border border-cyan/10 text-white text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-cyan/50 transition-all duration-300 placeholder:text-white/20 font-mono"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              {error && <p className="text-xs text-red-400 tracking-wider">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-cyan text-background text-sm font-bold tracking-[0.2em] hover:bg-cyan/90 transition-all duration-300 hover:shadow-[0_0_30px_#00f3ff44] disabled:opacity-50"
              >
                {loading ? 'VERIFICANDO...' : 'ENVIAR ENLACE'}
              </button>
              <div className="mt-4 text-center">
                <button type="button" onClick={() => setMode('login')} className="text-xs text-white/40 hover:text-cyan transition-colors tracking-wider">
                  Volver al inicio de sesión
                </button>
              </div>
            </form>
          ) : mode === 'reset_sent' ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-cyan/80 tracking-wider mb-2">¡Correo enviado con éxito!</p>
                <p className="text-xs text-white/40 tracking-wider">Simulación de email: Haz clic en el enlace a continuación para restablecer tu contraseña.</p>
              </div>
              
              <div className="bg-secondary/50 border border-cyan/10 p-4 rounded-sm space-y-3 font-mono break-all">
                <div>
                  <label className="block text-[10px] text-white/30 tracking-widest mb-2 uppercase">Enlace de Recuperación</label>
                  <a href={resetLink} className="text-sm text-cyan hover:underline">{resetLink}</a>
                </div>
              </div>

              <button 
                onClick={() => setMode('login')} 
                className="w-full py-3 bg-cyan text-background text-xs font-bold tracking-[0.2em] hover:bg-cyan/90 transition-all duration-300"
              >
                VOLVER
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleRegister}>
              <div>
                <p className="text-xs text-white/40 mb-4 leading-relaxed text-center italic">
                  Ingresa tu email para recibir tus credenciales de acceso cifradas.
                </p>
                <label className="block text-xs tracking-[0.15em] text-white/50 mb-2 font-medium uppercase">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan/40" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-secondary/50 border border-cyan/10 text-white text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-cyan/50 transition-all duration-300 placeholder:text-white/20 font-mono"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              {error && <p className="text-xs text-red-400 tracking-wider">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-cyan text-background text-sm font-bold tracking-[0.2em] hover:bg-cyan/90 transition-all duration-300 hover:shadow-[0_0_30px_#00f3ff44] disabled:opacity-50"
              >
                {loading ? 'PROCESANDO...' : 'CREAR CUENTA'}
              </button>
              <div className="mt-4 text-center">
                <button type="button" onClick={() => setMode('login')} className="text-xs text-white/40 hover:text-cyan transition-colors tracking-wider">
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
      </div>
    </div>
  );
}