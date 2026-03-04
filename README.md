# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
Also  the command prompte : 
First one :
```
Crée une webapp moderne pour une agence fictive de voyage temporel appelée "TimeTravel Agency".

STACK TECHNIQUE :
- React (Vite ou Next.js compatible Vercel)
- Tailwind CSS
- Framer Motion pour animations
- Structure propre et prête pour déploiement Vercel

OBJECTIF :
Créer une landing page immersive avec 3 destinations temporelles et un chatbot IA.

STYLE :
- Design premium, élégant, dark mode
- Accents dorés (#D4AF37)
- Atmosphère luxe / science-fiction raffinée
- Typographie moderne et lisible
- Animations subtiles (durée 0.6–0.8s, easing natural)
- Responsive mobile-first

STRUCTURE :

1) HEADER
- Logo "TimeTravel Agency"
- Navigation : Destinations | Recommandation | Chat | Contact
- Bouton CTA "Réserver un voyage"

2) HERO SECTION
- Background image immersive (placeholder si nécessaire)
- Titre principal :
  "Voyagez à travers le temps avec élégance"
- Sous-titre immersif
- Bouton CTA vers les destinations
- Animation fade-in progressive

3) SECTION DESTINATIONS
Créer 3 cards interactives avec hover effects :

A) Paris 1889
- Belle Époque
- Tour Eiffel
- Exposition Universelle
- Prix indicatif : 4 900€

B) Crétacé (-65M)
- Dinosaures
- Nature préhistorique
- Expédition sécurisée
- Prix indicatif : 9 900€

C) Florence 1504
- Renaissance
- Michel-Ange
- Art et architecture
- Prix indicatif : 5 900€

Chaque card doit inclure :
- Image (placeholder)
- Description courte
- Bouton "Découvrir"
- Animation hover (scale léger + shadow glow doré)

4) SECTION RECOMMANDATION (QUIZ INTERACTIF)

Créer un quiz en 4 questions :

Q1 : Type d’expérience ?
- Culture artistique
- Aventure nature
- Élégance raffinée

Q2 : Période préférée ?
- XIXe siècle
- Temps anciens
- Renaissance

Q3 : Environnement préféré ?
- Ville animée
- Nature sauvage
- Architecture et musées

Q4 : Activité idéale ?
- Visiter monuments
- Observer faune
- Explorer musées

Implémenter une logique simple de scoring en React.
Afficher dynamiquement la destination recommandée avec une explication personnalisée.

5) CHATBOT IA (UI seulement + hook API prêt)

Créer un widget chatbot en bas à droite :
- Icône flottante
- Fenêtre modale au clic
- Thème sombre cohérent
- Placeholder : "Posez-moi vos questions sur les voyages temporels..."
- Champ input + bouton envoyer
- Historique de conversation

6) FOOTER
- Mention pédagogique
- Stack utilisée
- Copyright

ANIMATIONS :
- Fade-in au scroll (Framer Motion)
- Micro-interactions sur boutons
- Transitions fluides
- Pas d’animations excessives

BONNES PRATIQUES :
- Code structuré par composants
- Dossier components/
- Dossier sections/
- Code clair et commenté
- Optimisé pour Vercel
- Pas de dépendances inutiles

IMPORTANT :
Génère un projet complet prêt à lancer avec :
- package.json
- Instructions pour npm install
- npm run dev
- npm run build
- Compatible déploiement Vercel en 1 clic

Ne fais pas de backend complexe.
Garde le projet simple, propre et fonctionnel.
```
Second one : 
```
Il manque des images ou alors il y en a qui  fonctionne pas, et pour le chat bot tu peux faire des questions responses prédéfinie pour l'utilisateur et l bot, mais fait en sorte que l'on puisse Enchainer au moins 3 questions pour chaque utilisateur.
```