import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
            {/* Background Image / Placeholder */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-[#0a0a0a] z-10 mix-blend-multiply" />
                <img
                    src="/images/hero_time_travel_luxury_1772610477286.png"
                    alt="Space Time Continuum"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
                <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="text-gold tracking-[0.2em] text-sm md:text-md uppercase mb-6 block"
                >
                    L'ultime frontière du luxe
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="text-5xl md:text-8xl font-serif text-textMain mb-8 leading-[1.1]"
                >
                    Voyagez à travers<br />
                    <span className="italic text-gold">le Temps.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                    className="text-lg md:text-xl text-textMuted mb-12 max-w-2xl text-center leading-relaxed font-light"
                >
                    Découvrez les époques les plus fascinantes de l'histoire humaine. Une expérience temporelle premium, sécurisée et inoubliable pour les voyageurs les plus exigeants.
                </motion.p>

                <motion.a
                    href="#destinations"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                    className="inline-flex items-center justify-center border border-gold/50 text-gold px-10 py-4 font-medium tracking-widest uppercase text-sm hover:bg-gold hover:text-[#0a0a0a] hover:border-gold transition-all duration-500 cursor-pointer"
                >
                    Découvrir nos collections
                </motion.a>
            </div>
        </section>
    );
}
