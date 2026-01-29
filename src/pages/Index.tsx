import { motion } from "framer-motion";
import { Pencil, Calculator, Brain, LogOut } from "lucide-react";
import FloatingBubbles from "@/components/FloatingBubbles";
import WelcomeHeader from "@/components/WelcomeHeader";
import ModuleButton from "@/components/ModuleButton";
import { Button } from "@/components/ui/button";

const Index = () => {
  const handleLogout = () => {
    // For now, just show an alert - will be connected to auth later
    console.log("Logout clicked");
    // Future: supabase.auth.signOut()
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBubbles />
      
      <main className="relative z-10 container py-8 px-4 max-w-4xl mx-auto">
        {/* Logout button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end mb-4"
        >
          <Button
            variant="outline"
            onClick={handleLogout}
            className="bg-card/90 hover:bg-destructive/10 text-foreground hover:text-destructive shadow-md hover:shadow-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Déconnexion</span>
          </Button>
        </motion.div>

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
