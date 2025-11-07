import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Mic, MicOff, Loader2, Trash2, Languages, User, Bot } from 'lucide-react';
import { toast } from 'sonner';
import { useAIChat, type Message } from '@/hooks/useAIChat';

type Language = 'français' | 'soussou' | 'peul' | 'malinké';

export const ConversationalChat = () => {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<Language>('français');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage, clearMessages } = useAIChat();

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language === 'français' ? 'fr-FR' : 'fr-FR'; // Fallback to French for local languages

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast.error("Erreur de reconnaissance vocale");
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [language]);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const messageWithLanguage = language !== 'français' 
      ? `[Répondre en ${language}] ${input}` 
      : input;

    await sendMessage(messageWithLanguage);
    setInput('');
  };

  const toggleVoiceRecognition = () => {
    if (!recognition) {
      toast.error("Reconnaissance vocale non supportée par votre navigateur");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      toast.info("Parlez maintenant...");
    }
  };

  const getSpecialistRecommendation = (messageContent: string): string | null => {
    const lowerContent = messageContent.toLowerCase();
    
    const specialties = {
      'cardiologue': ['cœur', 'cardiaque', 'palpitations', 'tension', 'hypertension'],
      'dermatologue': ['peau', 'éruption', 'boutons', 'démangeaisons', 'acné'],
      'pédiatre': ['enfant', 'bébé', 'nourrisson', 'vaccination'],
      'gynécologue': ['grossesse', 'menstruation', 'accouchement', 'femme'],
      'ophtalmologue': ['yeux', 'vue', 'vision', 'lunettes'],
      'neurologue': ['maux de tête', 'migraine', 'vertiges', 'convulsions'],
      'pneumologue': ['respiration', 'toux', 'poumons', 'asthme'],
    };

    for (const [specialty, keywords] of Object.entries(specialties)) {
      if (keywords.some(keyword => lowerContent.includes(keyword))) {
        return specialty;
      }
    }
    
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Assistant Médical IA
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
              <SelectTrigger className="w-[140px]">
                <Languages className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="français">Français</SelectItem>
                <SelectItem value="soussou">Soussou</SelectItem>
                <SelectItem value="peul">Peul</SelectItem>
                <SelectItem value="malinké">Malinké</SelectItem>
              </SelectContent>
            </Select>
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Effacer
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4 mb-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Bonjour ! Je suis votre assistant médical.</p>
                <p className="text-sm">Décrivez vos symptômes et je vous aiderai.</p>
              </div>
            )}
            {messages.map((message, index) => {
              const specialist = message.role === 'assistant' ? getSpecialistRecommendation(message.content) : null;
              
              return (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {specialist && (
                      <Badge variant="secondary" className="mt-2">
                        Recommandé : {specialist}
                      </Badge>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="rounded-lg px-4 py-2 bg-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Décrivez vos symptômes en ${language}...`}
            disabled={isLoading || isListening}
            className="flex-1"
          />
          <Button
            type="button"
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            onClick={toggleVoiceRecognition}
            disabled={isLoading}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
