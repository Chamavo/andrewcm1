import { motion } from "framer-motion";
import { Pencil, Calculator, Brain, Sparkles } from "lucide-react";
import FloatingBubbles from "@/components/FloatingBubbles";
import WelcomeHeader from "@/components/WelcomeHeader";
import ModuleButton from "@/components/ModuleButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f5f7fa] to-[#e4ecff]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <FloatingBubbles />

      <main className="relative z-10 container py-10 px-4 max-w-6xl mx-auto flex flex-col items-center">
        <section className="w-full flex flex-col items-center text-center">
          <WelcomeHeader />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="w-full max-w-2xl mb-16"
          >
            <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-10 rounded-full" />
            <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed italic font-medium">
              "L'éducation est l'arme la plus puissante pour changer le monde."
            </p>
          </motion.div>

          {/* Activity Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <ModuleButton
              icon={Pencil}
              title="Orthographe"
              subtitle="Le pouvoir des mots"
              variant="orthographe"
              delay={0.5}
              to="/orthographe"
            />

            <ModuleButton
              icon={Calculator}
              title="Mathématiques"
              subtitle="L'art des nombres"
              variant="maths"
              delay={0.6}
              to="/mathematiques"
            />

            <ModuleButton
              icon={Brain}
              title="Concentration"
              subtitle="Force de l'esprit"
              variant="concentration"
              delay={0.7}
              inactive={true}
            />
          </motion.div>

          <footer className="mt-20 flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.5 }}
              className="px-6 py-2 bg-white/40 backdrop-blur-md rounded-full border border-white/50 flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold tracking-widest uppercase text-primary">Le futur est magique</span>
              <Sparkles className="w-5 h-5 text-purple" />
            </motion.div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Index;
