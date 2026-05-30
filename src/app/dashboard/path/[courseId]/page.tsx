'use client';

import { useParams, useRouter } from 'next/navigation';
import { COURSES } from '@/data/courses';
import { useUserStore } from '@/lib/store';
import LearningMap from '@/components/features/LearningMap';
import { ChevronLeft, Trophy, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CoursePathPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const { completedLessons, xp, level } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const course = COURSES.find(c => c.id === courseId);

  if (!mounted) return null;
  if (!course) {
    router.push('/dashboard');
    return null;
  }

  const courseLessonsIds = course.lessons.map(l => l.id);
  const completedInCourse = completedLessons.filter(id => courseLessonsIds.includes(id)).length;
  const progress = Math.round((completedInCourse / course.lessons.length) * 100);

  const courseColor = course.color === 'accent' ? '#7C3AED' : 
                     course.color === 'secondary' ? '#06B6D4' : 
                     course.color === 'success' ? '#10B981' : '#F59E0B';

  return (
    <div className="min-h-screen pb-20">
      {/* Header Fijo/Sticky */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border mb-8">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-card rounded-xl transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="font-bold text-lg leading-none">{course.title}</h1>
              <p className="text-xs text-subtext mt-1">{progress}% completado</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-warning/10 text-warning px-3 py-1 rounded-full text-sm font-bold border border-warning/20">
              <Star size={16} fill="currentColor" />
              {xp}
            </div>
            <div className="flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-bold border border-accent/20">
              <Zap size={16} fill="currentColor" />
              Lvl {level}
            </div>
          </div>
        </div>
        
        {/* Barra de progreso superior */}
        <div className="w-full h-1.5 bg-card">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full"
            style={{ background: courseColor }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* Intro Card */}
        <div className="glass-card p-6 mb-12 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
             <Trophy size={120} />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-2">¡Tu Camino al Éxito!</h2>
            <p className="text-subtext max-w-md">
              Sigue la ruta, completa los desafíos y domina {course.title}. 
              Cada nodo es un paso más hacia tu nueva carrera.
            </p>
          </div>
        </div>

        {/* El Mapa */}
        <LearningMap 
          lessons={course.lessons} 
          completedLessons={completedLessons} 
          courseColor={courseColor}
        />

        {/* Final del camino */}
        <div className="mt-20 flex flex-col items-center text-center pb-20">
          <div className="w-24 h-24 rounded-full bg-card border-4 border-dashed border-border flex items-center justify-center mb-6">
            <Trophy size={48} className="text-border" />
          </div>
          <h3 className="text-xl font-bold text-subtext">Meta Final</h3>
          <p className="text-sm text-subtext/60 mt-2">Completa todas las lecciones para obtener tu certificado.</p>
        </div>
      </div>
    </div>
  );
}
