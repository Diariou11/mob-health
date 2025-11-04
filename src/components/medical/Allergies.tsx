import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Edit, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: string;
  diagnosed_date: string | null;
  notes: string | null;
}

export const Allergies = () => {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAllergy, setEditingAllergy] = useState<Allergy | null>(null);
  const [formData, setFormData] = useState({
    allergen: '',
    reaction: '',
    severity: 'modérée',
    diagnosed_date: '',
    notes: ''
  });

  useEffect(() => {
    fetchAllergies();
  }, []);

  const fetchAllergies = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('allergies')
        .select('*')
        .eq('patient_id', user.id)
        .order('severity', { ascending: false });

      if (error) throw error;
      setAllergies(data || []);
    } catch (error) {
      console.error('Error fetching allergies:', error);
      toast.error('Erreur lors du chargement des allergies');
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

      if (editingAllergy) {
        const { error } = await supabase
          .from('allergies')
          .update(formData)
          .eq('id', editingAllergy.id);

        if (error) throw error;
        toast.success('Allergie modifiée avec succès');
      } else {
        const { error } = await supabase
          .from('allergies')
          .insert([{ ...formData, patient_id: user.id }]);

        if (error) throw error;
        toast.success('Allergie ajoutée avec succès');
      }

      setDialogOpen(false);
      setEditingAllergy(null);
      setFormData({
        allergen: '',
        reaction: '',
        severity: 'modérée',
        diagnosed_date: '',
        notes: ''
      });
      fetchAllergies();
    } catch (error) {
      console.error('Error saving allergy:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette allergie ?')) return;

    try {
      const { error } = await supabase
        .from('allergies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Allergie supprimée');
      fetchAllergies();
    } catch (error) {
      console.error('Error deleting allergy:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleEdit = (allergy: Allergy) => {
    setEditingAllergy(allergy);
    setFormData({
      allergen: allergy.allergen,
      reaction: allergy.reaction,
      severity: allergy.severity,
      diagnosed_date: allergy.diagnosed_date || '',
      notes: allergy.notes || ''
    });
    setDialogOpen(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'sévère': return 'bg-destructive';
      case 'modérée': return 'bg-yellow-500';
      case 'légère': return 'bg-clinic-green';
      default: return 'bg-gray-500';
    }
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
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Allergies
            </CardTitle>
            <CardDescription>Liste de vos allergies connues</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingAllergy(null);
                setFormData({
                  allergen: '',
                  reaction: '',
                  severity: 'modérée',
                  diagnosed_date: '',
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
                  {editingAllergy ? 'Modifier' : 'Ajouter'} une allergie
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="allergen">Allergène</Label>
                  <Input
                    id="allergen"
                    value={formData.allergen}
                    onChange={(e) => setFormData({ ...formData, allergen: e.target.value })}
                    placeholder="Ex: Pénicilline, Arachides..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="reaction">Réaction</Label>
                  <Input
                    id="reaction"
                    value={formData.reaction}
                    onChange={(e) => setFormData({ ...formData, reaction: e.target.value })}
                    placeholder="Ex: Éruption cutanée, difficultés respiratoires..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="severity">Sévérité</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(value) => setFormData({ ...formData, severity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="légère">Légère</SelectItem>
                      <SelectItem value="modérée">Modérée</SelectItem>
                      <SelectItem value="sévère">Sévère</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="diagnosed_date">Date de diagnostic</Label>
                  <Input
                    id="diagnosed_date"
                    type="date"
                    value={formData.diagnosed_date}
                    onChange={(e) => setFormData({ ...formData, diagnosed_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes additionnelles</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingAllergy ? 'Modifier' : 'Ajouter'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {allergies.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Aucune allergie enregistrée
          </p>
        ) : (
          <div className="space-y-4">
            {allergies.map((allergy) => (
              <div key={allergy.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{allergy.allergen}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Réaction: {allergy.reaction}
                    </p>
                    <Badge className={`${getSeverityColor(allergy.severity)} mt-2`}>
                      {allergy.severity}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(allergy)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(allergy.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {allergy.diagnosed_date && (
                  <p className="text-sm text-muted-foreground">
                    Diagnostiqué le: {new Date(allergy.diagnosed_date).toLocaleDateString('fr-FR')}
                  </p>
                )}
                {allergy.notes && (
                  <p className="text-sm mt-2 italic">{allergy.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};