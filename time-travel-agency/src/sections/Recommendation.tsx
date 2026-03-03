import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

type Question = {
    question: string;
    options: { label: string; score: Record<string, number> }[];
};

const questions: Question[] = [
    {
        question: "Quelle atmosphère recherchez-vous pour votre prochain voyage ?",
        options: [
            { label: "L'effervescence artistique et culturelle", score: { florence: 3, paris: 1, cretace: 0 } },
            { label: "L'immensité de la nature originelle", score: { cretace: 3, paris: 0, florence: 0 } },
            { label: "Le raffinement et la modernité naissante", score: { paris: 3, florence: 1, cretace: 0 } }
        ]
    },
    {
        question: "Si vous deviez ramener un souvenir, quel serait-il ?",
        options: [
            { label: "Une photographie d'une merveille architecturale", score: { paris: 3, florence: 0, cretace: 0 } },
            { label: "L'observation d'une espèce disparue", score: { cretace: 3, florence: 1, paris: 0 } },
            { label: "Un croquis d'un maître absolu", score: { florence: 3, paris: 0, cretace: 0 } }
        ]
    },
    {
        question: "Quel est votre rythme de voyage idéal ?",
        options: [
            { label: "Urbain, mondain et élégant", score: { paris: 3, florence: 1, cretace: 0 } },
            { label: "Aventureux, secret et préservé", score: { cretace: 3, paris: 0, florence: 0 } },
            { label: "Contemplatif, historique et inspirant", score: { florence: 3, paris: 1, cretace: 0 } }
        ]
    }
];

const resultsData = {
    paris: { title: "Paris 1889", desc: "La Belle Époque et l'élégance parisienne correspondent parfaitement à votre profil raffiné. Une immersion au cœur de l'avant-garde." },
    cretace: { title: "Le Crétacé", desc: "Votre soif d'aventure sera comblée par l'exploration de la nature sauvage préhistorique, le privilège d'un monde vierge." },
    florence: { title: "Florence 1504", desc: "Votre amour de l'art et de la beauté trouvera son apogée en pleine Renaissance italienne, au carrefour du génie humain." },
};

export function Recommendation() {
    const [currentStep, setCurrentStep] = useState(0);
    const [scores, setScores] = useState({ paris: 0, cretace: 0, florence: 0 });
    const [result, setResult] = useState<keyof typeof resultsData | null>(null);

    const handleSelect = (optionScore: Record<string, number>) => {
        const newScores = {
            paris: scores.paris + (optionScore.paris || 0),
            cretace: scores.cretace + (optionScore.cretace || 0),
            florence: scores.florence + (optionScore.florence || 0),
        };

        setScores(newScores);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setTimeout(() => {
                const winner = Object.keys(newScores).reduce((a, b) =>
                    newScores[a as keyof typeof newScores] > newScores[b as keyof typeof newScores] ? a : b
                ) as keyof typeof resultsData;
                setResult(winner);
            }, 500); // Slight delay for elegance
        }
    };

    const resetQuiz = () => {
        setCurrentStep(0);
        setScores({ paris: 0, cretace: 0, florence: 0 });
        setResult(null);
    };

    return (
        <section id="recommandation" className="py-32 px-6 md:px-12 bg-[#0a0a0a] border-t border-surfaceBorder/30">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold tracking-[0.2em] text-xs uppercase mb-4 block font-medium">Service de Conciergerie</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-textMain mb-4">Votre Collection Idéale</h2>
                    <p className="text-textMuted font-light">Laissez nos algorithmes de conciergerie abstraite révéler votre destination temporelle parfaite.</p>
                </div>

                <div className="bg-surface/50 border border-white/5 p-10 md:p-16 min-h-[500px] flex flex-col justify-center relative shadow-2xl">
                    <AnimatePresence mode="wait">
                        {!result ? (
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full max-w-2xl mx-auto"
                            >
                                <div className="text-xs font-medium text-gold/60 mb-6 tracking-[0.2em] uppercase">ÉTAPE {currentStep + 1} SUR {questions.length}</div>
                                <h3 className="text-3xl md:text-4xl font-serif text-textMain mb-12 leading-snug">{questions[currentStep].question}</h3>

                                <div className="space-y-4">
                                    {questions[currentStep].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelect(option.score)}
                                            className="group w-full text-left p-6 border border-white/5 bg-[#0a0a0a]/30 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 text-textMuted hover:text-white flex items-center justify-between cursor-pointer"
                                        >
                                            <span className="font-light tracking-wide text-sm md:text-base">{option.label}</span>
                                            <ArrowRight size={18} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-4 group-hover:translate-x-0" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-center max-w-2xl mx-auto"
                            >
                                <div className="w-16 h-16 bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                                    <Sparkles size={24} className="text-gold" />
                                </div>
                                <h3 className="text-sm tracking-[0.2em] uppercase font-medium text-gold/80 mb-4">Destination Recommandée</h3>
                                <div className="text-5xl md:text-6xl font-serif text-white mb-8">{resultsData[result].title}</div>
                                <p className="text-textMuted mb-12 max-w-lg mx-auto leading-relaxed font-light text-lg">{resultsData[result].desc}</p>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                    <button className="bg-gold text-[#0a0a0a] px-10 py-4 font-medium tracking-widest uppercase text-sm hover:bg-gold-hover transition-colors duration-300 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                        Réserver l'expérience
                                    </button>
                                    <button onClick={resetQuiz} className="text-textMuted font-light tracking-widest text-sm uppercase hover:text-white transition-colors duration-300 border-b border-transparent hover:border-white/30 pb-1 cursor-pointer">
                                        Reprendre l'analyse
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
