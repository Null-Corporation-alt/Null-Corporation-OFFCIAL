import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { User, Mail, Camera, Save, LogOut, ShieldCheck, Palette, Upload, Image as ImageIcon, Sliders, X, Check, Eraser, MousePointer2, Minus, Plus, RefreshCw } from 'lucide-react';

// Corrected Options for DiceBear 7.x Pixel Art
const PIXEL_OPTIONS = {
  eyes: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12'],
  clothing: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15', 'variant16', 'variant17', 'variant18', 'variant19', 'variant20', 'variant21', 'variant22', 'variant23'],
  hair: ['short01', 'short02', 'short03', 'short04', 'short05', 'short06', 'short07', 'short08', 'short09', 'short10', 'short11', 'short12', 'short13', 'short14', 'short15', 'short16', 'short17', 'short18', 'short19', 'short20', 'short21', 'short22', 'short23', 'short24', 'long01', 'long02', 'long03', 'long04', 'long05', 'long06', 'long07', 'long08', 'long09', 'long10', 'long11', 'long12', 'long13', 'long14', 'long15', 'long16', 'long17', 'long18', 'long19', 'long20', 'long21'],
};

const PALETTE = [
  '#00f3ff', '#ff0055', '#00ff41', '#ffff00', '#ff00ff', '#ffffff', '#000000', 
  '#ff9900', '#444444', '#888888', '#aa00ff', '#0055ff', '#ff5500', '#55ff00'
];

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [seed, setSeed] = useState('');
  const [mode, setMode] = useState('pixel');
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [brushSize, setBrushSize] = useState(1);
  const [customOptions, setCustomOptions] = useState({
    eyes: 'variant01',
    clothing: 'variant01',
    hair: 'short01',
  });

  // Local preview to ensure instant updates while typing
  const [previewAvatar, setPreviewAvatar] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const isDrawing = useRef(false);

  const DEFAULT_AVATAR = `https://api.dicebear.com/7.x/pixel-art/svg?seed=John&eyes=variant01&clothing=variant01&hair=short01`;

  useEffect(() => {
    if (user?.username && !newUsername) {
      setNewUsername(user.username);
    }
    if (user?.avatar) {
      // Force reset if the avatar URL is using the old broken format
      if (user.avatar.includes('eyes=eyes1') || user.avatar.includes('seed=default')) {
        setPreviewAvatar(DEFAULT_AVATAR);
        updateProfile({ avatar: DEFAULT_AVATAR });
      } else {
        setPreviewAvatar(user.avatar);
      }
      
      if (user.avatar.startsWith('data:image')) {
        setMode('upload');
      } else {
        setMode('pixel');
      }
    } else {
      setPreviewAvatar(DEFAULT_AVATAR);
      updateProfile({ avatar: DEFAULT_AVATAR });
    }
  }, [user]);

  // Handle drawing on canvas
  const startDrawing = (e) => {
    isDrawing.current = true;
    draw(e);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const draw = (e) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);

    if (selectedColor === 'transparent') {
      ctx.clearRect(x - Math.floor(brushSize/2), y - Math.floor(brushSize/2), brushSize, brushSize);
    } else {
      ctx.fillStyle = selectedColor;
      ctx.fillRect(x - Math.floor(brushSize/2), y - Math.floor(brushSize/2), brushSize, brushSize);
    }
  };

  const loadAvatarToCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = previewAvatar;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.onerror = () => {
      console.error("Failed to load avatar base");
    };
  };

  useEffect(() => {
    if (showCustomizer) {
      setTimeout(loadAvatarToCanvas, 300);
    }
  }, [showCustomizer, previewAvatar]);

  if (!user) return null;

  const getPixelUrl = (s, options) => {
    const params = new URLSearchParams();
    params.append('seed', s || 'John');
    
    if (options.eyes) params.append('eyes', options.eyes);
    if (options.clothing) params.append('clothing', options.clothing);
    if (options.hair) params.append('hair', options.hair);
    
    return `https://api.dicebear.com/7.x/pixel-art/svg?${params.toString()}`;
  };

  const handleSeedChange = (newSeed) => {
    setMode('pixel');
    const newUrl = getPixelUrl(newSeed, customOptions);
    setPreviewAvatar(newUrl);
  };

  const handleOptionChange = (key, val) => {
    const newOptions = { ...customOptions, [key]: val };
    setCustomOptions(newOptions);
    const newUrl = getPixelUrl(seed || 'John', newOptions);
    setPreviewAvatar(newUrl);
  };

  const applyCanvasChanges = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setPreviewAvatar(dataUrl);
    setMode('upload'); // Treating painted image as a custom upload
    updateProfile({ avatar: dataUrl });
    setShowCustomizer(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreviewAvatar(result);
        updateProfile({ avatar: result });
        setMode('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setLoading(true);
    updateProfile({ avatar: previewAvatar, username: newUsername });
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12 border-b border-cyan/10 pb-6">
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Identidad Corporativa</h1>
          <div className="h-1 flex-1 bg-gradient-to-r from-cyan/50 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Avatar View */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group">
              <div className="aspect-square bg-secondary/20 border-2 border-cyan/20 overflow-hidden box-glow-cyan-subtle rounded-xl p-4 flex items-center justify-center">
                <img 
                  src={previewAvatar || DEFAULT_AVATAR} 
                  alt="Avatar" 
                  className="w-full h-full object-contain pixelated"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-4 right-4 p-3 bg-cyan text-background rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Camera size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-black tracking-[0.2em] text-cyan uppercase">Mantenimiento de Avatar:</h3>
              
              <div className="grid grid-cols-1 gap-3">
                {/* Pixel Art Option - Simplified */}
                <div 
                  onClick={() => setShowCustomizer(true)}
                  className={`p-8 border-2 cursor-pointer group transition-all ${mode === 'pixel' ? 'border-cyan bg-cyan/5 shadow-[0_0_20px_rgba(0,243,255,0.1)]' : 'border-white/5 bg-secondary/10 opacity-60 hover:opacity-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Palette className={`group-hover:rotate-12 transition-transform ${mode === 'pixel' ? 'text-cyan' : 'text-white/40'}`} size={28} />
                      <div className="text-left">
                        <span className="block text-sm font-bold text-white tracking-widest uppercase">Personalizar Pixel Art</span>
                        <span className="text-[10px] text-white/30 italic">Entrar al Studio de Pintura 8-Bit</span>
                      </div>
                    </div>
                    <Sliders className="text-cyan group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                {/* Upload Option */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 border-2 cursor-pointer transition-all ${mode === 'upload' ? 'border-cyan bg-cyan/5 shadow-[0_0_20px_rgba(0,243,255,0.1)]' : 'border-white/5 bg-secondary/10 opacity-60 hover:opacity-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <Upload className={mode === 'upload' ? 'text-cyan' : 'text-white/40'} />
                    <span className="text-sm font-bold text-white tracking-widest uppercase">2. Añadir tu propia foto</span>
                  </div>
                  <p className="text-[10px] text-white/30 mt-2 italic">Sube cualquier imagen desde tu dispositivo.</p>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-secondary/20 border border-white/5 p-10 space-y-10 rounded-2xl backdrop-blur-md">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-6 bg-cyan" />
                  <h3 className="text-xl font-bold tracking-tight text-white uppercase italic">Datos de la Cuenta</h3>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-white/40 font-black uppercase">Nombre de Usuario</label>
                    <input 
                      type="text" 
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full p-4 bg-background/50 border border-white/5 rounded-lg font-mono text-white/90 focus:outline-none focus:border-cyan transition-colors"
                      placeholder="Escribe tu nuevo nombre..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-white/40 font-black uppercase">Email de Acceso</label>
                    <div className="p-4 bg-background/50 border border-white/5 rounded-lg font-mono text-white/90 truncate">
                      {user.email}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 py-4 bg-cyan text-background text-sm font-black tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center gap-3 rounded-lg disabled:opacity-50 uppercase"
                >
                  <Save size={18} />
                  {loading ? 'GUARDANDO...' : 'Guardar Cambios'}
                </button>
                
                <button 
                  onClick={() => logout()}
                  className="px-8 py-4 border-2 border-red-500/20 text-red-400 text-sm font-black tracking-[0.2em] hover:bg-red-500/10 transition-all flex items-center gap-3 rounded-lg uppercase"
                >
                  <LogOut size={18} />
                  Salir
                </button>
              </div>

              {success && (
                <div className="text-center">
                  <p className="text-xs font-black text-cyan tracking-widest animate-pulse">SISTEMA ACTUALIZADO_</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customizer Modal */}
      {showCustomizer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/95 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="bg-secondary/95 border-2 border-cyan/30 max-w-4xl w-full my-auto flex flex-col shadow-[0_0_80px_rgba(0,243,255,0.2)] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-cyan/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sliders className="text-cyan" size={20} />
                <h2 className="text-xl font-black tracking-widest text-white uppercase italic">Studio_Pintura_8Bit</h2>
              </div>
              <button 
                onClick={() => setShowCustomizer(false)}
                className="p-2 hover:bg-white/10 text-white/60 hover:text-white transition-all rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="relative aspect-square bg-background border-4 border-cyan/20 box-glow-cyan-subtle cursor-crosshair overflow-hidden group">
                  <canvas
                    ref={canvasRef}
                    width={32}
                    height={32}
                    className="w-full h-full pixelated"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div className="absolute top-2 left-2 bg-background/80 border border-cyan/40 px-2 py-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MousePointer2 size={12} className="text-cyan" />
                    <span className="text-[8px] text-white uppercase font-bold">Pintar sobre base humana</span>
                  </div>
                </div>

                <div className="space-y-6 bg-background/40 p-4 border border-white/5 rounded-xl">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-cyan/60 uppercase tracking-widest flex items-center gap-2">
                      <Palette size={12} /> Paleta de Colores
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PALETTE.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 border-2 transition-all hover:scale-110 ${selectedColor === color ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <button 
                        onClick={() => setSelectedColor('transparent')}
                        className={`w-8 h-8 border-2 bg-background flex items-center justify-center ${selectedColor === 'transparent' ? 'border-white' : 'border-white/10'}`}
                      >
                        <Eraser size={16} className="text-white/40" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-cyan/60 uppercase tracking-widest flex items-center gap-2">
                        <Sliders size={12} /> Grosor del Pincel
                      </label>
                      <span className="text-[10px] font-mono text-cyan">{brushSize}px</span>
                    </div>
                    <input 
                      type="range" min="1" max="8" step="1"
                      value={brushSize}
                      onChange={(e) => setBrushSize(parseInt(e.target.value))}
                      className="w-full accent-cyan h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-background/40 p-6 border border-white/5 space-y-6 rounded-xl">
                  <h4 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-4">Rasgos Automáticos</h4>
                  {Object.entries(PIXEL_OPTIONS).map(([key, options]) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-[10px] tracking-[0.2em] text-cyan/60 uppercase font-black">{key}</label>
                      <select 
                        value={customOptions[key]}
                        onChange={(e) => handleOptionChange(key, e.target.value)}
                        className="w-full bg-background/60 border border-cyan/20 text-white text-xs px-3 py-3 focus:outline-none focus:border-cyan transition-all uppercase font-bold rounded"
                      >
                        <option value="">Aleatorio</option>
                        {options.map(opt => {
                          let label = opt.replace('variant', 'Var. ').replace('short', 'Corto ').replace('long', 'Largo ');
                          return <option key={opt} value={opt}>{label}</option>
                        })}
                      </select>
                    </div>
                  ))}
                  <button 
                    onClick={loadAvatarToCanvas}
                    className="w-full py-3 border border-cyan/40 text-cyan text-[10px] font-bold uppercase tracking-widest hover:bg-cyan/10 transition-all mt-4 rounded flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={12} />
                    Regenerar Base
                  </button>
                </div>

                <div className="pt-8 space-y-4">
                  <button 
                    onClick={applyCanvasChanges}
                    className="w-full py-5 bg-cyan text-background text-sm font-black tracking-[0.3em] hover:brightness-110 transition-all flex items-center justify-center gap-3 rounded-lg shadow-[0_0_30px_rgba(0,243,255,0.2)]"
                  >
                    <Check size={18} />
                    Finalizar_Diseño
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
