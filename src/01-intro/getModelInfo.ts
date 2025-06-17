import { BedrockClient, GetFoundationModelCommand, type GetFoundationModelCommandOutput } from '@aws-sdk/client-bedrock';
import { getEnvVariable } from '../utils/index.ts';

const defaultRegion = getEnvVariable('DEFAULT_REGION', false);

export async function getModelInfo(
  modelIdentifier: string,
  client = new BedrockClient({ region: defaultRegion }),
): Promise<GetFoundationModelCommandOutput> {
  return await client.send(
    new GetFoundationModelCommand({ modelIdentifier }),
  );
}