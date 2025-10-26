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
    const { text, targetLanguage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Translating to ${targetLanguage}`);

    const languageMap: Record<string, string> = {
      'fr': 'français',
      'en': 'anglais',
      'peul': 'peul (fulfulde)',
      'soussou': 'soussou',
      'malinke': 'malinké'
    };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { 
            role: "system", 
            content: `Vous êtes un traducteur expert pour les langues parlées en Guinée. Traduisez le texte fourni en ${languageMap[targetLanguage] || targetLanguage}. Fournissez UNIQUEMENT la traduction, sans explications.` 
          },
          { 
            role: "user", 
            content: text 
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const translation = data.choices?.[0]?.message?.content || text;

    console.log("Translation completed");

    return new Response(
      JSON.stringify({ translation }), 
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Error in translate function:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Une erreur est survenue", translation: null }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
