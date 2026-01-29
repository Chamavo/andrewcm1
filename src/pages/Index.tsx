import { motion } from "framer-motion";
import { Pencil, Calculator, Brain } from "lucide-react";
import FloatingBubbles from "@/components/FloatingBubbles";
import WelcomeHeader from "@/components/WelcomeHeader";
import ModuleButton from "@/components/ModuleButton";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBubbles />
      
      <main className="relative z-10 container py-8 px-4 max-w-4xl mx-auto">
        <WelcomeHeader />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ModuleButton
            to="/orthographe"
            icon={Pencil}
            title="Orthographe"
            subtitle="Écris sans fautes !"
            variant="orthographe"
            delay={0.4}
          />
          
          <ModuleButton
            to="/maths"
            icon={Calculator}
            title="Mathématiques"
            subtitle="Calcule vite et bien !"
            variant="maths"
            delay={0.5}
          />
          
          <ModuleButton
            to="/concentration"
            icon={Brain}
            title="Concentration"
            subtitle="Entraîne ta mémoire !"
            variant="concentration"
            delay={0.6}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
