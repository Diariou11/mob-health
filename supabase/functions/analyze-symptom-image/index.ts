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
    const { imageBase64, description } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing symptom image with Vision AI");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { 
            role: "system", 
            content: `Vous êtes un assistant médical visuel pour MOB-Health Africa en Guinée.

IMPORTANT: Répondez TOUJOURS en français.

Votre rôle:
- Analyser les images de symptômes visuels (éruptions cutanées, blessures, etc.)
- Fournir une description détaillée de ce que vous observez
- Suggérer les types de spécialistes à consulter
- Indiquer le niveau d'urgence

AVERTISSEMENTS OBLIGATOIRES:
- Vous ne posez PAS de diagnostic médical
- Cette analyse est PRÉLIMINAIRE uniquement
- Une consultation médicale en personne est TOUJOURS nécessaire
- En cas de symptômes graves, recommandez une consultation immédiate

Format de réponse:
1. Observations visuelles
2. Questions à poser au médecin
3. Type de spécialiste recommandé
4. Niveau d'urgence (urgent, modéré, non-urgent)
5. Conseils généraux de premiers soins si applicable` 
          },
          { 
            role: "user", 
            content: [
              {
                type: "text",
                text: description || "Veuillez analyser cette image de symptôme."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
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

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content;

    console.log("Image analysis completed");

    return new Response(
      JSON.stringify({ analysis }), 
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Error in analyze-symptom-image function:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Une erreur est survenue" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
