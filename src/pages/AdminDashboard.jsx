import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/lib/authService';
import {
  ShieldAlert, Users, Ban, UserCheck, LogOut,
  RefreshCw, Search, AlertTriangle
} from 'lucide-react';

const ADMIN_SESSION_KEY = 'null_corp_admin';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [confirmBan, setConfirmBan] = useState(null); // email to confirm ban

  // Guard: if not admin session, redirect away
  useEffect(() => {
    if (!sessionStorage.getItem(ADMIN_SESSION_KEY)) {
      navigate('/');
    } else {
      loadUsers();
    }
  }, []);

  const loadUsers = () => {
    const list = authService.getUsersList();
    setUsers(list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const handleBan = (email) => {
    authService.banUser(email);
    loadUsers();
    setConfirmBan(null);
  };

  const handleUnban = (email) => {
    authService.unbanUser(email);
    loadUsers();
  };

  const handleExit = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    navigate('/');
  };

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const totalBanned = users.filter(u => u.banned).length;
  const totalActive = users.length - totalBanned;

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert size={20} className="text-red-400" />
            <span className="text-xs tracking-[0.3em] font-bold text-red-400 uppercase">Panel de Administración</span>
            <span className="ml-3 text-white/20 text-xs">|</span>
            <span className="text-white/40 text-xs tracking-widest">NULL CORP</span>
          </div>
          <button
            onClick={handleExit}
            className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.2em] text-white/50 hover:text-red-400 border border-white/10 hover:border-red-500/40 transition-all duration-300"
          >
            <LogOut size={14} />
            SALIR
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Usuarios Totales', value: users.length, icon: Users, color: 'cyan' },
            { label: 'Usuarios Activos', value: totalActive, icon: UserCheck, color: 'green' },
            { label: 'Usuarios Baneados', value: totalBanned, icon: Ban, color: 'red' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className={`bg-secondary/10 border border-${color === 'cyan' ? 'cyan' : color === 'green' ? 'green' : 'red'}-500/20 p-6 relative overflow-hidden`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-2">{label}</p>
                  <p className={`text-4xl font-bold ${color === 'cyan' ? 'text-cyan' : color === 'green' ? 'text-green-400' : 'text-red-400'}`}>{value}</p>
                </div>
                <Icon size={32} className={`opacity-10 ${color === 'cyan' ? 'text-cyan' : color === 'green' ? 'text-green-400' : 'text-red-400'}`} />
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${color === 'cyan' ? 'cyan' : color === 'green' ? 'green' : 'red'}-500/40 to-transparent`} />
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-secondary/5 border border-white/5">
          {/* Table Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="text-xs tracking-[0.3em] font-bold text-white/70 uppercase flex items-center gap-2">
              <Users size={14} className="text-cyan" />
              Usuarios Registrados
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar..."
                  className="bg-black/40 border border-white/10 focus:border-cyan/30 text-white text-xs px-4 py-2 pl-8 outline-none placeholder:text-white/20 tracking-wider transition-colors w-48"
                />
              </div>
              <button
                onClick={loadUsers}
                className="p-2 text-white/40 hover:text-cyan border border-white/10 hover:border-cyan/30 transition-all duration-300"
                title="Refrescar"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-white/30 text-sm tracking-widest">
              {users.length === 0 ? 'No hay usuarios registrados todavía.' : 'Ningún usuario coincide con la búsqueda.'}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Avatar', 'Usuario', 'Email', 'Registro', 'Estado', 'Acción'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs tracking-[0.2em] text-white/30 uppercase font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr
                    key={u.email}
                    className={`border-b border-white/5 hover:bg-white/2 transition-colors ${u.banned ? 'opacity-50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={u.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full border border-cyan/20"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white font-medium tracking-wider">{u.username}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-white/50 tracking-wider">{u.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-white/30">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.banned ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs tracking-widest text-red-400 bg-red-500/10 border border-red-500/20">
                          <Ban size={10} />
                          BANEADO
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs tracking-widest text-green-400 bg-green-500/10 border border-green-500/20">
                          <UserCheck size={10} />
                          ACTIVO
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {u.banned ? (
                        <button
                          onClick={() => handleUnban(u.email)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs tracking-widest text-green-400 border border-green-500/30 hover:bg-green-500/10 transition-all duration-300"
                        >
                          <UserCheck size={12} />
                          DESBANEAR
                        </button>
                      ) : (
                        <button
                          onClick={() => setConfirmBan(u.email)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs tracking-widest text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all duration-300"
                        >
                          <Ban size={12} />
                          BANEAR
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Confirm Ban Modal */}
      {confirmBan && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setConfirmBan(null)} />
          <div className="relative z-10 w-full max-w-sm mx-4 bg-background border border-red-500/40 shadow-[0_0_60px_rgba(239,68,68,0.3)] p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={20} className="text-red-400" />
              <span className="text-xs tracking-[0.3em] font-bold text-red-400 uppercase">Confirmar Baneo</span>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent mb-6" />
            <p className="text-white/60 text-sm mb-2">¿Banear al siguiente usuario?</p>
            <p className="text-white font-bold tracking-wider text-sm mb-6 bg-red-500/5 border border-red-500/20 px-4 py-2">{confirmBan}</p>
            <p className="text-white/30 text-xs mb-6">El usuario no podrá iniciar sesión hasta que lo desbanees.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmBan(null)}
                className="flex-1 py-2 text-xs tracking-[0.2em] text-white/50 border border-white/10 hover:border-white/30 transition-all duration-300 uppercase"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleBan(confirmBan)}
                className="flex-1 py-2 text-xs tracking-[0.2em] font-bold text-red-400 bg-red-500/10 border border-red-500/40 hover:bg-red-500/20 transition-all duration-300 uppercase"
              >
                Confirmar Baneo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
