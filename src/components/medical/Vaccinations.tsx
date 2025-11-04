import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Edit, Syringe } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface Vaccination {
  id: string;
  vaccine_name: string;
  vaccine_type: string;
  dose_number: number;
  administration_date: string;
  next_dose_date: string | null;
  administered_by: string | null;
  notes: string | null;
}

export const Vaccinations = () => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVaccination, setEditingVaccination] = useState<Vaccination | null>(null);
  const [formData, setFormData] = useState({
    vaccine_name: '',
    vaccine_type: '',
    dose_number: 1,
    administration_date: '',
    next_dose_date: '',
    administered_by: '',
    notes: ''
  });

  useEffect(() => {
    fetchVaccinations();
  }, []);

  const fetchVaccinations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('vaccinations')
        .select('*')
        .eq('patient_id', user.id)
        .order('administration_date', { ascending: false });

      if (error) throw error;
      setVaccinations(data || []);
    } catch (error) {
      console.error('Error fetching vaccinations:', error);
      toast.error('Erreur lors du chargement des vaccinations');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Vous devez être connecté');
        return;
      }

      if (editingVaccination) {
        const { error } = await supabase
          .from('vaccinations')
          .update(formData)
          .eq('id', editingVaccination.id);

        if (error) throw error;
        toast.success('Vaccination modifiée avec succès');
      } else {
        const { error } = await supabase
          .from('vaccinations')
          .insert([{ ...formData, patient_id: user.id }]);

        if (error) throw error;
        toast.success('Vaccination ajoutée avec succès');
      }

      setDialogOpen(false);
      setEditingVaccination(null);
      setFormData({
        vaccine_name: '',
        vaccine_type: '',
        dose_number: 1,
        administration_date: '',
        next_dose_date: '',
        administered_by: '',
        notes: ''
      });
      fetchVaccinations();
    } catch (error) {
      console.error('Error saving vaccination:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette vaccination ?')) return;

    try {
      const { error } = await supabase
        .from('vaccinations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Vaccination supprimée');
      fetchVaccinations();
    } catch (error) {
      console.error('Error deleting vaccination:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleEdit = (vaccination: Vaccination) => {
    setEditingVaccination(vaccination);
    setFormData({
      vaccine_name: vaccination.vaccine_name,
      vaccine_type: vaccination.vaccine_type,
      dose_number: vaccination.dose_number,
      administration_date: vaccination.administration_date,
      next_dose_date: vaccination.next_dose_date || '',
      administered_by: vaccination.administered_by || '',
      notes: vaccination.notes || ''
    });
    setDialogOpen(true);
  };

  const isNextDoseUpcoming = (nextDoseDate: string | null) => {
    if (!nextDoseDate) return false;
    const today = new Date();
    const nextDate = new Date(nextDoseDate);
    const diffDays = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Syringe className="h-5 w-5 text-clinic-green" />
              Vaccinations
            </CardTitle>
            <CardDescription>Historique de vos vaccinations</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingVaccination(null);
                setFormData({
                  vaccine_name: '',
                  vaccine_type: '',
                  dose_number: 1,
                  administration_date: '',
                  next_dose_date: '',
                  administered_by: '',
                  notes: ''
                });
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingVaccination ? 'Modifier' : 'Ajouter'} une vaccination
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="vaccine_name">Nom du vaccin</Label>
                  <Input
                    id="vaccine_name"
                    value={formData.vaccine_name}
                    onChange={(e) => setFormData({ ...formData, vaccine_name: e.target.value })}
                    placeholder="Ex: COVID-19, BCG, Polio..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="vaccine_type">Type de vaccin</Label>
                  <Input
                    id="vaccine_type"
                    value={formData.vaccine_type}
                    onChange={(e) => setFormData({ ...formData, vaccine_type: e.target.value })}
                    placeholder="Ex: ARN messager, vivant atténué..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dose_number">Numéro de dose</Label>
                  <Input
                    id="dose_number"
                    type="number"
                    min="1"
                    value={formData.dose_number}
                    onChange={(e) => setFormData({ ...formData, dose_number: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="administration_date">Date d'administration</Label>
                  <Input
                    id="administration_date"
                    type="date"
                    value={formData.administration_date}
                    onChange={(e) => setFormData({ ...formData, administration_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="next_dose_date">Prochaine dose (optionnel)</Label>
                  <Input
                    id="next_dose_date"
                    type="date"
                    value={formData.next_dose_date}
                    onChange={(e) => setFormData({ ...formData, next_dose_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="administered_by">Administré par</Label>
                  <Input
                    id="administered_by"
                    value={formData.administered_by}
                    onChange={(e) => setFormData({ ...formData, administered_by: e.target.value })}
                    placeholder="Nom du professionnel de santé"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingVaccination ? 'Modifier' : 'Ajouter'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {vaccinations.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Aucune vaccination enregistrée
          </p>
        ) : (
          <div className="space-y-4">
            {vaccinations.map((vaccination) => (
              <div key={vaccination.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{vaccination.vaccine_name}</h3>
                    <p className="text-sm text-muted-foreground">{vaccination.vaccine_type}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">Dose {vaccination.dose_number}</Badge>
                      {vaccination.next_dose_date && isNextDoseUpcoming(vaccination.next_dose_date) && (
                        <Badge className="bg-yellow-500">Rappel à venir</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(vaccination)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(vaccination.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Administré le: {new Date(vaccination.administration_date).toLocaleDateString('fr-FR')}
                </p>
                {vaccination.next_dose_date && (
                  <p className="text-sm text-muted-foreground">
                    Prochaine dose: {new Date(vaccination.next_dose_date).toLocaleDateString('fr-FR')}
                  </p>
                )}
                {vaccination.administered_by && (
                  <p className="text-sm">Par: {vaccination.administered_by}</p>
                )}
                {vaccination.notes && (
                  <p className="text-sm mt-2 italic">{vaccination.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};