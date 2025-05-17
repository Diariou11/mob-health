
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/20 bg-black/75 backdrop-blur py-8 md:py-10">
      <div className="container max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/lovable-uploads/c19a2797-156b-4d8d-9bb3-e52cde9300e0.png" alt="MOB-Health Africa Logo" className="h-10 w-auto" />
              <div>
                <p className="font-bold text-lg text-white">MOB-Health Africa</p>
              </div>
            </div>
            <p className="text-sm text-white/90 font-medium">
              Connecter les patients aux soins de santé en Guinée grâce à une plateforme numérique unifiée.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="text-white hover:text-health-blue">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white hover:text-health-blue">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-health-blue">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-3 text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/map" className="text-sm text-white/90 hover:text-health-blue transition-colors font-medium">
                  Cartographie des établissements
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm text-white/90 hover:text-health-blue transition-colors font-medium">
                  Recherche avancée
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-sm text-white/90 hover:text-health-blue transition-colors font-medium">
                  Services d'urgence
                </Link>
              </li>
              <li>
                <Link to="/patient" className="text-sm text-white/90 hover:text-health-blue transition-colors font-medium">
                  Dossier médical électronique
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-3 text-white">À propos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-white/90 hover:text-health-blue transition-colors font-medium">
                  Notre mission
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-white/90 hover:text-health-blue transition-colors font-medium">
                  Équipe
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-sm text-white/90 hover:text-health-blue transition-colors font-medium">
                  Partenaires
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-white/90 hover:text-health-blue transition-colors font-medium">
                  Actualités
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-3 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-clinic-green" />
                <span className="text-sm text-white font-medium">+224 621 999 284</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-clinic-green" />
                <span className="text-sm text-white font-medium">mobhealth-africa@mobgroup.tech</span>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-white/90 hover:text-health-blue transition-colors font-medium">
                  Formulaire de contact
                </Link>
              </li>
              <li>
                <Link to="/ussd" className="text-sm text-white/90 hover:text-health-blue transition-colors font-medium">
                  Accès hors ligne (USSD)
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-white/20">
          <p className="text-xs text-white/80 font-medium">© 2025 MOB-Health Africa. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-white/80 hover:text-health-blue transition-colors font-medium">
              Confidentialité
            </Link>
            <Link to="/terms" className="text-xs text-white/80 hover:text-health-blue transition-colors font-medium">
              Conditions d'utilisation
            </Link>
            <Link to="/accessibility" className="text-xs text-white/80 hover:text-health-blue transition-colors font-medium">
              Accessibilité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
