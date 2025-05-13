
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Filter } from 'lucide-react';
import { FilterState } from '@/types/facility';

interface FilterPanelProps {
  filters: FilterState;
  distance: number[];
  setDistance: (value: number[]) => void;
  onApplyFilters: () => void;
}

const FilterPanel = ({ filters, distance, setDistance, onApplyFilters }: FilterPanelProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="bg-white/95 shadow-md">
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtres de recherche</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Distance</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">0 km</span>
              <span className="text-sm">{distance[0]} km</span>
              <span className="text-sm">25 km</span>
            </div>
            <Slider
              defaultValue={[10]}
              max={25}
              step={1}
              value={distance}
              onValueChange={setDistance}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Type d'établissement</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="hopital" checked={filters.type.hopital} />
                <Label htmlFor="hopital">Hôpital</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="clinique" checked={filters.type.clinique} />
                <Label htmlFor="clinique">Clinique</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="centre" checked={filters.type.centre} />
                <Label htmlFor="centre">Centre de Santé</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Spécialités</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="general" checked={filters.specialty.general} />
                <Label htmlFor="general">Médecine générale</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pediatrie" checked={filters.specialty.pediatrie} />
                <Label htmlFor="pediatrie">Pédiatrie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cardiologie" checked={filters.specialty.cardiologie} />
                <Label htmlFor="cardiologie">Cardiologie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="gynecologie" checked={filters.specialty.gynecologie} />
                <Label htmlFor="gynecologie">Gynécologie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ophtalmologie" checked={filters.specialty.ophtalmologie} />
                <Label htmlFor="ophtalmologie">Ophtalmologie</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Services</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="urgences" checked={filters.services.urgences} />
                <Label htmlFor="urgences">Service d'urgence</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="maternite" checked={filters.services.maternite} />
                <Label htmlFor="maternite">Maternité</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="vaccination" checked={filters.services.vaccination} />
                <Label htmlFor="vaccination">Vaccination</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="bloodBank" checked={filters.services.bloodBank} />
                <Label htmlFor="bloodBank">Banque de sang</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Langues parlées</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="francais" checked={filters.languages.francais} />
                <Label htmlFor="francais">Français</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="anglais" checked={filters.languages.anglais} />
                <Label htmlFor="anglais">Anglais</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="peul" checked={filters.languages.peul} />
                <Label htmlFor="peul">Peul</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="soussou" checked={filters.languages.soussou} />
                <Label htmlFor="soussou">Soussou</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="malinke" checked={filters.languages.malinke} />
                <Label htmlFor="malinke">Malinké</Label>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-clinic-green hover:bg-clinic-green/90"
            onClick={onApplyFilters}
          >
            Appliquer les filtres
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterPanel;
