
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef } from "react";
import { UserProvider, useUser } from "@/context/UserContext";
import Login from "@/components/auth/Login";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Orthographe = lazy(() => import("./pages/Orthographe"));
const Mathematiques = lazy(() => import("./pages/Mathematiques"));
const Concentration = lazy(() => import("./pages/Concentration"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="text-primary animate-pulse text-xl font-bold">Chargement...</div>
  </div>
);

const AppRoutes = () => {
  const { user, progress, updateLastPath } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Sauvegarder chaque mouvement
  useEffect(() => {
    if (user) {
      updateLastPath(location.pathname);
    }
  }, [location, user, updateLastPath]);

  const restoredRef = useRef(false);

  // 2. Restauration de session (rediriger vers la dernière page si connue)
  useEffect(() => {
    if (!user) {
      restoredRef.current = false;
      return;
    }

    if (!restoredRef.current) {
      restoredRef.current = true;
      if (progress.lastPath && progress.lastPath !== '/' && progress.lastPath !== '/login') {
        navigate(progress.lastPath);
      } else if (location.pathname === '/login' || location.pathname.includes('/login')) {
        navigate('/');
      }
    }
  }, [user]); // Removed other dependencies to avoid loops. Progress is guaranteed by lazy init or login pre-load.

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/orthographe" element={<Orthographe />} />
        <Route path="/mathematiques" element={<Mathematiques />} />
        <Route path="/concentration" element={<Concentration />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
