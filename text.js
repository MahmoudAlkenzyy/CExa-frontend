// "use strict";

// const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// // This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT"
// const key = process.env.LANGUAGE_KEY;
// const endpoint = process.env.LANGUAGE_ENDPOINT;

// //an example document for entity recognition
// const documents = [ "Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975, to develop and sell BASIC interpreters for the Altair 8800"];

// //example of how to use the client library to recognize entities in a document.
// async function main() {
//     console.log("== NER sample ==");

//     const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(key));

//     const results = await client.analyze("EntityRecognition", documents);

//     for (const result of results) {
//       console.log(- Document ${result.id});
//       if (!result.error) {
//         console.log("\tRecognized Entities:");
//         for (const entity of result.entities) {
//           console.log(\t- Entity ${entity.text} of type ${entity.category});
//         }
//       } else console.error("\tError:", result.error);
//     }
//   }

// //call the main function
// main().catch((err) => {
//     console.error("The sample encountered an error:", err);
// });
