
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { KeyboardEvent } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchChange(searchTerm); // Trigger search immediately on Enter
    }
  };

  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Rechercher un établissement ou service..."
        className="pl-8 pr-4 py-5 bg-white/95 shadow-md"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
