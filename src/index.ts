// import { getModelInfo, listFoundationModels } from './01-intro/index.ts';
import { chatWithHistory, generateText } from "./02-text-model/index.ts";
import { registerSignalHandlers } from './utils/index.ts';





export default async function run(): Promise<void> {
  // 01
  // console.log('Foundation Models:', await listFoundationModels());
  // console.log('Model Info:', await getModelInfo('anthropic.claude-opus-4-20250514-v1:0'));

  // 02
  // console.log(await generateText('Tell me a story about a dragon.'));
  // chatWithHistory();
}

registerSignalHandlers();

await run();