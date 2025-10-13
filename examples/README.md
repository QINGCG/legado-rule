# 示例文件说明

本目录包含了 `book-source-rule-parser` 规则引擎的各种使用示例。

## 📁 示例文件列表

### 1. basic-usage.js
**基础用法示例**

展示各种选择器的基本使用方法：
- CSS 选择器
- JSON 选择器
- 正则表达式选择器
- 文本选择器
- 操作符组合（拼接、回退、净化）

适合新手入门学习。

**运行命令**：
```bash
node examples/basic-usage.js
```

### 2. ecommerce-example.js
**电商网站数据提取案例**

模拟真实电商网站的数据提取场景：
- 商品标题和分类
- 价格信息提取和格式化
- 商品规格和属性
- 图片链接提取
- 库存和销量信息
- 用户评价数据
- 完整商品信息卡片生成

**运行命令**：
```bash
node examples/ecommerce-example.js
```

### 3. novel-example.js
**小说网站章节提取案例**

针对小说阅读网站的数据提取：
- 小说基本信息（书名、作者、状态）
- 章节列表提取
- 最新章节获取
- 章节内容提取
- 统计数据（阅读量、收藏量）
- 章节导航链接
- 综合书源规则配置

**运行命令**：
```bash
node examples/novel-example.js
```

### 4. json-example.js
**JSON 数据提取示例**

展示如何从 API 返回的 JSON 数据中提取信息：
- 基础字段提取
- 嵌套对象访问
- 数组元素提取
- JSONPath 高级用法
- 复杂数据结构处理
- JSON 书源规则配置

**运行命令**：
```bash
node examples/json-example.js
```

## 🚀 快速开始

### 安装依赖
```bash
pnpm install
```

### 运行所有示例
```bash
# 基础示例
pnpm run example:basic

# 电商示例
pnpm run example:ecommerce

# 小说示例
pnpm run example:novel

# JSON示例
pnpm run example:json

# 或直接运行文件
node examples/basic-usage.js
node examples/ecommerce-example.js
node examples/novel-example.js
node examples/json-example.js
```

## 📖 学习路径

推荐按以下顺序学习：

1. **basic-usage.js** - 了解基础语法和各种选择器
2. **json-example.js** - 学习 JSON 数据提取
3. **ecommerce-example.js** - 实战电商场景
4. **novel-example.js** - 实战小说网站场景

## 💡 核心概念

### 选择器类型
- `@css:` - CSS 选择器，用于 HTML
- `@json:` - JSON 路径，用于 JSON 数据
- `@regex:` - 正则表达式匹配
- `@js:` - JavaScript 自定义逻辑
- `@xpath:` - XPath 表达式
- `@text:` - 固定文本输出

### 操作符
- `&&` - 拼接多个结果
- `||` - 回退机制（失败时尝试下一个）
- `##` - 正则净化

### 常用模式
```javascript
// 基础提取
'@css:.title@text'

// 带回退
'@css:.title@text || @text:默认标题'

// 格式化输出
'@text:书名： && @css:.title@text'

// 正则净化
'@css:.price@text##\\d+\\.\\d+'
```

## 🔧 自定义示例

您可以基于这些示例创建自己的规则：

```javascript
import { RuleEngine } from '../index.js';

const engine = new RuleEngine();
const html = '<div class="title">示例标题</div>';

const result = await engine.parse(html, '@css:.title@text');
console.log(result.data); // "示例标题"
```

## 📚 更多资源

- [README.md](../README.md) - 完整文档
- [AI_PROMPT_SIMPLE.md](../AI_PROMPT_SIMPLE.md) - AI 提示词指南
- [测试报告.md](../测试报告.md) - 测试用例详解

## ❓ 常见问题

### Q: 为什么拼接操作符要用空格？
A: `&&` 必须用单空格包围（` && `），这是语法要求。

### Q: 如何处理动态内容？
A: 使用 `@js:` 选择器执行自定义 JavaScript 代码。

### Q: 提取失败怎么办？
A: 使用 `||` 操作符提供回退方案，确保总能返回有效数据。

## 🤝 贡献

欢迎提交更多实用示例！如果您有好的使用案例，请：
1. Fork 本项目
2. 创建您的示例文件
3. 提交 Pull Request

---

**Happy Coding! 🎉**
