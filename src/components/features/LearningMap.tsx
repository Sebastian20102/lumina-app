'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Check, Lock, Play, Star, Sparkles, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Lesson } from '@/data/courses';
import { useRef } from 'react';

interface LearningMapProps {
  lessons: Lesson[];
  completedLessons: string[];
  courseColor: string;
}

export default function LearningMap({ lessons, completedLessons, courseColor }: LearningMapProps) {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} className="relative py-24 flex flex-col items-center">
      {/* Cinematic Path Line */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-20"
        style={{ maxWidth: '400px' }}
      >
        <motion.path
          d={generatePathD(lessons.length)}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1 12"
          className="text-muted"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      <div className="space-y-24 w-full max-w-md relative">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isNext = index === 0 || completedLessons.includes(lessons[index - 1]?.id);
          const isLocked = !isCompleted && !isNext;
          
          // Zigzag horizontal offset
          const xOffset = Math.sin(index * 1.5) * 100;

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ x: xOffset }}
              className="flex flex-col items-center"
            >
              <div className="relative group">
                {/* Floating Title Tooltip */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-surface/90 border border-white/5 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-20 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full bg-${isLocked ? 'muted' : 'accent'} animate-pulse`} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted">{lesson.type}</p>
                  </div>
                  <p className="text-sm font-black italic uppercase tracking-tight">{lesson.title}</p>
                </div>

                {/* Node Button */}
                <Link
                  href={isLocked ? '#' : `/dashboard/lesson/${lesson.id}`}
                  className={`
                    relative w-24 h-24 rounded-[32px] flex items-center justify-center transition-all duration-500
                    ${isCompleted ? 'bg-accent shadow-[0_0_30px_rgba(124,58,237,0.4)] rotate-3' : 
                      isNext ? 'bg-surface border-4 border-accent animate-bounce-slow shadow-2xl -rotate-3 scale-110' : 
                      'bg-surface/50 border-2 border-white/5 grayscale opacity-50'}
                    hover:scale-110 active:scale-95 group-hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]
                  `}
                  style={isNext && !isCompleted ? { borderColor: courseColor } : {}}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  {/* Inner Glow */}
                  {isNext && !isCompleted && (
                    <div className="absolute inset-0 rounded-[28px] bg-accent/20 blur-xl animate-pulse" />
                  )}

                  {isCompleted ? (
                    <Check className="text-white" size={36} strokeWidth={4} />
                  ) : isLocked ? (
                    <Lock className="text-muted" size={28} />
                  ) : (
                    <Play className="text-accent fill-accent ml-1" size={36} style={{ color: courseColor, fill: courseColor }} />
                  )}

                  {/* Level Marker Badge */}
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-2xl bg-surface border border-white/10 flex items-center justify-center text-xs font-black italic shadow-xl group-hover:border-accent transition-colors">
                    {index + 1}
                  </div>

                  {/* Achievement indicator */}
                  {(index + 1) % 5 === 0 && (
                    <div className="absolute -top-4 -right-4">
                       <div className="relative">
                          <Trophy className="text-warning fill-warning animate-pulse" size={24} />
                          <div className="absolute inset-0 bg-warning/20 blur-lg rounded-full" />
                       </div>
                    </div>
                  )}
                </Link>

                {/* Particle effects for active node */}
                {isNext && !isCompleted && (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 pointer-events-none"
                  >
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-1 h-1 bg-accent rounded-full"
                        style={{ 
                          top: `${Math.random() * 100}%`, 
                          left: `${Math.random() * 100}%`,
                          opacity: Math.random() 
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function generatePathD(count: number) {
  let d = "M 200 0";
  for (let i = 0; i < count; i++) {
    const y = i * 192 + 96; // Adjusted for space-y-24 (96px) + height (96px)
    const x = 200 + Math.sin(i * 1.5) * 100;
    d += ` L ${x} ${y}`;
  }
  return d;
}

