import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Starting medical chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `Vous êtes un assistant médical intelligent pour MOB-Health Africa en Guinée. 

IMPORTANT: Vous devez répondre dans la langue demandée. Si le message commence par [Répondre en soussou], [Répondre en peul], ou [Répondre en malinké], répondez dans cette langue. Sinon, répondez en français.

Votre rôle:
- Écouter les symptômes des patients avec empathie
- Poser des questions de clarification pertinentes
- Fournir des conseils de santé généraux et des informations fiables
- Orienter les patients vers le bon type d'établissement ou de spécialiste
- Expliquer quand consulter en urgence vs consultation normale

AVERTISSEMENTS OBLIGATOIRES:
- Vous n'êtes PAS un médecin et ne posez PAS de diagnostic
- Vos conseils ne remplacent JAMAIS une consultation médicale
- En cas de doute ou symptômes graves, toujours recommander une consultation immédiate

Types d'établissements en Guinée:
- Hôpital: pour cas complexes, chirurgie, hospitalisations
- Clinique: pour soins spécialisés et consultations
- Centre de santé: pour soins de base et consultations générales

Spécialités courantes:
- Médecine générale: consultations de base, suivi général
- Pédiatrie: santé des enfants
- Cardiologie: problèmes cardiaques
- Gynécologie: santé féminine, grossesse
- Ophtalmologie: problèmes de vue

Services d'urgence:
- Urgences 24/7: accidents, douleurs intenses, difficultés respiratoires
- Maternité: accouchements, grossesse à risque
- Banque de sang: pour transfusions

Langues parlées dans les établissements: français, anglais, peul, soussou, malinké

Restez toujours professionnel, empathique et clair dans vos réponses.` 
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Trop de requêtes. Veuillez réessayer dans quelques instants." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits insuffisants. Veuillez contacter l'administrateur." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Error in chat-medical function:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Une erreur est survenue" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
