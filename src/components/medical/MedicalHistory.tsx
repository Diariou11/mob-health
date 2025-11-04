import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface MedicalCondition {
  id: string;
  condition_name: string;
  condition_type: string;
  diagnosed_date: string | null;
  status: string;
  notes: string | null;
}

export const MedicalHistory = () => {
  const [conditions, setConditions] = useState<MedicalCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCondition, setEditingCondition] = useState<MedicalCondition | null>(null);
  const [formData, setFormData] = useState({
    condition_name: '',
    condition_type: 'chronique',
    diagnosed_date: '',
    status: 'actif',
    notes: ''
  });

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('medical_history')
        .select('*')
        .eq('patient_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConditions(data || []);
    } catch (error) {
      console.error('Error fetching medical history:', error);
      toast.error('Erreur lors du chargement de l\'historique médical');
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

      if (editingCondition) {
        const { error } = await supabase
          .from('medical_history')
          .update(formData)
          .eq('id', editingCondition.id);

        if (error) throw error;
        toast.success('Antécédent modifié avec succès');
      } else {
        const { error } = await supabase
          .from('medical_history')
          .insert([{ ...formData, patient_id: user.id }]);

        if (error) throw error;
        toast.success('Antécédent ajouté avec succès');
      }

      setDialogOpen(false);
      setEditingCondition(null);
      setFormData({
        condition_name: '',
        condition_type: 'chronique',
        diagnosed_date: '',
        status: 'actif',
        notes: ''
      });
      fetchMedicalHistory();
    } catch (error) {
      console.error('Error saving medical history:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cet antécédent ?')) return;

    try {
      const { error } = await supabase
        .from('medical_history')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Antécédent supprimé');
      fetchMedicalHistory();
    } catch (error) {
      console.error('Error deleting condition:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleEdit = (condition: MedicalCondition) => {
    setEditingCondition(condition);
    setFormData({
      condition_name: condition.condition_name,
      condition_type: condition.condition_type,
      diagnosed_date: condition.diagnosed_date || '',
      status: condition.status,
      notes: condition.notes || ''
    });
    setDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actif': return 'bg-destructive';
      case 'en traitement': return 'bg-yellow-500';
      case 'résolu': return 'bg-clinic-green';
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
            <CardTitle>Antécédents Médicaux</CardTitle>
            <CardDescription>Historique de vos conditions médicales</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingCondition(null);
                setFormData({
                  condition_name: '',
                  condition_type: 'chronique',
                  diagnosed_date: '',
                  status: 'actif',
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
                  {editingCondition ? 'Modifier' : 'Ajouter'} un antécédent médical
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="condition_name">Nom de la condition</Label>
                  <Input
                    id="condition_name"
                    value={formData.condition_name}
                    onChange={(e) => setFormData({ ...formData, condition_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="condition_type">Type</Label>
                  <Select
                    value={formData.condition_type}
                    onValueChange={(value) => setFormData({ ...formData, condition_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chronique">Chronique</SelectItem>
                      <SelectItem value="aiguë">Aiguë</SelectItem>
                      <SelectItem value="héréditaire">Héréditaire</SelectItem>
                      <SelectItem value="chirurgicale">Chirurgicale</SelectItem>
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
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="actif">Actif</SelectItem>
                      <SelectItem value="résolu">Résolu</SelectItem>
                      <SelectItem value="en traitement">En traitement</SelectItem>
                    </SelectContent>
                  </Select>
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
                  {editingCondition ? 'Modifier' : 'Ajouter'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {conditions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Aucun antécédent médical enregistré
          </p>
        ) : (
          <div className="space-y-4">
            {conditions.map((condition) => (
              <div key={condition.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{condition.condition_name}</h3>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{condition.condition_type}</Badge>
                      <Badge className={getStatusColor(condition.status)}>
                        {condition.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(condition)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(condition.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {condition.diagnosed_date && (
                  <p className="text-sm text-muted-foreground">
                    Diagnostiqué le: {new Date(condition.diagnosed_date).toLocaleDateString('fr-FR')}
                  </p>
                )}
                {condition.notes && (
                  <p className="text-sm mt-2">{condition.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};