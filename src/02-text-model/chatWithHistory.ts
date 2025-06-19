import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { getEnvVariable } from '../utils/index.ts';

const defaultRegion = getEnvVariable('DEFAULT_REGION', false);

type HumanMessage = `User: ${string}`;
type AssistantMessage = `Bot: ${string}`;
type ChatHistory = (HumanMessage | AssistantMessage)[];

export function chatWithHistory() {
  const client = new BedrockRuntimeClient({ region: defaultRegion });
  const modelId = 'amazon.titan-text-express-v1';

  const chatHistory: ChatHistory = [];

  console.log('Chatbot is ready. Type a message to start the conversation.');

  process.stdin.addListener('data', async (input) => {
    const userInput = input.toString().trim();
    chatHistory.push(`User: ${userInput}`);

    const response = await client.send(new InvokeModelCommand({
      modelId,
      body: JSON.stringify(getConfiguration(chatHistory)),
      contentType: 'application/json',
      accept: 'application/json',
    }));

    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const outputText = responseBody.results[0].outputText satisfies AssistantMessage;
    chatHistory.push(outputText);
    console.log(outputText);
  });
}


function getConfiguration(chatHistory: ChatHistory) {
  return {
    inputText: chatHistory.join('\n'),
    textGenerationConfig: {
      maxTokenCount: 4096,
      stopSequences: [],
      temperature: 0,
      topP: 1,
    },
  };
}