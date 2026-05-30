'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare, X, Send, Sparkles } from 'lucide-react';

export default function TutorIA() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: '¡Hola! Soy tu Tutor IA. ¿Necesitas una pista o que te explique algún concepto?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulación de respuesta de IA
    setTimeout(() => {
      let aiResponse = "Estoy analizando tu pregunta... Por ahora puedo decirte que revises bien la explicación de la lección.";
      
      if (input.toLowerCase().includes('pista')) {
        aiResponse = "Aquí tienes una pista: Fíjate bien en las opciones que mencionan la sintaxis oficial que vimos hace un momento.";
      } else if (input.toLowerCase().includes('hola')) {
        aiResponse = "¡Hola de nuevo! Estoy aquí para ayudarte con cualquier duda sobre el curso.";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Botón Flotante */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 w-16 h-16 rounded-full premium-gradient text-white shadow-2xl shadow-accent/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        <Bot size={28} />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold">1</span>
      </button>

      {/* Ventana de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-28 left-8 w-[350px] h-[500px] glass-card shadow-2xl z-50 flex flex-col overflow-hidden border-accent/20"
          >
            {/* Header */}
            <div className="p-4 premium-gradient flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Tutor IA</h4>
                  <p className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                    En línea ahora
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-accent text-white rounded-tr-none' 
                      : 'bg-card border border-border rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu duda aquí..."
                  className="w-full bg-background border border-border rounded-xl py-3 pl-4 pr-12 text-sm outline-none focus:border-accent transition-all"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                 <button 
                  onClick={() => { 
                    const msg = '¿Me das una pista?';
                    setMessages(prev => [...prev, { role: 'user', content: msg }]);
                    setTimeout(() => {
                      setMessages(prev => [...prev, { role: 'ai', content: "Aquí tienes una pista: Fíjate bien en las opciones que mencionan la sintaxis oficial que vimos hace un momento." }]);
                    }, 1000);
                  }}
                  className="text-[10px] px-2 py-1 rounded-full border border-border hover:border-accent hover:text-accent transition-all flex items-center gap-1"
                 >
                   <Sparkles size={10} /> Dame una pista
                 </button>
                 <button 
                  onClick={() => { 
                    const msg = 'Explícame esto de nuevo';
                    setMessages(prev => [...prev, { role: 'user', content: msg }]);
                    setTimeout(() => {
                      setMessages(prev => [...prev, { role: 'ai', content: "¡Claro! El concepto principal aquí es la estructura de control. Imagina que es como un semáforo..." }]);
                    }, 1000);
                  }}
                  className="text-[10px] px-2 py-1 rounded-full border border-border hover:border-accent hover:text-accent transition-all flex items-center gap-1"
                 >
                   <MessageSquare size={10} /> Explicación
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
