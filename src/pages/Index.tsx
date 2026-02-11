import { motion } from "framer-motion";
import { Pencil, Calculator, Brain, LogOut, Sparkles } from "lucide-react";
import FloatingBubbles from "@/components/FloatingBubbles";
import WelcomeHeader from "@/components/WelcomeHeader";
import ModuleButton from "@/components/ModuleButton";
import { Button } from "@/components/ui/button";

const Index = () => {
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <FloatingBubbles />

      <main className="relative z-10 container py-12 px-4 max-w-5xl mx-auto flex flex-col items-center">
        {/* Profile/Logout section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex justify-end mb-8"
        >
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="group hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all rounded-full px-6"
          >
            <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            <span className="font-medium">Déconnexion</span>
          </Button>
        </motion.div>

        <section className="w-full flex flex-col items-center text-center">
          <WelcomeHeader />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full max-w-lg mb-12"
          >
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-8 rounded-full" />
            <p className="text-muted-foreground text-lg leading-relaxed italic">
              "L'éducation est l'arme la plus puissante pour changer le monde."
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ModuleButton
              icon={Pencil}
              title="Orthographe"
              subtitle="Le pouvoir des mots"
              variant="orthographe"
              delay={0.5}
              inactive={true}
            />

            <ModuleButton
              icon={Calculator}
              title="Mathématiques"
              subtitle="L'art des nombres"
              variant="maths"
              delay={0.6}
              inactive={true}
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-20 text-muted-foreground/40 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-widest uppercase">Espace en cours de construction</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Index;
