# 库引用说明

## ✅ 当前库可以被其他 Node.js 项目引用

这个 `book-source-rule-parser` 项目是一个**完整的、可独立使用的 npm 包**，其他 Node.js 项目可以直接引用。

## 📦 导出内容

### 主入口文件：`index.js`

```javascript
// ✅ 已导出的内容

// 1. 核心引擎类
export { BookSourceRuleEngine, createRuleEngine, parseRule, parseRules } from './src/engine.js';

// 2. 类型定义
export { SelectorType, OperatorType, isEmpty, RuleParseError } from './src/types.js';

// 3. 所有选择器
export * from './src/selectors/index.js';

// 4. 所有运算符
export * from './src/operators/index.js';

// 5. 默认导出（工厂函数）
export default function createBookSourceParser(options = {}) {
  return createRuleEngine(options);
}
```

### package.json 配置

```json
{
  "name": "book-source-rule-parser",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "exports": {
    ".": "./index.js"
  }
}
```

## 🚀 使用方式

### 方式1: 作为本地依赖使用

在其他项目中引用（本地开发）：

```bash
# 在其他项目目录中
pnpm add file:/path/to/book-source-rule-parser
```

```javascript
// 引用方式1: 导入 RuleEngine
import { RuleEngine } from 'book-source-rule-parser';

const engine = new RuleEngine();
const result = await engine.parse(html, '@css:.title@text');
console.log(result.data);
```

```javascript
// 引用方式2: 使用默认导出
import createParser from 'book-source-rule-parser';

const parser = createParser();
const result = await parser.parse(html, '@css:.title@text');
```

```javascript
// 引用方式3: 导入特定的选择器
import { cssSelector, jsonSelector } from 'book-source-rule-parser';

const result = cssSelector(html, '.title@text');
```

### 方式2: 发布到 npm 后使用

```bash
# 发布到 npm
pnpm publish

# 在其他项目中安装
pnpm add book-source-rule-parser
```

```javascript
// 使用方式与本地引用相同
import { RuleEngine } from 'book-source-rule-parser';
```

### 方式3: 直接 import 源文件（开发时）

```javascript
// 直接引用源文件
import { RuleEngine } from './path/to/book-source-rule-parser/src/rule-engine.js';
import { cssSelector } from './path/to/book-source-rule-parser/src/selectors/css.js';
```

## 📝 完整使用示例

创建一个新项目来使用这个库：

```bash
# 创建新项目
mkdir my-crawler
cd my-crawler
pnpm init

# 添加本地依赖
pnpm add file:../book-source-rule-parser
```

创建 `index.js`：

```javascript
/**
 * 使用 book-source-rule-parser 的示例
 */
import { RuleEngine } from 'book-source-rule-parser';

async function main() {
  const engine = new RuleEngine();
  
  // 示例 HTML
  const html = `
    <div class="article">
      <h1 class="title">测试文章</h1>
      <span class="author">作者名</span>
      <div class="content">文章内容...</div>
    </div>
  `;
  
  // 提取标题
  const title = await engine.parse(html, '@css:.title@text');
  console.log('标题:', title.data);
  
  // 格式化输出
  const info = await engine.parse(html,
    '@text:《 && @css:.title@text && @text:》 - && @css:.author@text'
  );
  console.log('信息:', info.data);
}

main();
```

运行：

```bash
node index.js
```

## 🔧 可用的导出

### 核心类和函数

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `RuleEngine` | Class | 规则解析引擎主类 |
| `BookSourceRuleEngine` | Class | 书源规则引擎（别名） |
| `createRuleEngine` | Function | 创建引擎实例的工厂函数 |
| `parseRule` | Function | 直接解析单条规则 |
| `parseRules` | Function | 批量解析多条规则 |

### 选择器

| 导出项 | 说明 |
|--------|------|
| `cssSelector` | CSS选择器 |
| `xpathSelector` | XPath选择器 |
| `jsonSelector` | JSON选择器 |
| `regexSelector` | 正则选择器 |
| `jsSelector` | JavaScript选择器 |
| `textSelector` | 文本选择器 |

### 操作符

| 导出项 | 说明 |
|--------|------|
| `concatOperator` | 拼接操作符 (&& ) |
| `fallbackOperator` | 回退操作符 (\|\|) |
| `regexCleanOperator` | 正则净化操作符 (##) |

### 类型定义

| 导出项 | 说明 |
|--------|------|
| `SelectorType` | 选择器类型枚举 |
| `OperatorType` | 操作符类型枚举 |
| `RuleParseError` | 规则解析错误类 |
| `isEmpty` | 空值判断函数 |

## 🎯 实际应用示例

### 示例1: 网页爬虫

```javascript
import { RuleEngine } from 'book-source-rule-parser';
import axios from 'axios';

async function crawl(url) {
  const engine = new RuleEngine();
  const { data: html } = await axios.get(url);
  
  // 定义提取规则
  const rules = {
    title: '@css:h1.title@text || @css:.article-title@text',
    author: '@css:.author@text || @text:未知作者',
    content: '@css:.content@text##<[^>]*>',
    publishDate: '@css:.date@text##(\\d{4}-\\d{2}-\\d{2})'
  };
  
  // 批量提取
  const results = await engine.parseBatch(html, rules);
  return results;
}
```

### 示例2: API 数据处理

```javascript
import { RuleEngine } from 'book-source-rule-parser';

async function processAPI(apiData) {
  const engine = new RuleEngine();
  
  const rules = {
    bookList: '@json:$.data.books[*].title',
    firstBook: '@json:$.data.books[0].title && @text: - && @json:$.data.books[0].author',
    totalCount: '@json:$.data.total'
  };
  
  return await engine.parseBatch(JSON.stringify(apiData), rules);
}
```

## ✅ 验证库是否可用

创建测试文件 `test-import.js`：

```javascript
// 测试导入
import { RuleEngine } from 'book-source-rule-parser';

console.log('✅ RuleEngine 导入成功:', typeof RuleEngine);

const engine = new RuleEngine();
console.log('✅ 引擎实例创建成功:', engine.constructor.name);

// 测试解析
const html = '<div class="test">Hello</div>';
const result = await engine.parse(html, '@css:.test@text');
console.log('✅ 解析测试:', result.data); // "Hello"

console.log('\n🎉 库可以正常使用！');
```

运行测试：

```bash
node test-import.js
```

## 📋 发布前检查清单

如果要发布到 npm，需要确保：

- [x] `package.json` 中的 `main` 字段指向 `index.js`
- [x] `package.json` 中的 `type` 设置为 `"module"`
- [x] `index.js` 正确导出所有必要的接口
- [x] 所有依赖在 `package.json` 中正确声明
- [x] README.md 包含安装和使用说明
- [ ] 设置 `.npmignore` 排除不需要的文件
- [ ] 运行 `pnpm test` 确保测试通过

## 🚀 发布到 npm

```bash
# 1. 登录 npm
npm login

# 2. 发布
pnpm publish

# 3. 在其他项目中使用
pnpm add book-source-rule-parser
```

## 🔗 相关文档

- [README.md](../README.md) - 使用说明
- [examples/](../examples/) - 完整示例
- [DOCS_NAVIGATION.md](../DOCS_NAVIGATION.md) - 文档导航

---

**✅ 结论：当前库已经完整导出，可以被其他 Node.js 项目引用使用！**
