# 书源规则解析器 (Book Source Rule Parser)

一个强大的网页数据提取规则解析引擎，支持多种选择器类型和高级数据处理功能。

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Tests](https://img.shields.io/badge/Tests-199%20cases-brightgreen.svg)](测试报告.md)
[![License](https://img.shields.io/badge/License-PolyForm%20Noncommercial-blue.svg)](LICENSE)

## ⚡ 5分钟快速入门

```javascript
import { RuleEngine } from 'book-source-rule-parser';
const engine = new RuleEngine();

// 📝 示例1: 提取网页标题
const html = '<div class="book"><h1>JavaScript权威指南</h1><p class="author">David Flanagan</p></div>';
const title = await engine.parse(html, '@css:h1@text');
console.log(title.data); // "JavaScript权威指南"

// 🛡️ 示例2: 带回退的安全提取
const safeTitle = await engine.parse(html, '@css:.title@text || @text:未知标题');
console.log(safeTitle.data); // "未知标题"

// 🎨 示例3: 格式化输出
const bookInfo = await engine.parse(html, 
  '@text:《 && @css:h1@text && @text:》作者： && @css:.author@text'
);
console.log(bookInfo.data); // "《JavaScript权威指南》作者：David Flanagan"

// 📊 示例4: JSON数据提取
const json = '{"book":{"title":"Python编程","price":89}}';
const price = await engine.parse(json, '@json:$.book.price');
console.log(price.data); // 89

// 🔢 示例5: 正则提取数字
const text = '价格：￥128.50元';
const number = await engine.parse(text, '@regex:\\d+\\.\\d+');
console.log(number.data); // "128.50"
```

**💡 更多示例**: [examples/](examples/) | **📖 完整文档**: [DOCS_NAVIGATION.md](DOCS_NAVIGATION.md) | **🤖 AI辅助**: [LLM_PROMPT.md](LLM_PROMPT.md)

## 📦 安装

```bash
pnpm install book-source-rule-parser
```

## 🎯 核心特性

| 特性 | 说明 |
|------|------|
| 🎨 **6种选择器** | CSS、XPath、JSON、正则、JS、文本 |
| 🔧 **3种操作符** | 拼接(`&&`)、回退(`\|\|`)、净化(`##`) |
| 🛡️ **容错机制** | 自动回退、空值处理、错误恢复 |
| ⚡ **高性能** | <1ms单次解析、1000次/秒批量处理 |
| ✅ **测试覆盖** | 199个测试用例、100%通过率 |

## 📖 选择器速查表

### CSS选择器 `@css:`
```javascript
'@css:.title@text'              // 提取文本
'@css:img@src'                  // 提取图片链接
'@css:a@href'                   // 提取超链接
'@css:.price@text##\\d+\\.\\d+' // 提取+正则净化
```

### JSON选择器 `@json:`
```javascript
'@json:$.book.title'            // JSONPath语法
'@json:books[0].author'         // 数组访问
'@json:$.items[*].name'         // 提取所有
```

### 正则选择器 `@regex:`
```javascript
'@regex:\\d+\\.\\d+'            // 提取数字
'@regex:ISBN:([\\d-]+)'         // 分组提取
```

### 操作符组合
```javascript
// 拼接 &&
'@css:.title@text && @text:（完整版）'

// 回退 ||  
'@css:.title@text || @text:未知'

// 净化 ##
'@css:.price@text##\\d+\\.\\d+'

// 组合使用
'(@css:.title@text || @text:默认) && @text: - && @css:.author@text'
```

## 💼 实战案例

### 案例1: 电商商品信息提取

```javascript
const productHTML = `
  <div class="product">
    <h1 class="title">iPhone 15 Pro Max</h1>
    <span class="price">￥9999</span>
    <span class="category">手机</span>
    <img src="https://example.com/iphone.jpg" class="cover">
  </div>
`;

// 提取商品卡片
const rule = '@text:【 && @css:.category@text && @text:】 && @css:.title@text && @text: - ￥ && @css:.price@text##\\d+';
const result = await engine.parse(productHTML, rule);
console.log(result.data); 
// "【手机】iPhone 15 Pro Max - ￥9999"
```

### 案例2: 小说章节信息

```javascript
const novelHTML = `
  <div class="chapter">
    <h2 class="title">第1章：开端</h2>
    <span class="time">2024-10-12</span>
    <div class="content">故事从这里开始...</div>
  </div>
`;

// 提取章节信息
const chapterInfo = await engine.parse(novelHTML,
  '@css:.title@text && @text: (更新于 && @css:.time@text && @text:)'
);
console.log(chapterInfo.data);
// "第1章：开端 (更新于 2024-10-12)"
```

### 案例3: JSON API数据

```javascript
const apiResponse = {
  "code": 200,
  "data": {
    "books": [
      {"title": "JavaScript高级程序设计", "price": 99, "author": "Nicholas"},
      {"title": "深入理解计算机系统", "price": 139, "author": "Bryant"}
    ]
  }
};

// 提取第一本书
const book1 = await engine.parse(JSON.stringify(apiResponse),
  '@json:$.data.books[0].title && @text: - && @json:$.data.books[0].author && @text: - ￥ && @json:$.data.books[0].price'
);
console.log(book1.data);
// "JavaScript高级程序设计 - Nicholas - ￥99"

// 提取所有书名
const titles = await engine.parse(JSON.stringify(apiResponse),
  '@json:$.data.books[*].title'
);
console.log(titles.data);
// ["JavaScript高级程序设计", "深入理解计算机系统"]
```

### 案例4: 容错处理

```javascript
const html = '<div class="book"><p class="desc">一本好书</p></div>';

// 多级回退确保有值返回
const rule = `
  @css:.title@text ||
  @css:.name@text ||
  @css:.desc@text ||
  @text:未知书籍
`;

const result = await engine.parse(html, rule);
console.log(result.data); // "一本好书" (前两个不存在，使用第三个)
```

## 🚀 运行示例

项目提供了4个实战示例文件：

```bash
# 基础用法（推荐先看）
pnpm run example:basic

# 电商网站数据提取
pnpm run example:ecommerce

# 小说网站章节提取
pnpm run example:novel

# JSON API数据提取
pnpm run example:json

# 运行所有示例
pnpm run examples
```

示例文件位置：
- [examples/basic-usage.js](examples/basic-usage.js) - 基础用法
- [examples/ecommerce-example.js](examples/ecommerce-example.js) - 电商案例  
- [examples/novel-example.js](examples/novel-example.js) - 小说案例
- [examples/json-example.js](examples/json-example.js) - JSON案例

## 🤖 AI辅助编写规则

将以下提示词提供给 ChatGPT/Claude 等AI助手，让它帮你编写规则：

```
请阅读以下规则语法，帮我编写数据提取规则：
[复制 LLM_PROMPT.md 的内容]

我需要从以下网页提取数据：
[粘贴你的HTML或描述需求]
```

AI文档：
- **[LLM_PROMPT.md](LLM_PROMPT.md)** - 精简版（推荐给AI）
- **[AI_PROMPT_SIMPLE.md](AI_PROMPT_SIMPLE.md)** - 简化版（快速参考）
- **[AI_RULE_WRITING_GUIDE.md](AI_RULE_WRITING_GUIDE.md)** - 详细版（深入学习）

## 📚 文档索引

| 文档 | 说明 | 适用场景 |
|------|------|----------|
| [DOCS_NAVIGATION.md](DOCS_NAVIGATION.md) | 📂 文档导航 | 快速找到所需文档 |
| [examples/README.md](examples/README.md) | 📝 示例说明 | 学习示例代码 |
| [测试报告.md](测试报告.md) | ✅ 测试报告 | 了解测试覆盖 |
| [CHANGELOG.md](CHANGELOG.md) | 📋 更新日志 | 查看版本历史 |

## 🔧 API参考

### 创建引擎

```javascript
const engine = new RuleEngine({
  timeout: 5000,        // 解析超时(ms)
  maxDepth: 10,         // 最大嵌套深度
  enableCache: true,    // 启用缓存
  strictMode: false     // 严格模式
});
```

### 解析方法

```javascript
// 单个规则解析
const result = await engine.parse(source, rule, context);

// 批量解析
const results = await engine.parseBatch(source, {
  title: '@css:.title@text',
  author: '@css:.author@text',
  price: '@css:.price@text##\\d+'
});
```

### 返回结果

```javascript
{
  success: boolean,      // 是否成功
  data: any,            // 提取的数据
  rule: string,         // 使用的规则
  selector: string,     // 选择器类型
  errors?: Array        // 错误信息(可选)
}
```

## ❓ 常见问题

<details>
<summary><b>Q: 拼接操作符 && 的空格要求？</b></summary>

A: 必须用单空格包围：`selector1 && selector2`（正确）

- ❌ `selector1&&selector2` - 缺少空格
- ✅ `selector1 && selector2` - 正确
- ✅ `selector1  && selector2` - 左侧多空格也可以

</details>

<details>
<summary><b>Q: 如何保留 @text 选择器中的空格？</b></summary>

A: @text 会自动保留尾部有意义的空格：
```javascript
'@text: - '  // 输出 " - " (保留空格)
'@text:-'    // 输出 "-"
```
</details>

<details>
<summary><b>Q: 如何调试复杂规则？</b></summary>

A: 分步测试：
1. 先测试每个单独的选择器
2. 再测试操作符组合
3. 使用console.log输出中间结果
4. 参考[examples/](examples/)中的案例
</details>

<details>
<summary><b>Q: 正则表达式为什么要双反斜杠？</b></summary>

A: JavaScript字符串需要转义：
- ❌ `@regex:\d+\.` - 错误
- ✅ `@regex:\\d+\\.` - 正确
</details>

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

```bash
# 开发环境设置
git clone https://github.com/LegadoTeam/legado-rule.git
cd legado-rule
pnpm install

# 运行测试
pnpm test

# 测试覆盖率
pnpm run coverage

# 运行示例
pnpm run examples
```

## 📄 许可证

[PolyForm Noncommercial License](LICENSE) - 仅供非商业使用

## 🙏 致谢

感谢所有贡献者和用户的支持！

---

**⭐ 如果这个项目对你有帮助，请给我们一个 Star！**

[![Star History](https://api.star-history.com/svg?repos=LegadoTeam/legado-rule&type=Date)](https://star-history.com/#LegadoTeam/legado-rule&Date)
