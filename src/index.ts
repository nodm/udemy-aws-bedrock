import { getModelInfo, listFoundationModels } from './01-intro/index.ts';
import { registerSignalHandlers } from './utils/index.ts';

export default async function run(): Promise<void> {
  console.log('Foundation Models:', await listFoundationModels());
  console.log('Model Info:', await getModelInfo('anthropic.claude-opus-4-20250514-v1:0'));
}

registerSignalHandlers();

await run();