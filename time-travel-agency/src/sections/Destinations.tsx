import { motion } from 'framer-motion';

const destinations = [
    {
        id: 'paris-1889',
        title: 'Paris 1889',
        subtitle: 'La Belle Époque',
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop',
        description: 'Vivez l\'Exposition Universelle, l\'inauguration de la Tour Eiffel et le faste parisien dans son âge d\'or.',
        price: 'À partir de 4 900€'
    },
    {
        id: 'cretace',
        title: 'Le Crétacé',
        subtitle: 'Il y a 65 Millions d\'années',
        image: 'https://images.unsplash.com/photo-1518381534279-4d6402eddc38?q=80&w=1200&auto=format&fit=crop',
        description: 'Une expédition ultra-sécurisée au cœur de la nature préhistorique pour observer les plus grands prédateurs.',
        price: 'À partir de 9 900€'
    },
    {
        id: 'florence-1504',
        title: 'Florence 1504',
        subtitle: 'La Renaissance',
        image: 'https://images.unsplash.com/photo-1543343339-e4d0263f7dc5?q=80&w=1200&auto=format&fit=crop',
        description: 'Une immersion privée dans l\'art et l\'architecture aux côtés de Michel-Ange et de Léonard de Vinci.',
        price: 'À partir de 5 900€'
    }
];

export function Destinations() {
    return (
        <section id="destinations" className="py-32 px-6 md:px-12 bg-background relative border-t border-surfaceBorder/30">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20 md:mb-28"
                >
                    <span className="text-gold tracking-[0.2em] text-xs uppercase mb-4 block font-medium">Collections Temporelles</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-textMain mb-6">Destinations Exclusives</h2>
                    <p className="text-textMuted max-w-2xl mx-auto font-light text-lg">Des voyages soigneusement orchestrés pour vous offrir l'essence absolue de chaque époque.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-surface mb-6 ring-1 ring-white/5 transition-all duration-500 group-hover:ring-gold/30">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                                <img
                                    src={dest.image}
                                    alt={dest.title}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20">
                                    <span className="text-gold text-xs font-medium tracking-[0.15em] uppercase block mb-2">{dest.subtitle}</span>
                                    <h3 className="text-3xl font-serif text-white">{dest.title}</h3>
                                </div>
                            </div>

                            <div className="px-2">
                                <p className="text-textMuted text-sm mb-6 leading-relaxed font-light">{dest.description}</p>
                                <div className="flex items-center justify-between border-t border-surfaceBorder/50 pt-4">
                                    <span className="text-sm font-medium tracking-wide text-textMain">{dest.price}</span>
                                    <span className="text-xs font-medium tracking-widest uppercase text-gold group-hover:text-gold-hover transition-colors duration-300">
                                        Découvrir
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
