import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Clock, RotateCcw } from 'lucide-react';

type Message = {
    id: string;
    sender: 'user' | 'ai';
    text: string;
};

type QA = {
    q: string;
    a: string;
    next?: QA[];
};

const PREDEFINED_QA: QA[] = [
    {
        q: "Quelles sont vos destinations ?",
        a: "Nous proposons l'Exposition Universelle de Paris en 1889, l'ère du Crétacé il y a 65 millions d'années, et Florence sous la Renaissance en 1504.",
        next: [
            {
                q: "Dites-m'en plus sur Paris 1889.",
                a: "L'Exposition Universelle s'offre à vous. Assistez à l'inauguration de la Tour Eiffel avec une tenue d'époque fidèlement cousue sur-mesure pour vous.",
                next: [
                    {
                        q: "Combien de temps dure le voyage ?",
                        a: "Une immersion classique dure 3 jours et 2 nuits, bien que le temps écoulé de retour dans votre présent ne soit que d'une microseconde."
                    },
                    {
                        q: "Puis-je rencontrer Gustave Eiffel ?",
                        a: "Les garanties diplomatiques de l'Agence nous permettent d'arranger un entretien privé au sommet de la Tour sous certaines conditions très exclusives."
                    }
                ]
            },
            {
                q: "Le Crétacé n'est-il pas trop dangereux ?",
                a: "Rassurez-vous, nos bulles temporelles de classe VII sont impénétrables. Vous observerez les T-Rex en totale impunité depuis un promontoire furtif.",
                next: [
                    {
                        q: "Risque-t-on l'effet papillon ?",
                        a: "Nos algorithmes d'annulation causale rendent toute interaction physique sans conséquence historique. Mathématiquement, vous étiez censé y aller."
                    },
                    {
                        q: "Y a-t-il des guides spécialisés ?",
                        a: "Bien sûr, un paléontologue assermenté par l'Agence vous accompagnera."
                    }
                ]
            },
            {
                q: "Puis-je voir Léonard de Vinci ?",
                a: "Oui. Nos passe-droits auprès des Médicis vous garantissent une audience privée très discrète dans son atelier florentin.",
                next: [
                    {
                        q: "Pourrai-je acquérir des croquis ?",
                        a: "Tout achat ou vol technologique à travers le temps est formellement interdit par les traités temporels internationaux."
                    },
                    {
                        q: "Comment communiquer en italien du 16ème ?",
                        a: "Une puce de traduction simultanée, amovible et invisible, vous est fournie avant votre saut."
                    }
                ]
            }
        ]
    },
    {
        q: "Comment garantissez-vous la sécurité ?",
        a: "Nos capsules emploient la technologie de confinement quantique. Votre sécurité biologique et l'intégrité de la chronologie absolue priment sur tout.",
        next: [
            {
                q: "Qu'est-ce que le confinement quantique ?",
                a: "Un champ d'énergie paradoxal qui empêche toute altération matérielle sur votre organisme tout au long de la timeline visitée.",
                next: [
                    {
                        q: "Est-ce douloureux au départ ?",
                        a: "Vous ne ressentirez qu'un frisson fugace teinté d'une légère senteur d'ozone."
                    },
                    {
                        q: "Et en cas de panne de l'appareil ?",
                        a: "Trois systèmes de rappel automatique par superposition vous rapatrient instantanément vers votre point de départ originel."
                    }
                ]
            },
            {
                q: "Avez-vous déjà perdu des voyageurs ?",
                a: "L'Agence affiche un taux de retour de 100% sur les dix dernières années d'exploitation. Se rendre dans l'espace n'a jamais été aussi sûr.",
                next: [
                    {
                        q: "Qui gère l'Agence, l'État ?",
                        a: "L'Agence TimeTravel est un consortium indépendant sous mandat des Nations Unies Temporelles (NUT)."
                    },
                    {
                        q: "Serais-je couvert par une assurance ?",
                        a: "Une couverture universelle multi-chronologique inclut la restitution absolue de votre génome de départ."
                    }
                ]
            }
        ]
    },
    {
        q: "Quels sont vos tarifs ?",
        a: "L'excellence a un prix. Nos collections débutent à 4 900€ pour une immersion classique, jusqu'à des centaines de milliers pour du sur-mesure.",
        next: [
            {
                q: "Que comprend le pack à 4 900€ ?",
                a: "Le saut temporel, les tenues authentiques certifiées par l'historique, l'assurance temporelle standard et l'installation anonyme.",
                next: [
                    {
                        q: "Puis-je voyager avec ma famille ?",
                        a: "Oui, les modules familiaux accueillent jusqu'à 5 passagers. Idéal pour marquer une génération."
                    },
                    {
                        q: "Combien pour le voyage de luxe ?",
                        a: "Au-delà de 20 000€, vous bénéficiez de notre intégration VIP dans les hautes sphères politiques de l'époque choisie."
                    }
                ]
            },
            {
                q: "Acceptez-vous les crypto-monnaies ?",
                a: "Nous acceptons les devises actuelles, l'or véritable, le Bitcoin (via notre réserve de 2012) et certaines devises futures de 2085.",
                next: [
                    {
                        q: "Acceptez-vous des paiements en antiquités ?",
                        a: "Le paiement par objets d'art ramenés du passé engendre un paradoxe bancaire. Nous les déclinons systématiquement."
                    },
                    {
                        q: "Est-il possible de régler en plusieurs fois ?",
                        a: "Nous exigeons un paiement intégral avant la phase de synchronisation. Nous ne plaisantons pas avec la dette temporelle."
                    }
                ]
            }
        ]
    }
];

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'ai',
            text: 'Bienvenue. Notre service de conciergerie temporelle est à votre écoute pour toute requête.'
        }
    ]);
    const [currentOptions, setCurrentOptions] = useState<QA[] | undefined>(PREDEFINED_QA);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isTyping, setIsTyping] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setCurrentOptions(undefined); // Reset options when typing manually

        setIsTyping(true);
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: 'Une excellente interrogation. Nos experts en paradoxes temporels analysent votre demande. Pour une discrétion absolue, nos conseillers sont disponibles sur rendez-vous privé.'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
            // Fallback options available after manual typing
            setTimeout(() => setCurrentOptions(PREDEFINED_QA), 500);
        }, 1500);
    };

    const handlePredefinedClick = (qa: QA) => {
        setCurrentOptions(undefined); // Hide options during "thinking"

        const userMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: qa.q
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: qa.a
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);

            // Load next level of questions or fallback to start after interaction ends
            if (qa.next && qa.next.length > 0) {
                setTimeout(() => setCurrentOptions(qa.next), 300);
            }
        }, 1200); // 1.2s delay for luxury feeling
    };

    const handleResetOptions = () => {
        setCurrentOptions(PREDEFINED_QA);
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

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="px-5 py-4 text-sm font-light leading-relaxed border bg-[#0a0a0a] text-textMuted border-white/5 flex gap-1.5 items-center">
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }} className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-4" />
                        </div>

                        {/* Predefined Questions */}
                        <AnimatePresence>
                            {currentOptions && currentOptions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="px-5 pb-3 flex flex-wrap gap-2"
                                >
                                    {currentOptions.map((qa, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePredefinedClick(qa)}
                                            className="text-xs text-textMuted border border-white/10 rounded-full px-3 py-1.5 hover:text-gold hover:border-gold/30 transition-colors duration-300 font-light cursor-pointer bg-surface/50 text-left"
                                        >
                                            {qa.q}
                                        </button>
                                    ))}

                                    {/* Restart dialog button if we are deep in a tree */}
                                    {currentOptions !== PREDEFINED_QA && (
                                        <button
                                            onClick={handleResetOptions}
                                            className="text-xs text-gold/60 hover:text-gold border border-gold/10 hover:border-gold/30 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-300 cursor-pointer"
                                            title="Retour aux questions principales"
                                        >
                                            <RotateCcw size={14} />
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-5 bg-transparent border-t border-white/5 mt-auto">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Écrivez votre message..."
                                    className="w-full bg-surface border border-white/10 text-white font-light text-sm p-4 pr-14 focus:outline-none focus:border-gold/50 transition-colors duration-300 placeholder:text-textMuted/50"
                                    disabled={isTyping}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isTyping}
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
