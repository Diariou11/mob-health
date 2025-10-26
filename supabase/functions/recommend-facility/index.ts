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
    const { symptoms, facilities } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing symptoms for facility recommendation");

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
            content: `Vous êtes un expert médical qui aide à orienter les patients vers les bons établissements de santé en Guinée.

Analysez les symptômes du patient et recommandez les 3 meilleurs établissements parmi la liste fournie.

Pour chaque recommandation, fournissez:
1. Le nom de l'établissement
2. La raison spécifique pour laquelle cet établissement convient (basé sur les spécialités, services, langues)
3. Le niveau d'urgence (urgent, modéré, non-urgent)

Répondez UNIQUEMENT en JSON avec ce format exact:
{
  "recommendations": [
    {
      "facilityId": 1,
      "reason": "raison détaillée en français",
      "urgency": "urgent|modéré|non-urgent"
    }
  ]
}` 
          },
          { 
            role: "user", 
            content: `Symptômes du patient: ${symptoms}\n\nÉtablissements disponibles:\n${JSON.stringify(facilities, null, 2)}` 
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "recommend_facilities",
              description: "Recommander les meilleurs établissements de santé basés sur les symptômes",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        facilityId: { type: "number" },
                        reason: { type: "string" },
                        urgency: { type: "string", enum: ["urgent", "modéré", "non-urgent"] }
                      },
                      required: ["facilityId", "reason", "urgency"]
                    }
                  }
                },
                required: ["recommendations"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "recommend_facilities" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    const recommendations = toolCall ? JSON.parse(toolCall.function.arguments) : { recommendations: [] };

    console.log("Recommendations generated:", recommendations);

    return new Response(
      JSON.stringify(recommendations), 
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Error in recommend-facility function:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Une erreur est survenue" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
