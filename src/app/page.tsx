'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Rocket, Code, Trophy, Zap, ChevronRight, CheckCircle2, 
  Users, Star, Globe, Shield, Smartphone, Terminal,
  MessageSquare, Github, Twitter, Instagram, Linkedin,
  Menu, X, ArrowRight, PlayCircle, Sparkles, Brain, 
  Cpu, MousePointer2, Layout
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollYSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-text selection:bg-accent/30">
      {/* Cinematic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-accent/10 blur-[150px] rounded-full opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,9,13,0)_0%,rgba(8,9,13,1)_100%)]" />
        </div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="glass-card flex items-center justify-between px-6 h-16 border-white/5 bg-background/40">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-accent/20">
                <span className="font-black text-white text-lg">L</span>
              </div>
              <span className="font-bold text-lg tracking-tighter uppercase font-display">Lumina</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <NavLink href="#features">Tecnología</NavLink>
              <NavLink href="#courses">Maestría</NavLink>
              <NavLink href="#pricing">Membresía</NavLink>
              <NavLink href="#showcase">Plataforma</NavLink>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden sm:block">
                <button className="px-4 py-2 text-xs font-black uppercase tracking-widest text-subtext hover:text-white transition-colors">Ingresar</button>
              </Link>
              <Link href="/register">
                <button className="btn-premium px-6 py-2.5 text-xs font-black uppercase tracking-widest">
                  Comenzar Ahora
                </button>
              </Link>
              <button className="md:hidden p-2 text-subtext" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden px-6"
            >
              <div className="glass-card p-6 flex flex-col gap-4 bg-background/90">
                <Link href="#features" className="text-sm font-bold uppercase tracking-widest">Tecnología</Link>
                <Link href="#courses" className="text-sm font-bold uppercase tracking-widest">Maestría</Link>
                <Link href="#pricing" className="text-sm font-bold uppercase tracking-widest">Membresía</Link>
                <Link href="#showcase" className="text-sm font-bold uppercase tracking-widest">Plataforma</Link>
                <div className="h-px bg-white/5 my-2" />
                <Link href="/register" className="btn-premium w-full py-4 text-xs font-black uppercase tracking-widest">Comenzar</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-48 pb-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles size={12} className="animate-pulse" />
                <span>Ecosistema de Maestría Tecnológica</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black font-display tracking-tight leading-[0.9] text-gradient">
                Domina el código <br />
                <span className="italic">como un arte.</span>
              </h1>

              <p className="text-xl text-subtext max-w-lg leading-relaxed font-medium">
                Desbloquea las habilidades tecnológicas más demandadas a través de una experiencia inmersiva y una interfaz cinematográfica. Diseñado para la élite del desarrollo.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link href="/register" className="w-full sm:w-auto">
                  <button className="btn-premium w-full sm:w-auto px-10 py-5 text-sm font-black uppercase tracking-widest group">
                    Iniciar Trayectoria
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </button>
                </Link>
                <button 
                  onClick={() => {
                    const featuresSection = document.getElementById('features');
                    featuresSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-10 py-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <PlayCircle size={18} className="text-accent" />
                  Explorar Plataforma
                </button>
              </div>

              <div className="pt-12 flex flex-col gap-6">
                <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Utilizado por líderes en</p>
                <div className="flex flex-wrap gap-8 opacity-30 grayscale invert dark:invert-0">
                  <Github size={24} />
                  <span className="text-xl font-bold tracking-tighter uppercase">Microsoft</span>
                  <span className="text-xl font-black italic tracking-tighter">Google</span>
                  <span className="text-xl font-bold">Amazon</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Mockup Right */}
            <motion.div
              id="showcase"
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block perspective-1000"
            >
              <div className="absolute -inset-10 bg-accent/20 blur-[100px] rounded-full opacity-30" />
              <div className="relative glass-card border-white/10 p-4 rotate-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-surface/80">
                <div className="flex items-center gap-2 mb-4 px-2">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-danger/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-warning/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-success/50" />
                   </div>
                   <div className="ml-4 h-5 w-48 bg-white/5 rounded-md" />
                </div>
                <div className="space-y-4">
                   <div className="h-64 w-full bg-background rounded-xl border border-white/5 p-6 font-mono text-sm text-accent/80">
                      <p><span className="text-secondary">class</span> Developer:</p>
                      <p className="ml-4 mt-2">def <span className="text-warning">learn</span>(self):</p>
                      <p className="ml-8 text-text/40 italic"># La maestría es un juego</p>
                      <p className="ml-8 mt-1">self.xp += <span className="text-success">100</span></p>
                      <p className="ml-8">self.level_up()</p>
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      <div className="h-20 rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col justify-between">
                         <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center"><Zap size={14} className="text-accent" /></div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-accent" />
                         </div>
                      </div>
                      <div className="h-20 rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col justify-between">
                         <div className="w-6 h-6 rounded-lg bg-warning/20 flex items-center justify-center"><Star size={14} className="text-warning" /></div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-4/5 bg-warning" />
                         </div>
                      </div>
                      <div className="h-20 rounded-xl bg-white/5 border border-white/5 p-3 flex flex-col justify-between">
                         <div className="w-6 h-6 rounded-lg bg-secondary/20 flex items-center justify-center"><Trophy size={14} className="text-secondary" /></div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-secondary" />
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass-card p-4 border-accent/20 bg-accent/10 backdrop-blur-2xl"
              >
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/50">
                      <Zap size={20} className="text-white fill-white" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-accent">Racha</p>
                      <p className="text-lg font-black italic">14 DÍAS</p>
                   </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Strip */}
        <section id="courses" className="py-20 relative border-y border-white/5 bg-surface/30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatItem value="1.2M+" label="Estudiantes Activos" />
            <StatItem value="150+" label="Cursos Premium" />
            <StatItem value="98%" label="Satisfacción" />
            <StatItem value="24/7" label="Soporte IA" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-40 px-6 relative">
          <div className="max-w-7xl mx-auto space-y-24">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight uppercase italic text-gradient">Diseñado para el Rendimiento</h2>
              <p className="text-subtext text-xl font-medium">Experimenta la forma más rápida de aprender programación, diseñado con la precisión de Linear y la simplicidad de Raycast.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Terminal size={24} />}
                title="Editor Monaco"
                description="Un entorno de codificación profesional en tu navegador. Resaltado de sintaxis, autocompletado y ejecución en tiempo real."
                delay={0.1}
              />
              <FeatureCard 
                icon={<Brain size={24} />}
                title="IA Cognitiva"
                description="Nuestro tutor de IA propietario proporciona pistas conscientes del contexto y explica conceptos complejos como un mentor senior."
                delay={0.2}
              />
              <FeatureCard 
                icon={<Cpu size={24} />}
                title="Ejecución en el Edge"
                description="Tu código se ejecuta en nuestro clúster de sandbox de alto rendimiento. Sin configuración, resultados instantáos, máxima seguridad."
                delay={0.3}
              />
              <FeatureCard 
                icon={<Layout size={24} />}
                title="UX Cinematográfica"
                description="Dopamina visual en cada paso. Seguimiento del progreso que se siente como avanzar en un videojuego de alto presupuesto."
                delay={0.4}
              />
              <FeatureCard 
                icon={<Smartphone size={24} />}
                title="Primero Móvil"
                description="Aprende en el tren, en el parque o en la cama. Sincronización perfecta en todas tus superficies digitales."
                delay={0.5}
              />
              <FeatureCard 
                icon={<Shield size={24} />}
                title="Trayectorias Verificadas"
                description="Completa proyectos estándares de la industria y obtén certificados que realmente significan algo para los reclutadores."
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <section id="pricing" className="py-40 px-6">
           <div className="max-w-5xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-secondary rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative glass-card bg-surface/90 p-12 md:p-24 rounded-[40px] text-center space-y-10 border-white/10">
                 <h2 className="text-5xl md:text-7xl font-black font-display tracking-tighter leading-none text-gradient uppercase italic">
                    ¿Listo para dominar <br/> tu futuro?
                 </h2>
                 <p className="text-xl text-subtext max-w-xl mx-auto font-medium leading-relaxed">
                    Únete a miles de desarrolladores que construyen la próxima generación de tecnología. Comienza tu viaje hoy.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/register" className="w-full sm:w-auto">
                       <button className="btn-premium w-full sm:w-auto px-12 py-6 text-base font-black uppercase tracking-widest">
                          Comenzar Ahora
                       </button>
                    </Link>
                    <button className="w-full sm:w-auto px-12 py-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-base font-black uppercase tracking-widest">
                       Contactar Ventas
                    </button>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 px-6">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
            <div className="col-span-2 space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center shadow-lg shadow-accent/20">
                    <span className="font-black text-white text-lg">L</span>
                  </div>
                  <span className="font-bold text-lg tracking-tighter uppercase font-display">Lumina</span>
               </div>
               <p className="text-subtext max-w-xs font-medium">El futuro de la educación técnica. Premium, cinematográfico y efectivo.</p>
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-subtext hover:text-accent transition-colors cursor-pointer"><Twitter size={18} /></div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-subtext hover:text-accent transition-colors cursor-pointer"><Github size={18} /></div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-subtext hover:text-accent transition-colors cursor-pointer"><Linkedin size={18} /></div>
               </div>
            </div>
            <FooterCol title="Producto" links={[
              { label: "Cursos", href: "#courses" },
              { label: "Trayectorias", href: "/dashboard/courses" },
              { label: "Membresía", href: "#pricing" },
              { label: "Empresas", href: "#" }
            ]} />
            <FooterCol title="Compañía" links={[
              { label: "Sobre Nosotros", href: "#" },
              { label: "Carreras", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Noticias", href: "#" }
            ]} />
            <FooterCol title="Recursos" links={[
              { label: "Docs", href: "#" },
              { label: "API", href: "#" },
              { label: "Estado", href: "#" },
              { label: "Términos", href: "#" }
            ]} />
         </div>
         <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-muted uppercase tracking-widest">© 2026 Lumina Learning. Todos los derechos reservados.</p>
            <div className="flex gap-8">
               <p className="text-xs font-bold text-muted uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Privacidad</p>
               <p className="text-xs font-bold text-muted uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Seguridad</p>
            </div>
         </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="px-4 py-2 text-xs font-black uppercase tracking-widest text-subtext hover:text-white transition-all relative group">
      {children}
      <span className="absolute bottom-0 left-4 right-4 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </Link>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="text-center space-y-2">
      <h3 className="text-4xl md:text-5xl font-black font-display italic text-gradient tracking-tighter leading-none">{value}</h3>
      <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">{label}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-8 border-white/5 bg-surface/50 hover:bg-surface/80 hover:border-accent/30 transition-all duration-500 group"
    >
      <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-accent/5">
        {icon}
      </div>
      <h4 className="text-xl font-black font-display uppercase tracking-tight mb-3 italic">{title}</h4>
      <p className="text-subtext font-medium leading-relaxed">{description}</p>
    </motion.div>
  );
}

function FooterCol({ title, links }: { title: string, links: { label: string, href: string }[] }) {
  return (
    <div className="space-y-6">
      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white">{title}</h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm font-medium text-subtext hover:text-accent transition-colors">{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
