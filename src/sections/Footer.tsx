export function Footer() {
    return (
        <footer id="contact" className="bg-background border-t border-surfaceBorder/30 py-20 px-6 md:px-12 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-between text-center">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-full bg-surface border border-gold/30 flex items-center justify-center">
                        <span className="text-gold font-bold text-xl font-serif">T</span>
                    </div>
                    <span className="text-2xl font-serif text-white tracking-widest uppercase">TimeTravel</span>
                </div>

                <p className="text-textMuted text-sm font-light max-w-2xl mx-auto mb-16 leading-loose">
                    Avertissement éducatif : "TimeTravel Agency" est un chef-d'œuvre expérimental créé dans le cadre de la définition d'un design system de luxe (UI/UX Pro Max). L'artisanat numérique au service du voyage interdimensionnel.
                </p>

                <div className="flex gap-6 mb-16 text-xs font-mono text-gold/60">
                    <span className="tracking-widest uppercase">React (Vite)</span>
                    <span className="opacity-30">|</span>
                    <span className="tracking-widest uppercase">Tailwind CSS</span>
                    <span className="opacity-30">|</span>
                    <span className="tracking-widest uppercase">Framer Motion</span>
                    <span className="opacity-30">|</span>
                    <span className="tracking-widest uppercase">Lucide</span>
                </div>

                <div className="text-textMuted/40 text-xs font-light tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} TimeTravel Agency. L'élégance à travers les âges.
                </div>
            </div>
        </footer>
    );
}
