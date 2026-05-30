'use client';

import { useState, use, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store';
import { useToastStore } from '@/lib/toast-store';
import { useSoundStore } from '@/lib/sound-store';
import { 
  Check, X, ArrowRight, Lightbulb, Trophy, 
  Code, Loader2, Sparkles, Maximize2, Minimize2,
  Volume2, VolumeX, Moon, Sun, Monitor
} from 'lucide-react';
import { COURSES } from '@/data/courses';
import TutorIA from '@/components/features/TutorIA';
import Editor, { loader } from '@monaco-editor/react';

// Configuración del tema Raycast-inspired para Monaco
const setupMonacoTheme = (monaco: any) => {
  monaco.editor.defineTheme('raycast-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6272a4' },
      { token: 'keyword', foreground: 'BD93F9', fontStyle: 'bold' },
      { token: 'string', foreground: 'F1FA8C' },
      { token: 'number', foreground: 'BD93F9' },
      { token: 'function', foreground: '50FA7B' },
      { token: 'type', foreground: '8BE9FD', fontStyle: 'italic' },
      { token: 'variable', foreground: 'F8F8F2' },
    ],
    colors: {
      'editor.background': '#0F1117', // Match Surface color
      'editor.foreground': '#F9FAFB',
      'editorLineNumber.foreground': '#4B5563',
      'editorLineNumber.activeForeground': '#7C3AED',
      'editor.selectionBackground': '#7C3AED33',
      'editor.lineHighlightBackground': '#FFFFFF05',
      'editorCursor.foreground': '#7C3AED',
      'editorIndentGuide.background': '#FFFFFF08',
      'editorIndentGuide.activeBackground': '#7C3AED44',
    }
  });
};

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { addXP, completeLesson, settings } = useUserStore();
  const { addToast } = useToastStore();
  const { playSuccess, playError, playXp, playClick } = useSoundStore();
  const resolvedParams = use(params);
  const lessonId = resolvedParams.id;

  const [mounted, setMounted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [codeValue, setCodeValue] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [syntaxProgress, setSyntaxProgress] = useState(0);
  const [monacoLoaded, setMonacoLoaded] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);

  // Buscar la lección actual y su curso
  let currentCourse: any = null;
  let currentLessonIndex = -1;

  for (const course of COURSES) {
    const index = course.lessons.findIndex(l => l.id === lessonId);
    if (index !== -1) {
      currentCourse = course;
      currentLessonIndex = index;
      break;
    }
  }

  const lesson = currentCourse?.lessons[currentLessonIndex];

  // Configuración de temas por curso
  const getCourseTheme = () => {
    switch (currentCourse?.id) {
      case 'python': return { accent: 'success', glow: 'success/10' };
      case 'web': return { accent: 'secondary', glow: 'secondary/10' };
      default: return { accent: 'accent', glow: 'accent/10' };
    }
  };

  const theme = getCourseTheme();

  // Calcular progreso de la lección (posición actual / total)
  const currentProgress = currentCourse 
    ? Math.round(((currentLessonIndex + 1) / currentCourse.lessons.length) * 100) 
    : 0;

  // Sincronizar el código inicial cuando cambia la lección
  useEffect(() => {
    if (lesson?.type === 'code') {
      setCodeValue(lesson.initialCode || '');
      setSyntaxProgress(0);
    } else {
      setCodeValue('');
      setSyntaxProgress(0);
    }
    setSelectedOption(null);
    setIsCorrect(null);
    setShowResult(false);
  }, [lessonId, lesson?.type, lesson?.initialCode]);

  // Validador de sintaxis en tiempo real
  useEffect(() => {
    if (lesson?.type === 'code' && lesson.expectedOutput) {
      const cleanInput = codeValue
        .replace(/#.*$/gm, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s/g, '')
        .replace(/'/g, '"');

      const cleanExpected = lesson.expectedOutput
        .replace(/\s/g, '')
        .replace(/'/g, '"');

      // Calcular qué tan cerca está el usuario (porcentaje de coincidencia)
      let matches = 0;
      const minLength = Math.min(cleanInput.length, cleanExpected.length);
      
      if (cleanExpected.length > 0) {
        // Verificamos si el input contiene partes clave del expected
        if (cleanInput.includes(cleanExpected)) {
          matches = cleanExpected.length;
        } else {
          // Coincidencia parcial simple por caracteres
          for (let i = 0; i < minLength; i++) {
            if (cleanInput[i] === cleanExpected[i]) matches++;
            else break;
          }
        }
        
        const progress = Math.min(Math.round((matches / cleanExpected.length) * 100), 100);
        setSyntaxProgress(progress);
      }
    }
  }, [codeValue, lesson]);

  if (!mounted) return null;

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-2xl font-bold text-danger">Lección no encontrada</h2>
        <button onClick={() => router.push('/dashboard/courses')} className="text-accent hover:underline">
          Volver al catálogo
        </button>
      </div>
    );
  }

  const nextLesson = currentCourse.lessons[currentLessonIndex + 1];

  const handleNext = () => {
    if (nextLesson) {
      router.push(`/dashboard/lesson/${nextLesson.id}`);
    } else {
      router.push(`/dashboard/path/${currentCourse.id}`);
    }
  };

  const handleCheck = () => {
    let correct = false;
    
    if (lesson.type === 'code') {
      // Limpiar comentarios, espacios extra y normalizar comillas
      const cleanInput = codeValue
        .replace(/#.*$/gm, '') // Eliminar comentarios Python
        .replace(/\/\/.*/g, '') // Eliminar comentarios JS
        .replace(/<!--[\s\S]*?-->/g, '') // Eliminar comentarios HTML
        .replace(/\s/g, '') // Eliminar todos los espacios
        .replace(/'/g, '"'); // Normalizar comillas simples a dobles

      const cleanExpected = (lesson.expectedOutput || '')
        .replace(/\s/g, '')
        .replace(/'/g, '"');

      correct = cleanInput.includes(cleanExpected);
    } else {
      if (selectedOption === null) return;
      correct = selectedOption === lesson.correctIndex;
    }

    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      addXP(10);
      completeLesson(lesson.id);
      addToast('¡Lección completada!', 'xp', 10);
      playSuccess();
      setTimeout(playXp, 500);
      
      // Activar confetti solo si es correcto
      if (typeof window !== 'undefined') {
        const confetti = require('canvas-confetti');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7C3AED', '#06B6D4', '#10B981']
        });
      }
    } else {
      addToast('Respuesta incorrecta. ¡Vuelve a intentarlo!', 'warning');
      playError();
    }
  };

  const isButtonDisabled = lesson.type === 'quiz' 
    ? selectedOption === null 
    : codeValue.trim() === ''; // Habilitar si hay cualquier contenido

  return (
    <div className={`max-w-4xl mx-auto py-12 transition-all duration-700 ${isZenMode ? 'px-0' : 'space-y-12'}`}>
      {/* Zen Mode Background */}
      <AnimatePresence>
        {isZenMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center p-8"
          >
            <div className={`absolute top-0 left-0 w-full h-full bg-${theme.accent}/5 blur-[120px] -z-10`} />
            
            <div className="w-full max-w-3xl space-y-12">
               {/* Minimal Zen Header */}
               <div className="flex items-center justify-between mb-20">
                  <div className="flex items-center gap-4">
                     <div className={`w-2 h-2 rounded-full bg-${theme.accent} animate-pulse`} />
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted">Modo Zen Activo</span>
                  </div>
                  <button 
                    onClick={() => setIsZenMode(false)}
                    className="p-3 rounded-xl bg-white/5 text-muted hover:text-text hover:bg-white/10 transition-all"
                  >
                     <Minimize2 size={20} />
                  </button>
               </div>

               {/* Zen Content Placeholder */}
               <div id="zen-content-target" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Header */}
      {!isZenMode && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <button 
                onClick={() => router.back()}
                className="p-2 rounded-lg hover:bg-white/5 text-muted hover:text-text transition-all"
               >
                  <ArrowRight size={18} className="rotate-180" />
               </button>
               <div className="space-y-0.5">
                  <span className="text-[10px] font-black text-muted uppercase tracking-widest">{currentCourse?.title}</span>
                  <h3 className="text-sm font-bold text-text leading-none">{lesson.title}</h3>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <button 
                onClick={() => setIsZenMode(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-muted hover:text-text hover:border-accent/30 transition-all group"
               >
                  <Maximize2 size={14} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Zen</span>
               </button>
               <span className="text-xs font-black text-muted uppercase tracking-widest italic">{currentProgress}%</span>
            </div>
          </div>
          <div className="w-full bg-card h-1.5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: `${currentProgress}%` }}
              className={`h-full bg-${theme.accent}`}
            />
          </div>
        </div>
      )}

      {/* Question Section */}
      <motion.div 
        layout
        className={`space-y-8 relative ${isZenMode ? 'fixed inset-0 z-[101] flex flex-col items-center justify-center max-w-3xl mx-auto pointer-events-none' : ''}`}
      >
        <div className={`flex items-start justify-between gap-6 w-full ${isZenMode ? 'pointer-events-auto mb-8' : ''}`}>
          <h2 className={`font-black italic uppercase tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 ${isZenMode ? 'text-5xl text-center' : 'text-3xl'}`}>
            {lesson.question}
          </h2>
          {!isZenMode && lesson.type === 'code' && (
            <div className={`flex-shrink-0 p-3 rounded-2xl bg-${theme.accent}/10 border border-${theme.accent}/20 animate-pulse`}>
              <Sparkles className={`text-${theme.accent}`} size={24} />
            </div>
          )}
        </div>

        <div className={`w-full ${isZenMode ? 'pointer-events-auto' : ''}`}>
          {lesson.type === 'code' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${syntaxProgress === 100 ? 'bg-success animate-pulse' : syntaxProgress > 50 ? 'bg-warning' : 'bg-danger'}`} />
                    <span className="text-xs font-bold uppercase tracking-widest text-subtext">Sintaxis: {syntaxProgress}%</span>
                 </div>
                 {syntaxProgress > 0 && syntaxProgress < 100 && !isZenMode && (
                   <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`max-w-[400px] text-[10px] text-${theme.accent} font-bold bg-${theme.accent}/10 p-3 rounded-xl border border-${theme.accent}/20 space-y-2 shadow-xl backdrop-blur-md`}
                   >
                     <div className={`flex items-center gap-2 border-b border-${theme.accent}/20 pb-1`}>
                        <Lightbulb size={14} />
                        <span className="uppercase tracking-widest">Guía de ayuda</span>
                     </div>
                     <p>Parece que estás en el camino correcto. Revisa la indentación y el nombre de las variables.</p>
                   </motion.div>
                 )}
              </div>
              <div className="space-y-3 px-2">
                <p className="text-text/90 text-sm font-medium"><span className={`text-${theme.accent} mr-2`}>●</span> {lesson.hints?.what || 'Sigue escribiendo para completar el desafío.'}</p>
                {syntaxProgress > 30 && (
                  <p className="text-subtext text-xs italic font-medium"><span className={`text-${theme.accent} mr-2`}>●</span> {lesson.hints?.how}</p>
                )}
              </div>
              
              <div className="h-[300px] rounded-2xl overflow-hidden border-2 border-border bg-card relative group transition-all duration-500 hover:border-accent/50 shadow-2xl">
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/40 border border-border backdrop-blur-md text-[10px] font-bold text-text uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  <Code size={12} className={`text-${theme.accent}`} />
                  {lesson.language}
                </div>
                
                {!monacoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-surface/50 backdrop-blur-sm z-20">
                    <Loader2 className={`w-8 h-8 text-${theme.accent} animate-spin`} />
                  </div>
                )}

                <Editor
                  height="100%"
                  language={lesson.language}
                  theme="raycast-dark"
                  value={codeValue}
                  onChange={(value) => setCodeValue(value || '')}
                  onMount={(editor, monaco) => {
                    setupMonacoTheme(monaco);
                    setMonacoLoaded(true);
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    fontFamily: 'Geist Mono, monospace',
                    padding: { top: 24, bottom: 24 },
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    readOnly: showResult,
                    automaticLayout: true,
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    smoothScrolling: true,
                    contextmenu: false,
                    renderLineHighlight: 'all',
                    scrollbar: {
                      vertical: 'hidden',
                      horizontal: 'hidden'
                    }
                  }}
                />
                
                {/* Visual Syntax Feedback Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-card">
                   <motion.div 
                    className={`h-full ${syntaxProgress === 100 ? 'bg-success' : `bg-${theme.accent}`}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${syntaxProgress}%` }}
                   />
                </div>
              </div>
              <p className="text-xs text-subtext italic">Escribe tu respuesta en el editor de arriba.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {lesson.options?.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!showResult) {
                      setSelectedOption(index);
                      playClick();
                    }
                  }}
                  disabled={showResult}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all font-bold text-lg flex items-center justify-between group ${
                    selectedOption === index 
                      ? `border-${theme.accent} bg-${theme.accent}/10 text-${theme.accent} shadow-lg shadow-${theme.accent}/10` 
                      : 'border-border bg-card text-text hover:border-accent/30 hover:bg-card-hover'
                  } ${
                    showResult && index === lesson.correctIndex
                      ? 'border-success bg-success/10'
                      : ''
                  } ${
                    showResult && selectedOption === index && index !== lesson.correctIndex
                      ? 'border-danger bg-danger/10'
                      : ''
                  }`}
                >
                  <span>{option}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedOption === index ? `border-${theme.accent} bg-${theme.accent}` : 'border-border'
                  }`}>
                    {showResult && index === lesson.correctIndex ? (
                      <Check size={14} className="text-white" strokeWidth={4} />
                    ) : showResult && selectedOption === index && index !== lesson.correctIndex ? (
                      <X size={14} className="text-white" strokeWidth={4} />
                    ) : selectedOption === index && (
                      <Check size={14} className="text-white" strokeWidth={4} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Footer / Feedback */}
      <div className="h-32">
        <AnimatePresence>
          {!showResult ? (
            <motion.div 
              exit={{ opacity: 0 }}
              className="flex justify-end"
            >
              <button
                onClick={handleCheck}
                disabled={isButtonDisabled}
                className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all ${
                  !isButtonDisabled 
                    ? 'premium-gradient text-white shadow-lg shadow-accent/20' 
                    : 'bg-card text-subtext cursor-not-allowed border border-border'
                }`}
              >
                Comprobar
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl border-t-4 flex items-center justify-between ${
                isCorrect ? 'bg-success/10 border-success' : 'bg-danger/10 border-danger'
              }`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isCorrect ? 'bg-success/20' : 'bg-danger/20'
                }`}>
                  {isCorrect ? <Trophy className="text-success" size={32} /> : <Lightbulb className="text-danger" size={32} />}
                </div>
                <div>
                  <h4 className={`text-xl font-bold ${isCorrect ? 'text-success' : 'text-danger'}`}>
                    {isCorrect ? '¡Excelente trabajo!' : 'No exactamente'}
                  </h4>
                  <p className="text-subtext text-sm max-w-md mt-1">{lesson.explanation}</p>
                </div>
              </div>
              <button
                onClick={handleNext}
                className={`px-8 py-4 rounded-xl font-bold flex items-center gap-2 ${
                  isCorrect ? 'bg-success text-white' : 'bg-danger text-white'
                }`}
              >
                {nextLesson ? 'Siguiente Lección' : 'Finalizar'}
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <TutorIA />
    </div>
  );
}
