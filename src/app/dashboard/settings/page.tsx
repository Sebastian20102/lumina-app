'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useUserStore, getAvatarUrl } from '@/lib/store';
import { 
  User, Bell, Shield, Moon, 
  Palette, Save, RefreshCw, ChevronRight,
  Sparkles, Glasses, UserCircle, Shirt,
  Volume2, Monitor, Lock, Eye, EyeOff
} from 'lucide-react';
import { useToastStore } from '@/lib/toast-store';

type SettingsTab = 'profile' | 'notifications' | 'privacy' | 'appearance';

export default function SettingsPage() {
  const { 
    avatarConfig, 
    settings, 
    username, 
    email, 
    bio, 
    updateSettings, 
    updateProfile
  } = useUserStore();
  const { addToast } = useToastStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  
  // Local states for unsaved changes
  const [localSettings, setLocalSettings] = useState(settings);
  const [localProfile, setLocalProfile] = useState({ username, email, bio });

  const handleSave = () => {
    if (activeTab === 'profile') {
      updateProfile(localProfile);
    } else {
      updateSettings(activeTab as any, localSettings[activeTab as keyof typeof settings]);
    }
    
    // Aplicar cambios visuales inmediatos si es apariencia
    if (activeTab === 'appearance') {
      const root = window.document.documentElement;
      const theme = localSettings.appearance.theme;
      root.classList.remove('light', 'dark');
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    }

    addToast('Configuración guardada correctamente', 'success');
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setLocalProfile({ username, email, bio });
    addToast('Cambios descartados', 'info');
  };

  const handleChangePassword = () => {
    addToast('Funcionalidad de cambio de contraseña en desarrollo', 'info');
  };

  const avatarUrl = getAvatarUrl(avatarConfig);

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <div className="space-y-2">
        <h2 className="text-4xl font-black italic tracking-tighter">CONFIGURACIÓN</h2>
        <p className="text-subtext">Personaliza tu experiencia y tu identidad digital.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          <SettingsNavButton 
            icon={<UserCircle size={20} />} 
            label="Perfil y Avatar" 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          />
          <SettingsNavButton 
            icon={<Bell size={20} />} 
            label="Notificaciones" 
            active={activeTab === 'notifications'} 
            onClick={() => setActiveTab('notifications')}
          />
          <SettingsNavButton 
            icon={<Shield size={20} />} 
            label="Privacidad y Seguridad" 
            active={activeTab === 'privacy'} 
            onClick={() => setActiveTab('privacy')}
          />
          <SettingsNavButton 
            icon={<Palette size={20} />} 
            label="Apariencia" 
            active={activeTab === 'appearance'} 
            onClick={() => setActiveTab('appearance')}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Avatar Redirect Section */}
                <div className="glass-card p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] -z-10 group-hover:bg-accent/20 transition-all" />
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-accent to-secondary rounded-full blur opacity-25" />
                      <div className="relative w-32 h-32 rounded-full border-4 border-accent p-1 bg-card overflow-hidden">
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left space-y-4">
                      <h3 className="text-2xl font-black italic tracking-tighter uppercase">Tu Identidad Visual</h3>
                      <p className="text-sm text-subtext font-medium leading-relaxed max-w-md">
                        Personaliza cada detalle de tu avatar, desde el peinado hasta los accesorios legendarios.
                      </p>
                      <Link href="/dashboard/customize">
                        <button className="px-6 py-3 rounded-xl bg-accent text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-accent/20 hover:scale-105 transition-all flex items-center gap-2 mx-auto md:mx-0">
                          <Palette size={16} /> Ir al Personalizador
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 space-y-6">
                  <h3 className="text-2xl font-bold">Información de la Cuenta</h3>
                  <div className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-subtext ml-1">Nombre de Usuario</label>
                          <input 
                            type="text" 
                            value={localProfile.username} 
                            onChange={(e) => setLocalProfile({...localProfile, username: e.target.value})}
                            className="w-full bg-card border border-border rounded-xl px-4 py-3 focus:border-accent outline-none transition-all font-bold text-text" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-subtext ml-1">Email</label>
                          <input 
                            type="email" 
                            value={localProfile.email} 
                            onChange={(e) => setLocalProfile({...localProfile, email: e.target.value})}
                            className="w-full bg-card border border-border rounded-xl px-4 py-3 focus:border-accent outline-none transition-all font-bold text-text" 
                          />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-subtext ml-1">Biografía</label>
                        <textarea 
                          rows={3} 
                          value={localProfile.bio} 
                          onChange={(e) => setLocalProfile({...localProfile, bio: e.target.value})}
                          className="w-full bg-card border border-border rounded-xl px-4 py-3 focus:border-accent outline-none transition-all font-bold resize-none text-text" 
                        />
                     </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-8 space-y-8"
              >
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Bell className="text-accent" />
                  Preferencias de Notificación
                </h3>
                <div className="space-y-6">
                  <ToggleSetting 
                    label="Recordatorios de estudio" 
                    description="Recibe una notificación cuando sea hora de practicar."
                    enabled={localSettings.notifications.reminders}
                    onChange={(v) => setLocalSettings({...localSettings, notifications: {...localSettings.notifications, reminders: v}})}
                  />
                  <ToggleSetting 
                    label="Nuevos Logros" 
                    description="Te avisaremos cuando desbloquees un nuevo trofeo."
                    enabled={localSettings.notifications.achievements}
                    onChange={(v) => setLocalSettings({...localSettings, notifications: {...localSettings.notifications, achievements: v}})}
                  />
                  <ToggleSetting 
                    label="Actualizaciones de Ranking" 
                    description="Notificaciones cuando alguien te supere en la liga."
                    enabled={localSettings.notifications.ranking}
                    onChange={(v) => setLocalSettings({...localSettings, notifications: {...localSettings.notifications, ranking: v}})}
                  />
                  <ToggleSetting 
                    label="Novedades y Marketing" 
                    description="Nuevos cursos, funciones y ofertas especiales."
                    enabled={localSettings.notifications.marketing}
                    onChange={(v) => setLocalSettings({...localSettings, notifications: {...localSettings.notifications, marketing: v}})}
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'privacy' && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-8 space-y-8"
              >
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Shield className="text-accent" />
                  Privacidad y Seguridad
                </h3>
                <div className="space-y-6">
                  <ToggleSetting 
                    label="Perfil Público" 
                    description="Permite que otros usuarios vean tus estadísticas y logros."
                    enabled={localSettings.privacy.publicProfile}
                    onChange={(v) => setLocalSettings({...localSettings, privacy: {...localSettings.privacy, publicProfile: v}})}
                  />
                  <ToggleSetting 
                    label="Mostrar Racha" 
                    description="Tu racha actual será visible en el leaderboard."
                    enabled={localSettings.privacy.showStreak}
                    onChange={(v) => setLocalSettings({...localSettings, privacy: {...localSettings.privacy, showStreak: v}})}
                  />
                  <ToggleSetting 
                    label="Mostrar Nivel" 
                    description="Tu nivel actual aparecerá junto a tu nombre."
                    enabled={localSettings.privacy.showLevel}
                    onChange={(v) => setLocalSettings({...localSettings, privacy: {...localSettings.privacy, showLevel: v}})}
                  />
                  
                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <h4 className="font-bold text-lg">Seguridad</h4>
                    <button 
                      onClick={handleChangePassword}
                      className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Lock size={18} className="text-subtext group-hover:text-accent" />
                        <span className="font-medium">Cambiar Contraseña</span>
                      </div>
                      <ChevronRight size={18} className="text-subtext" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-8 space-y-8"
              >
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Palette className="text-accent" />
                  Apariencia y Experiencia
                </h3>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-subtext ml-1 flex items-center gap-2">
                      <Monitor size={14} /> Tema del Sistema
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['light', 'dark', 'system'].map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            const newAppearance = {...localSettings.appearance, theme: t as any};
                            setLocalSettings({...localSettings, appearance: newAppearance});
                            // Aplicar cambio visual inmediato
                            const root = window.document.documentElement;
                            root.classList.remove('light', 'dark');
                            if (t === 'system') {
                              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                              root.classList.add(systemTheme);
                            } else {
                              root.classList.add(t);
                            }
                          }}
                          className={`py-3 rounded-xl border-2 transition-all font-bold capitalize ${
                            localSettings.appearance.theme === t 
                            ? 'border-accent bg-accent/10 text-accent' 
                            : 'border-border bg-card text-subtext hover:border-accent/30'
                          }`}
                        >
                          {t === 'light' ? 'Claro' : t === 'dark' ? 'Oscuro' : 'Sistema'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <ToggleSetting 
                    label="Efectos de Sonido" 
                    description="Sonidos al completar lecciones, errores y clics."
                    enabled={localSettings.appearance.sounds}
                    icon={<Volume2 size={18} />}
                    onChange={(v) => setLocalSettings({...localSettings, appearance: {...localSettings.appearance, sounds: v}})}
                  />
                  
                  <ToggleSetting 
                    label="Animaciones Fluidas" 
                    description="Transiciones y efectos visuales en la interfaz."
                    enabled={localSettings.appearance.animations}
                    icon={<Sparkles size={18} />}
                    onChange={(v) => setLocalSettings({...localSettings, appearance: {...localSettings.appearance, animations: v}})}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
             <button 
              onClick={handleReset}
              className="px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm text-subtext hover:text-white transition-colors"
             >
                Restablecer
             </button>
             <button 
              onClick={handleSave}
              className="px-10 py-4 rounded-2xl bg-accent text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
             >
                <Save size={18} /> Guardar Cambios
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsNavButton({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
        active 
          ? 'bg-accent text-white shadow-xl shadow-accent/20 translate-x-2' 
          : 'text-subtext hover:bg-white/5 hover:text-text'
      }`}
    >
      <div className={`${active ? 'text-white' : 'text-subtext'}`}>
        {icon}
      </div>
      <span className="text-sm tracking-tight">{label}</span>
      {active && (
        <motion.div 
          layoutId="activeTab"
          className="ml-auto"
        >
          <ChevronRight size={16} />
        </motion.div>
      )}
    </button>
  );
}

function ToggleSetting({ label, description, enabled, onChange, icon }: { label: string, description: string, enabled: boolean, onChange: (v: boolean) => void, icon?: any }) {
  return (
    <div className="flex items-center justify-between gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
      <div className="space-y-1 flex-1">
        <div className="flex items-center gap-2">
          {icon && <span className="text-accent">{icon}</span>}
          <h4 className="font-bold text-text group-hover:text-accent transition-colors">{label}</h4>
        </div>
        <p className="text-xs text-subtext leading-relaxed">{description}</p>
      </div>
      <button 
        onClick={() => onChange(!enabled)}
        className={`relative w-14 h-8 rounded-full transition-all duration-300 flex items-center px-1 ${
          enabled ? 'bg-accent shadow-lg shadow-accent/20' : 'bg-card border border-border'
        }`}
      >
        <motion.div 
          animate={{ x: enabled ? 24 : 0 }}
          className={`w-6 h-6 rounded-full shadow-md ${enabled ? 'bg-white' : 'bg-subtext'}`} 
        />
      </button>
    </div>
  );
}
