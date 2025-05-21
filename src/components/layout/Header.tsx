
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Bell, UserPlus, LogIn } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Header = () => {
  const [notifications, setNotifications] = useState(2);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const showNotification = () => {
    toast({
      title: "Notifications",
      description: "Vous avez 2 notifications non lues: alerte de disponibilité à l'hôpital Central et nouvelle campagne de vaccination.",
    });
    setNotifications(0);
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Carte', path: '/map' },
    { name: 'Recherche', path: '/search' },
    { name: 'Urgences', path: '/emergency' },
    { name: 'Mon Espace', path: '/patient' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavLinkClick = () => {
    // Fermer le menu mobile lors du clic sur un lien
    setIsSheetOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="container flex h-16 max-w-screen-xl items-center">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <motion.img 
            src="/lovable-uploads/c19a2797-156b-4d8d-9bb3-e52cde9300e0.png" 
            alt="MOB-Health Africa Logo" 
            className="h-9 w-auto" 
            animate={{ 
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut"
            }}
          />
          <motion.span 
            className="font-bold text-xl font-ubuntu hidden md:inline-block text-white"
            animate={{ 
              y: [0, -1, 0], 
              opacity: [1, 0.9, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5,
              ease: "easeInOut"
            }}
          >
            MOB-Health
          </motion.span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium flex-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "transition-colors hover:text-white relative py-2",
                isActive(link.path)
                  ? "text-white font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-health-blue before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-clinic-green"
                  : "text-white/70 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2 ml-auto">
          {location.pathname === '/' && (
            <div className="hidden md:flex items-center gap-2 mr-4">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white hover:bg-white/10">
                  <LogIn className="h-4 w-4" />
                  Se connecter
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-health-blue hover:bg-health-blue/80 flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  S'inscrire
                </Button>
              </Link>
            </div>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-white hover:bg-white/10"
            onClick={showNotification}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>
          
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-black/80 backdrop-blur-lg border-white/20">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    onClick={handleNavLinkClick}
                    className={cn(
                      "transition-colors px-2 py-1 rounded-md",
                      isActive(link.path)
                        ? "bg-health-blue/30 text-white font-bold border-l-4 border-health-blue"
                        : "text-white/70 hover:bg-white/10"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {location.pathname === '/' && (
                  <div className="pt-4 mt-4 border-t border-white/20 flex flex-col gap-2">
                    <Link 
                      to="/login"
                      onClick={handleNavLinkClick}
                      className="flex items-center gap-2 px-2 py-2 rounded-md text-white hover:bg-white/10"
                    >
                      <LogIn className="h-4 w-4" />
                      Se connecter
                    </Link>
                    <Link 
                      to="/register"
                      onClick={handleNavLinkClick}
                      className="flex items-center gap-2 px-2 py-2 rounded-md bg-health-blue hover:bg-health-blue/80 text-white"
                    >
                      <UserPlus className="h-4 w-4" />
                      S'inscrire
                    </Link>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/patient" className="hidden md:block">
            <Button variant="outline" className="border-health-blue text-white hover:bg-health-blue hover:text-white bg-white/10">
              Mon Espace
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
