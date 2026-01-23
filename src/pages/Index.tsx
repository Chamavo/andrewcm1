import { Pencil, Calculator, Brain } from "lucide-react";
import FloatingBubbles from "@/components/FloatingBubbles";
import WelcomeHeader from "@/components/WelcomeHeader";
import ModuleButton from "@/components/ModuleButton";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBubbles />
      
      <main className="relative z-10 container py-10 md:py-16 px-4">
        <WelcomeHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          <ModuleButton
            to="/orthographe"
            icon={Pencil}
            title="Orthographe"
            subtitle="✏️ Écris sans fautes !"
            variant="orthographe"
            delay={0.2}
          />
          
          <ModuleButton
            to="/maths"
            icon={Calculator}
            title="Mathématiques"
            subtitle="🔢 Calcule vite !"
            variant="maths"
            delay={0.4}
          />
          
          <ModuleButton
            to="/concentration"
            icon={Brain}
            title="Concentration"
            subtitle="🧠 Reste attentif !"
            variant="concentration"
            delay={0.6}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
