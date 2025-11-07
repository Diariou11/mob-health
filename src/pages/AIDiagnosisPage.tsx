import { SymptomAnalyzer } from '@/components/ai/SymptomAnalyzer';
import { ConversationalChat } from '@/components/ai/ConversationalChat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Shield, Clock, MessageSquare, Camera } from 'lucide-react';

const AIDiagnosisPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Pré-Diagnostic par Intelligence Artificielle
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Utilisez notre technologie d'IA avancée pour une première analyse de vos symptômes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <Brain className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">IA Médicale Avancée</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Technologie Google Gemini Pro pour une analyse précise des images médicales
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">100% Confidentiel</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Vos images sont analysées de manière sécurisée et ne sont pas conservées
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Résultat Instantané</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Obtenez une analyse préliminaire en quelques secondes
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat Médical
            </TabsTrigger>
            <TabsTrigger value="image" className="gap-2">
              <Camera className="h-4 w-4" />
              Analyse d'Image
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-6">
            <ConversationalChat />
          </TabsContent>
          
          <TabsContent value="image" className="mt-6">
            <SymptomAnalyzer />
          </TabsContent>
        </Tabs>

        <Card className="bg-blue-50 border-blue-200 mt-8">
          <CardHeader>
            <CardTitle className="text-blue-900">Comment ça marche ?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-blue-800">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold">1</div>
              <p>Prenez une photo claire de la zone concernée (éruption cutanée, blessure, etc.)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold">2</div>
              <p>Téléchargez l'image et ajoutez une description si nécessaire</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold">3</div>
              <p>Notre IA analyse l'image et vous fournit des recommandations</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold">4</div>
              <p>Consultez un professionnel de santé avec ces informations</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIDiagnosisPage;
