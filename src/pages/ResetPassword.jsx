import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Lock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Token no proporcionado. El enlace no es válido.');
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/'); // Redirect to home so they can login
      }, 3000);
    } catch (err) {
      setError(err.message || 'Error al restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan/5 via-background to-background" />
      
      <div className="relative w-full max-w-md bg-secondary/30 border border-cyan/20 p-8 box-glow-cyan animate-fade-in-up">
        {/* Glowing top bar */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 border border-cyan/30 mb-4 bg-background">
            {success ? (
              <CheckCircle2 className="w-6 h-6 text-cyan" />
            ) : error && !token ? (
              <ShieldAlert className="w-6 h-6 text-red-500" />
            ) : (
              <Lock className="w-6 h-6 text-cyan" />
            )}
          </div>
          <h2 className="text-2xl font-bold tracking-[0.2em] text-white">
            {success ? 'CONTRASEÑA ACTUALIZADA' : 'NUEVA CONTRASEÑA'}
          </h2>
          <div className="w-12 h-[1px] bg-cyan/50 mx-auto mt-3" />
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-cyan/80 tracking-wider">Tu contraseña ha sido modificada correctamente.</p>
            <p className="text-xs text-white/40 tracking-wider">Serás redirigido al inicio para que puedas iniciar sesión.</p>
            <div className="w-full h-1 bg-secondary overflow-hidden rounded-full mt-4">
              <div className="h-full bg-cyan animate-[pulse_1s_ease-in-out_infinite]" style={{ width: '100%' }} />
            </div>
          </div>
        ) : error && !token ? (
          <div className="text-center">
            <p className="text-sm text-red-400 tracking-wider">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 w-full py-3 bg-cyan/10 border border-cyan/30 text-cyan text-sm font-bold tracking-[0.2em] hover:bg-cyan/20 transition-all duration-300"
            >
              VOLVER AL INICIO
            </button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <p className="text-xs text-white/40 mb-4 leading-relaxed text-center italic">
              Introduce tu nueva contraseña. Asegúrate de guardarla en un lugar seguro.
            </p>
            
            <div>
              <label className="block text-xs tracking-[0.15em] text-white/50 mb-2 font-medium uppercase">
                Nueva Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-cyan/10 text-white text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-cyan/50 transition-all duration-300 placeholder:text-white/20 font-mono"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-[0.15em] text-white/50 mb-2 font-medium uppercase">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan/40" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-background border border-cyan/10 text-white text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-cyan/50 transition-all duration-300 placeholder:text-white/20 font-mono"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {error && <p className="text-xs text-red-400 tracking-wider text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading || !password || !confirmPassword}
              className="w-full py-3.5 bg-cyan text-background text-sm font-bold tracking-[0.2em] hover:bg-cyan/90 transition-all duration-300 mt-2 hover:shadow-[0_0_30px_#00f3ff44] disabled:opacity-50"
            >
              {loading ? 'PROCESANDO...' : 'ACTUALIZAR CONTRASEÑA'}
            </button>
          </form>
        )}

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
      </div>
    </div>
  );
}
