// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const gptClient = () => {
//   const azure_oai_endpoint = process.env.AZURE_OPENAI_ENDPOINT;
//   const azure_oai_key = process.env.AZURE_OPENAI_KEY;

//   if (!azure_oai_endpoint || !azure_oai_key) {
//     throw new Error("Azure OpenAI endpoint or key is missing.");
//   }

//   const client = new OpenAI({
//     apiKey: azure_oai_key,
//     baseURL: `${azure_oai_endpoint}/openai/deployments/gpt-35-turbo-16k`,
//     defaultQuery: { "api-version": "2024-05-01-preview" },
//     defaultHeaders: { "api-key": azure_oai_key },
//   });

//   return client;
// };

// const system_message =
//   "You summarize the conversation between the customer and the agent as answers to these questions in slang Arabic language: 1. What is the customer's problem? 2. What is the agent's solution and how he handled the customer? 3. Had the problem been solved? 4. What is the customer's reaction? 5. What is the customer satisfaction level percentage";

// export async function POST(req: NextRequest) {
//   const { text } = await req.json();

//   try {
//     const client = gptClient();
//     const response = await client.chat.completions.create({
//       model: "gpt-35-turbo-16k", // Ensure this matches your deployment name
//       messages: [
//         { role: "system", content: system_message },
//         {
//           role: "user",
//           content: `Guest-1 : مساء الخير يا فندم. اتشرفت ب آه بسماع صوت حضرتك، آه أقدر أساعدك إزاي؟
// Guest-2 : آه أنا دلوقتي إشتريت أيفون فورتين منكم، وكان في عيب في الشاحن، أقدر بس آ عايز بس أشوف كوست العيب ده، لو كده ينفع إن أنا أرجع الشاحن إللي موجود ولا إيه؟
// Guest-1 : طيب أأأ ثواني مع حضرتك؟ آ الشاحن إللي مع حضرتك هيتكلف آ 100 جنيه تصليح وحضرتك تقدر تزور أي فرع؟
// Guest-1 : طيب منا ممكن أعرف الح العنوان بتاع. بتاع حضرتك؟
// Guest-2 : اه المعادي. اه شغل أرقام بنقبل أرقام اه. بس أنا دلوقتي ليه هيكلفني فلوس؟ هو المفقود فيه عيب جاية من عندكم فيه عيب أنا عايز أعرف بس ليه هيكلفني فلوس؟
// Guest-1 : أأأ؟ عشان ده يا فندم خارج التغطية بتاعتنا، وحضرتك تقدر تشرفنا في أي فرع و.
// Guest-1 : هتلاقي الفرع فرع المعادي ده. هتلاقيه جنبك بالزبط، العمارة رقم إثنين.
// Guest-2 : ماشي، شكرا جد ا.
// Guest-1 : ماشي، شكر ا لحضرتك السلام عليكم.
// Guest-1 : مساء الخير يا فندم. اتشرفت ب آه بسماع صوت حضرتك، آه أقدر أساعدك إزاي؟
// Guest-2 : آه أنا دلوقتي إشتريت أيفون فورتين منكم، وكان في عيب في الشاحن، أقدر بس آ عايز بس أشوف كوست العيب ده، لو كده ينفع إن أنا أرجع الشاحن إللي موجود ولا إيه؟
// Guest-1 : طيب أأأ ثواني مع حضرتك؟ آ الشاحن إللي مع حضرتك هيتكلف آ 100 جنيه تصليح وحضرتك تقدر تزور أي فرع؟
// Guest-1 : طيب منا ممكن أعرف الح العنوان بتاع. بتاع حضرتك؟
// Guest-2 : اه المعادي. اه شغل أرقام بنقبل أرقام اه. بس أنا دلوقتي ليه هيكلفني فلوس؟ هو المفقود فيه عيب جاية من عندكم فيه عيب أنا عايز أعرف بس ليه هيكلفني فلوس؟
// Guest-1 : أأأ؟ عشان ده يا فندم خارج التغطية بتاعتنا، وحضرتك تقدر تشرفنا في أي فرع و.
// Guest-1 : هتلاقي الفرع فرع المعادي ده. هتلاقيه جنبك بالزبط، العمارة رقم إثنين.
// Guest-2 : ماشي، شكرا جد ا.
// Guest-1 : ماشي، شكر ا لحضرتك السلام عليكم.`,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 500,
//     });

//     const full_response = response.choices[0].message.content;
//     return NextResponse.json({ response: full_response });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({ error: { error } }, { status: 500 });
//   }
// }
