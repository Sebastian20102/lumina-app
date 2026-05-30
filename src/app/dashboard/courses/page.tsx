'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Book, Code, Database, Brain, ArrowRight, Sparkles, Trophy, Star } from 'lucide-react';
import Link from 'next/link';
import { COURSES } from '@/data/courses';
import { useUserStore } from '@/lib/store';
import { useEffect, useState, useRef, useMemo } from 'react';

export default function CoursesPage() {
  const { completedLessons } = useUserStore();
  const targetRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Ajustamos el scroll horizontal basado en la cantidad de cursos + la tarjeta extra
  const totalItems = COURSES.length + 1;
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", `-${(totalItems - 1) * 25}%`]);

  const getIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'code': return <Code className={`text-${color}`} size={32} />;
      case 'book': return <Book className={`text-${color}`} size={32} />;
      case 'database': return <Database className={`text-${color}`} size={32} />;
      case 'brain': return <Brain className={`text-${color}`} size={32} />;
      default: return <Code className={`text-${color}`} size={32} />;
    }
  };

  const getCourseProgress = (courseId: string) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return 0;
    const courseLessonsIds = course.lessons.map(l => l.id);
    const completedInCourse = completedLessons.filter(id => courseLessonsIds.includes(id)).length;
    return Math.round((completedInCourse / course.lessonsCount) * 100);
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      {/* Intro Section */}
      <div className="max-w-6xl mx-auto space-y-4 mb-20 px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <Sparkles size={12} />
          <span>Exploración de Conocimiento</span>
        </motion.div>
        <h2 className="text-6xl font-black italic tracking-tighter uppercase text-gradient">Catálogo de Cursos</h2>
        <p className="text-subtext text-xl font-medium max-w-2xl">
          Elige tu camino y comienza a construir tu futuro hoy mismo en el ecosistema de Lumina.
        </p>
      </div>

      {/* Horizontal Scroll Section - Trae.ai style */}
      <section ref={targetRef} className="relative h-[400vh] -mx-8">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-8">
            {COURSES.map((course, index) => {
              const progress = getCourseProgress(course.id);
              const isCompleted = progress === 100;

              return (
                <motion.div
                  key={course.id}
                  className="w-[480px] shrink-0 glass-card p-10 group hover:border-accent/40 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-[600px]"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-${course.color}/5 blur-[100px] -z-10 group-hover:bg-${course.color}/10 transition-colors`} />
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-20 h-20 rounded-3xl bg-card border border-border flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                        {getIcon(course.icon, course.color)}
                      </div>
                      {progress > 0 && (
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${isCompleted ? 'bg-success/20 text-success' : 'bg-accent/20 text-accent'}`}>
                          {isCompleted ? 'COMPLETADO' : `${progress}% DOMINADO`}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-4xl font-black italic uppercase tracking-tighter">{course.title}</h3>
                      <p className="text-subtext text-lg leading-relaxed font-medium line-clamp-3">
                        {course.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-8 pt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-black">Lecciones</span>
                        <span className="text-2xl font-black italic">{course.lessonsCount}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-black">XP Total</span>
                        <span className="text-2xl font-black italic text-accent">{course.xpTotal}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {progress > 0 && (
                      <div className="w-full bg-card h-2 rounded-full overflow-hidden mt-6 p-0.5 border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={`h-full rounded-full bg-${course.color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
                        />
                      </div>
                    )}
                  </div>

                  <Link href={`/dashboard/path/${course.id}`} className="mt-10">
                    <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-xl active:scale-95">
                      {progress > 0 ? 'Continuar Ascenso' : 'Iniciar Trayectoria'}
                      <ArrowRight size={18} />
                    </button>
                  </Link>
                </motion.div>
              );
            })}

            {/* Final "Explore More" Card */}
            <motion.div className="w-[480px] shrink-0 glass-card p-10 flex flex-col items-center justify-center text-center space-y-8 border-dashed border-2 border-white/10 bg-white/[0.02] h-[600px]">
               <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-muted">
                  <Sparkles size={48} />
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">Próximamente</h3>
                  <p className="text-subtext font-medium text-lg">Estamos preparando nuevas trayectorias para potenciar tu maestría.</p>
               </div>
               <button className="px-8 py-4 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                  Sugerir un Curso
               </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer info section to allow scrolling after the carousel */}
      <div className="max-w-6xl mx-auto py-32 space-y-12 px-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoBlock 
              title="Certificación" 
              description="Obtén certificados digitales al completar cada trayectoria para validar tu maestría." 
              icon={<Trophy size={24} className="text-warning" />}
            />
            <InfoBlock 
              title="Práctica Real" 
              description="Aprende con desafíos de código reales y proyectos prácticos desde el primer día." 
              icon={<Code size={24} className="text-accent" />}
            />
            <InfoBlock 
              title="Comunidad" 
              description="Únete a miles de desarrolladores y comparte tu progreso en el ranking global." 
              icon={<Star size={24} className="text-secondary" />}
            />
         </div>
      </div>
    </div>
  );
}

function InfoBlock({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="glass-card p-8 space-y-4 border-white/5 hover:border-white/10 transition-all">
       <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
          {icon}
       </div>
       <h4 className="text-xl font-bold uppercase italic tracking-tight">{title}</h4>
       <p className="text-subtext text-sm font-medium leading-relaxed">{description}</p>
    </div>
  );
}
