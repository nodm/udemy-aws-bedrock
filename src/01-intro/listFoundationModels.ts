import { BedrockClient, ListFoundationModelsCommand, type ListFoundationModelsCommandOutput } from '@aws-sdk/client-bedrock';
import { getEnvVariable } from '../utils/index.ts';

const defaultRegion = getEnvVariable('DEFAULT_REGION', false);

export async function listFoundationModels(
  client = new BedrockClient({ region: defaultRegion })
): Promise<ListFoundationModelsCommandOutput> {
  return await client.send(new ListFoundationModelsCommand({}));
}