import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { TextDecoder } from 'node:util';
import { getEnvVariable } from '../utils/index.ts';

const defaultRegion = getEnvVariable('DEFAULT_REGION', false);

export async function generateText(inputText: string, region = defaultRegion) {
  const client = new BedrockRuntimeClient({ region });
  const titanConfig = {
    inputText,
    textGenerationConfig: {
      temperature: 0,
      topP: 1,
      maxTokenCount: 1024,
      stopSequences: [],
    },
  };
  const modelId = 'amazon.titan-text-express-v1';

  const response = await client.send(new InvokeModelCommand({
    modelId,
    body: JSON.stringify(titanConfig),
    contentType: 'application/json',
    accept: 'application/json',
  }));

  const responseBody = JSON.parse(new TextDecoder().decode(response.body));

  return responseBody;
}