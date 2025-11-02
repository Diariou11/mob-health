import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AppointmentFormProps {
  doctorName?: string;
  facilityName?: string;
  onSuccess?: () => void;
}

export const AppointmentForm = ({ doctorName, facilityName, onSuccess }: AppointmentFormProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !reason || !phone || !name) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    // Ici, vous pourrez intégrer avec Supabase pour enregistrer le rendez-vous
    toast.success('Rendez-vous enregistré avec succès!', {
      description: `Votre rendez-vous avec ${doctorName || 'le médecin'} est prévu le ${format(date, 'PPP', { locale: fr })} à ${time}`,
    });

    // Reset form
    setDate(undefined);
    setTime('');
    setReason('');
    setPhone('');
    setName('');

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom complet *</Label>
        <Input
          id="name"
          placeholder="Votre nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone *</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+224 XXX XX XX XX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      {doctorName && (
        <div className="space-y-2">
          <Label>Médecin</Label>
          <Input value={doctorName} disabled />
        </div>
      )}

      {facilityName && (
        <div className="space-y-2">
          <Label>Établissement</Label>
          <Input value={facilityName} disabled />
        </div>
      )}

      <div className="space-y-2">
        <Label>Date du rendez-vous *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP', { locale: fr }) : 'Sélectionner une date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Heure *</Label>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une heure" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="08:00">08:00</SelectItem>
            <SelectItem value="09:00">09:00</SelectItem>
            <SelectItem value="10:00">10:00</SelectItem>
            <SelectItem value="11:00">11:00</SelectItem>
            <SelectItem value="14:00">14:00</SelectItem>
            <SelectItem value="15:00">15:00</SelectItem>
            <SelectItem value="16:00">16:00</SelectItem>
            <SelectItem value="17:00">17:00</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Motif de consultation *</Label>
        <Textarea
          id="reason"
          placeholder="Décrivez brièvement la raison de votre consultation"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          required
        />
      </div>

      <Button type="submit" className="w-full bg-health-blue hover:bg-health-blue/90">
        Confirmer le rendez-vous
      </Button>
    </form>
  );
};
