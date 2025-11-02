import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Camera, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const SymptomAnalyzer = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("L'image doit faire moins de 5 MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const reader = new FileReader();
      
      const readFileAsDataURL = () => {
        return new Promise<string>((resolve, reject) => {
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result as string);
            } else {
              reject(new Error("Impossible de lire l'image"));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(imageFile);
        });
      };

      const base64Image = await readFileAsDataURL();
      
      console.log('Calling analyze-symptom-image function...');
      const { data, error } = await supabase.functions.invoke('analyze-symptom-image', {
        body: {
          imageBase64: base64Image,
          description: description || "Analyser cette image de symptôme"
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data?.analysis) {
        throw new Error("Aucune analyse reçue");
      }

      console.log('Analysis completed successfully');
      setAnalysis(data.analysis);
      toast.success("Analyse terminée");
    } catch (error) {
      console.error('Error analyzing image:', error);
      const errorMessage = error instanceof Error ? error.message : "Erreur lors de l'analyse de l'image";
      toast.error(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImagePreview(null);
    setDescription('');
    setAnalysis(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Analyse de Symptômes par Image
          </CardTitle>
          <CardDescription>
            Téléchargez une photo de vos symptômes pour une analyse préliminaire par IA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-1">Avertissement Important</p>
              <p>Cette analyse est préliminaire et ne remplace PAS une consultation médicale. Consultez toujours un professionnel de santé qualifié.</p>
            </div>
          </div>

          {!imagePreview ? (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Cliquez pour sélectionner une image
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG ou WEBP (max 5 MB)
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
              </div>

              <Textarea
                placeholder="Décrivez vos symptômes (optionnel)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />

              <div className="flex gap-2">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-1"
                >
                  {isAnalyzing ? 'Analyse en cours...' : 'Analyser l\'image'}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                >
                  Réinitialiser
                </Button>
              </div>
            </div>
          )}

          {analysis && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Résultat de l'Analyse</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{analysis}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
