import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { rec } = await req.json();

  const response = await fetch(
    `${process.env.AZURE_OAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OAI_DEPLOYMENT}/extensions/chat/completions?api-version=2023-09-01-preview`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OAI_KEY!,
      },
      body: JSON.stringify({
        model: process.env.AZURE_OAI_DEPLOYMENT,
        messages: [{ role: "user", content: rec }],
        temperature: 0.7,
        dataSources: [
          {
            type: "AzureCognitiveSearch",
            parameters: {
              endpoint: process.env.AZURE_SEARCH_ENDPOINT,
              key: process.env.AZURE_SEARCH_KEY,
              indexName: process.env.AZURE_SEARCH_INDEX,
            },
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
