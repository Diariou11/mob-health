
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Bell, UserPlus, LogIn } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const Header = () => {
  const [notifications, setNotifications] = useState(2);
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <img src="/lovable-uploads/c19a2797-156b-4d8d-9bb3-e52cde9300e0.png" alt="MOB-Health Africa Logo" className="h-9 w-auto" />
          <span className="font-bold text-xl font-ubuntu hidden md:inline-block">MOB-Health</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium flex-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "transition-colors hover:text-foreground relative py-2",
                isActive(link.path)
                  ? "text-health-blue font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-health-blue"
                  : "text-foreground/70 hover:text-health-blue"
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
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
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
            className="relative"
            onClick={showNotification}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "transition-colors px-2 py-1 rounded-md",
                      isActive(link.path)
                        ? "bg-health-blue/10 text-health-blue font-bold"
                        : "text-foreground/70 hover:bg-accent"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/patient" className="hidden md:block">
            <Button variant="outline" className="border-health-blue text-health-blue hover:bg-health-blue hover:text-white">
              Mon Espace
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
