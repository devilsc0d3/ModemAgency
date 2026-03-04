import { motion } from 'framer-motion';

export function Header() {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0a0a0a]/50 backdrop-blur-xl border-b border-white/5"
        >
            <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                    <span className="text-[#0a0a0a] font-bold text-2xl font-serif">T</span>
                </div>
                <span className="text-xl font-serif text-textMain tracking-widest font-medium uppercase">TimeTravel</span>
            </div>

            <nav className="hidden md:flex items-center gap-10">
                <a href="#destinations" className="text-sm tracking-widest uppercase font-medium text-textMuted hover:text-gold transition-colors duration-300">Destinations</a>
                <a href="#recommandation" className="text-sm tracking-widest uppercase font-medium text-textMuted hover:text-gold transition-colors duration-300">Recommandation</a>
                <a href="#chat" className="text-sm tracking-widest uppercase font-medium text-textMuted hover:text-gold transition-colors duration-300">Assistant</a>
            </nav>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-gold text-[#0a0a0a] px-8 py-3 rounded-none font-medium text-sm tracking-widest uppercase hover:bg-gold-hover transition-colors duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer"
            >
                Réserver
            </motion.button>
        </motion.header>
    );
}
