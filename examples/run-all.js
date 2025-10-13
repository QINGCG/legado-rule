/**
 * 运行所有示例
 * 自动执行所有示例文件并展示结果
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const examples = [
  'basic-usage.js',
  'ecommerce-example.js',
  'novel-example.js',
  'json-example.js'
];

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║         书源规则解析器 - 示例文件执行器               ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

async function runExample(filename) {
  return new Promise((resolve, reject) => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📝 运行示例: ${filename}`);
    console.log('='.repeat(60));
    
    const examplePath = join(__dirname, filename);
    const child = spawn('node', [examplePath], {
      stdio: 'inherit',
      shell: true
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${filename} 执行成功\n`);
        resolve();
      } else {
        console.log(`\n❌ ${filename} 执行失败 (退出码: ${code})\n`);
        reject(new Error(`${filename} failed with code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      console.log(`\n❌ ${filename} 执行出错: ${error.message}\n`);
      reject(error);
    });
  });
}

async function runAllExamples() {
  console.log(`准备运行 ${examples.length} 个示例文件...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const example of examples) {
    try {
      await runExample(example);
      successCount++;
    } catch (error) {
      failCount++;
      console.error(`跳过剩余示例，因为 ${example} 失败`);
      break;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 执行总结');
  console.log('='.repeat(60));
  console.log(`✅ 成功: ${successCount}/${examples.length}`);
  console.log(`❌ 失败: ${failCount}/${examples.length}`);
  console.log('='.repeat(60) + '\n');
  
  if (failCount === 0) {
    console.log('🎉 所有示例执行成功！\n');
  } else {
    console.log('⚠️  部分示例执行失败，请检查错误信息。\n');
    process.exit(1);
  }
}

runAllExamples().catch(error => {
  console.error('❌ 执行过程中出现错误:', error);
  process.exit(1);
});
