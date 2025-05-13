
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
  onFilterChange: (filterCategory: keyof FilterState, filterKey: string, value: boolean) => void;
}

const FilterPanel = ({ 
  filters, 
  distance, 
  setDistance, 
  onApplyFilters, 
  onFilterChange 
}: FilterPanelProps) => {
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
                <Checkbox 
                  id="hopital" 
                  checked={filters.type.hopital} 
                  onCheckedChange={(checked) => 
                    onFilterChange('type', 'hopital', checked === true)
                  }
                />
                <Label htmlFor="hopital">Hôpital</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="clinique" 
                  checked={filters.type.clinique}
                  onCheckedChange={(checked) => 
                    onFilterChange('type', 'clinique', checked === true)
                  }
                />
                <Label htmlFor="clinique">Clinique</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="centre" 
                  checked={filters.type.centre}
                  onCheckedChange={(checked) => 
                    onFilterChange('type', 'centre', checked === true)
                  }
                />
                <Label htmlFor="centre">Centre de Santé</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Spécialités</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="general" 
                  checked={filters.specialty.general}
                  onCheckedChange={(checked) => 
                    onFilterChange('specialty', 'general', checked === true)
                  }
                />
                <Label htmlFor="general">Médecine générale</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="pediatrie" 
                  checked={filters.specialty.pediatrie}
                  onCheckedChange={(checked) => 
                    onFilterChange('specialty', 'pediatrie', checked === true)
                  }
                />
                <Label htmlFor="pediatrie">Pédiatrie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="cardiologie" 
                  checked={filters.specialty.cardiologie}
                  onCheckedChange={(checked) => 
                    onFilterChange('specialty', 'cardiologie', checked === true)
                  }
                />
                <Label htmlFor="cardiologie">Cardiologie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="gynecologie" 
                  checked={filters.specialty.gynecologie}
                  onCheckedChange={(checked) => 
                    onFilterChange('specialty', 'gynecologie', checked === true)
                  }
                />
                <Label htmlFor="gynecologie">Gynécologie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ophtalmologie" 
                  checked={filters.specialty.ophtalmologie}
                  onCheckedChange={(checked) => 
                    onFilterChange('specialty', 'ophtalmologie', checked === true)
                  }
                />
                <Label htmlFor="ophtalmologie">Ophtalmologie</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Services</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="urgences" 
                  checked={filters.services.urgences}
                  onCheckedChange={(checked) => 
                    onFilterChange('services', 'urgences', checked === true)
                  }
                />
                <Label htmlFor="urgences">Service d'urgence</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="maternite" 
                  checked={filters.services.maternite}
                  onCheckedChange={(checked) => 
                    onFilterChange('services', 'maternite', checked === true)
                  }
                />
                <Label htmlFor="maternite">Maternité</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="vaccination" 
                  checked={filters.services.vaccination}
                  onCheckedChange={(checked) => 
                    onFilterChange('services', 'vaccination', checked === true)
                  }
                />
                <Label htmlFor="vaccination">Vaccination</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="bloodBank" 
                  checked={filters.services.bloodBank}
                  onCheckedChange={(checked) => 
                    onFilterChange('services', 'bloodBank', checked === true)
                  }
                />
                <Label htmlFor="bloodBank">Banque de sang</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Langues parlées</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="francais" 
                  checked={filters.languages.francais}
                  onCheckedChange={(checked) => 
                    onFilterChange('languages', 'francais', checked === true)
                  }
                />
                <Label htmlFor="francais">Français</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="anglais" 
                  checked={filters.languages.anglais}
                  onCheckedChange={(checked) => 
                    onFilterChange('languages', 'anglais', checked === true)
                  }
                />
                <Label htmlFor="anglais">Anglais</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="peul" 
                  checked={filters.languages.peul}
                  onCheckedChange={(checked) => 
                    onFilterChange('languages', 'peul', checked === true)
                  }
                />
                <Label htmlFor="peul">Peul</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="soussou" 
                  checked={filters.languages.soussou}
                  onCheckedChange={(checked) => 
                    onFilterChange('languages', 'soussou', checked === true)
                  }
                />
                <Label htmlFor="soussou">Soussou</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="malinke" 
                  checked={filters.languages.malinke}
                  onCheckedChange={(checked) => 
                    onFilterChange('languages', 'malinke', checked === true)
                  }
                />
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
