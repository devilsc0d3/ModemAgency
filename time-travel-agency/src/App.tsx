import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Destinations } from './sections/Destinations';
import { Recommendation } from './sections/Recommendation';
import { Chatbot } from './sections/Chatbot';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <Recommendation />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
