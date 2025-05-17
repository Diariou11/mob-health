
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <motion.div
        className="text-center max-w-md p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-destructive/20 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-white/80 mb-6">
          Cette page n'existe pas encore
        </p>
        <Link to="/">
          <Button className="bg-health-blue hover:bg-health-blue/80">
            <Home className="mr-2 h-4 w-4" /> Retour à l'accueil
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
