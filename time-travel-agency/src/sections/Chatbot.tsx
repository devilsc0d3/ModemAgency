import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Clock } from 'lucide-react';

type Message = {
    id: string;
    sender: 'user' | 'ai';
    text: string;
};

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'ai',
            text: 'Bienvenue. Notre service de conciergerie temporelle est à votre écoute pour toute requête.'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Fake API Hook Simulation
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: 'Une excellente interrogation. Nos experts en paradoxes temporels analysent votre demande. Pour une discrétion absolue, nos conseillers sont disponibles sur rendez-vous privé.'
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1500); // Slower, more deliberate AI response
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-8 right-8 w-14 h-14 bg-surface border border-white/10 text-gold flex items-center justify-center shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-50 transition-colors duration-300 hover:border-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] cursor-pointer"
                        aria-label="Ouvrir le service de conciergerie"
                    >
                        <Clock size={22} className="opacity-80" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-28 right-8 w-[350px] sm:w-[420px] h-[580px] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col z-50 overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-transparent">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-surface border border-white/5 flex items-center justify-center">
                                    <span className="font-serif text-lg text-gold">T</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-serif tracking-wide text-lg">Conciergerie</h3>
                                    <span className="text-xs text-textMuted tracking-wider uppercase flex items-center gap-2 mt-0.5 font-light">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block animate-pulse"></span>
                                        Connecté
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-textMuted hover:text-white transition-colors duration-300 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 pb-2 space-y-6 bg-transparent max-h-[420px]">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-5 py-4 text-sm font-light leading-relaxed border ${message.sender === 'user'
                                                ? 'bg-surface border-white/5 text-white'
                                                : 'bg-[#0a0a0a] text-textMuted border-white/5'
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} className="h-4" />
                        </div>

                        <div className="p-5 bg-transparent border-t border-white/5 mt-auto">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Écrivez votre message..."
                                    className="w-full bg-surface border border-white/10 text-white font-light text-sm p-4 pr-14 focus:outline-none focus:border-gold/50 transition-colors duration-300 placeholder:text-textMuted/50"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    className="absolute right-3 top-0 bottom-0 h-10 w-10 my-auto text-gold flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:text-gold-hover transition-colors duration-300 cursor-pointer"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
