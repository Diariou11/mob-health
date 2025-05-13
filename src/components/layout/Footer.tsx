
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-background py-6 md:py-8">
      <div className="container max-w-screen-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/becb538b-e791-4139-88b0-06cd63958edc.png" alt="MOB-Health Africa Logo" className="h-8 w-auto" />
          <div className="text-sm">
            <p className="font-medium">MOB-Health Africa</p>
            <p className="text-foreground/70 text-xs">© 2025 Tous droits réservés</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm text-foreground/70">
          <Link to="/about" className="hover:text-health-blue transition-colors">À propos</Link>
          <Link to="/contact" className="hover:text-health-blue transition-colors">Contact</Link>
          <Link to="/privacy" className="hover:text-health-blue transition-colors">Confidentialité</Link>
          <Link to="/terms" className="hover:text-health-blue transition-colors">Conditions d'utilisation</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
