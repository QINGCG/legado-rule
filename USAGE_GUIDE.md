# book-source-rule-parser 完整使用指南

> 一个功能强大的网页数据提取规则解析引擎，支持多种选择器类型和高级数据处理功能。

[![npm version](https://img.shields.io/npm/v/book-source-rule-parser.svg)](https://www.npmjs.com/package/book-source-rule-parser)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Tests](https://img.shields.io/badge/Tests-199%20cases-brightgreen.svg)](测试报告.md)

## 📋 目录

- [安装](#-安装)
- [快速开始](#-快速开始)
- [核心概念](#-核心概念)
- [选择器详解](#-选择器详解)
- [操作符详解](#-操作符详解)
- [API 参考](#-api-参考)
- [高级用法](#-高级用法)
- [实战案例](#-实战案例)
- [性能优化](#-性能优化)
- [错误处理](#-错误处理)
- [常见问题](#-常见问题)

---

## 📦 安装

### 使用 pnpm（推荐）

```bash
pnpm add book-source-rule-parser
```

### 使用 npm

```bash
npm install book-source-rule-parser
```

### 使用 yarn

```bash
yarn add book-source-rule-parser
```

### 系统要求

- **Node.js**: 18.0.0 或更高版本
- **包管理器**: pnpm 8+ / npm 9+ / yarn 3+
- **模块系统**: ES Modules (ESM)

---

## 🚀 快速开始

### 基础示例

```javascript
import { RuleEngine } from 'book-source-rule-parser';

// 1. 创建引擎实例
const engine = new RuleEngine();

// 2. 准备数据源
const html = `
  <div class="book">
    <h1 class="title">JavaScript权威指南</h1>
    <span class="author">David Flanagan</span>
    <span class="price">￥128.00</span>
  </div>
`;

// 3. 提取数据
const title = await engine.parse(html, '@css:.title@text');
console.log(title.data); // "JavaScript权威指南"

const author = await engine.parse(html, '@css:.author@text');
console.log(author.data); // "David Flanagan"

const price = await engine.parse(html, '@css:.price@text##\\d+\\.\\d+');
console.log(price.data); // "128.00"
```

### 30秒上手

```javascript
import { RuleEngine } from 'book-source-rule-parser';

const engine = new RuleEngine();

// CSS 选择器
await engine.parse(html, '@css:.title@text');

// JSON 选择器
await engine.parse(json, '@json:$.book.title');

// 正则表达式
await engine.parse(text, '@regex:\\d+');

// 操作符组合
await engine.parse(html, '@css:.title@text && @text: - && @css:.author@text');
```

---

## 🎯 核心概念

### 规则语法结构

```
[@选择器类型:选择器表达式@属性] [操作符] [@选择器类型:选择器表达式@属性]
```

#### 组成部分

1. **选择器类型**: `@css:`, `@json:`, `@regex:`, `@xpath:`, `@js:`, `@text:`
2. **选择器表达式**: 具体的选择器语法（如 `.title`, `$.book.name`）
3. **属性提取**: `@text`, `@href`, `@src`, `@html` 等
4. **操作符**: `&&` (拼接), `||` (回退), `##` (净化)

#### 示例分解

```javascript
'@css:.title@text && @text: - && @css:.author@text'
 └─┬─┘ └──┬──┘└┬┘  └┬┘ └──┬──┘ └─┬─┘ └──┬──┘└┬┘
   │      │    │    │     │      │      │    │
   │      │    │    │     │      │      │    └─ 属性
   │      │    │    │     │      │      └────── 选择器
   │      │    │    │     │      └───────────── 选择器类型
   │      │    │    │     └──────────────────── 文本内容
   │      │    │    └────────────────────────── 拼接操作符
   │      │    └─────────────────────────────── 属性
   │      └──────────────────────────────────── 选择器
   └─────────────────────────────────────────── 选择器类型
```

### 数据流

```
输入数据 → 选择器 → 属性提取 → 操作符处理 → 输出结果
```

---

## 📖 选择器详解

### 1. CSS 选择器 `@css:`

基于 [cheerio](https://cheerio.js.org/) 实现，支持完整的 CSS 选择器语法。

#### 语法

```
@css:CSS选择器[@属性]
```

#### 支持的属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `@text` | 提取文本内容 | `@css:.title@text` |
| `@html` | 提取HTML内容 | `@css:.content@html` |
| `@href` | 提取链接 | `@css:a@href` |
| `@src` | 提取图片源 | `@css:img@src` |
| `@class` | 提取class属性 | `@css:div@class` |
| `@id` | 提取id属性 | `@css:div@id` |
| `@data-*` | 提取data属性 | `@css:div@data-id` |
| 任意属性 | 提取任意HTML属性 | `@css:input@value` |

#### 示例

```javascript
const html = `
  <article class="post">
    <h1 class="title">文章标题</h1>
    <a href="https://example.com" class="link">查看详情</a>
    <img src="/image.jpg" alt="图片">
    <div class="content">
      <p>段落1</p>
      <p>段落2</p>
    </div>
    <span data-id="123" data-type="article">元数据</span>
  </article>
`;

// 提取文本
await engine.parse(html, '@css:.title@text');
// → "文章标题"

// 提取链接
await engine.parse(html, '@css:a@href');
// → "https://example.com"

// 提取图片
await engine.parse(html, '@css:img@src');
// → "/image.jpg"

// 提取HTML
await engine.parse(html, '@css:.content@html');
// → "<p>段落1</p><p>段落2</p>"

// 提取data属性
await engine.parse(html, '@css:span@data-id');
// → "123"

// 复杂选择器
await engine.parse(html, '@css:.content p:first-child@text');
// → "段落1"

// 多个元素（返回数组）
await engine.parse(html, '@css:.content p@text');
// → ["段落1", "段落2"]
```

#### 高级用法

```javascript
// 父子关系
'@css:article > h1@text'

// 兄弟关系
'@css:.title + a@href'

// 属性选择器
'@css:a[target="_blank"]@href'

// 伪类选择器
'@css:li:nth-child(2)@text'
'@css:p:first-of-type@text'

// 组合选择器
'@css:.post .title, .post .subtitle@text'
```

---

### 2. JSON 选择器 `@json:`

基于 [JSONPath](https://github.com/JSONPath-Plus/JSONPath) 实现，支持复杂的 JSON 数据提取。

#### 语法

```
@json:JSONPath表达式
```

#### JSONPath 语法速查

| 表达式 | 说明 | 示例 |
|--------|------|------|
| `$` | 根对象 | `$.book` |
| `.` | 子节点 | `$.book.title` |
| `[]` | 数组访问 | `$.books[0]` |
| `[*]` | 所有数组元素 | `$.books[*].title` |
| `[start:end]` | 数组切片 | `$.books[0:3]` |
| `..` | 递归搜索 | `$..title` |
| `@` | 当前节点 | `$.books[?(@.price<100)]` |
| `?()` | 过滤表达式 | `$.books[?(@.price>50)]` |

#### 示例

```javascript
const json = {
  "store": {
    "book": [
      {
        "title": "JavaScript权威指南",
        "author": "David Flanagan",
        "price": 128,
        "category": "programming"
      },
      {
        "title": "Python编程",
        "author": "Mark Lutz",
        "price": 99,
        "category": "programming"
      },
      {
        "title": "活着",
        "author": "余华",
        "price": 35,
        "category": "fiction"
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 399
    }
  }
};

const jsonStr = JSON.stringify(json);

// 基础访问
await engine.parse(jsonStr, '@json:$.store.bicycle.color');
// → "red"

// 数组访问
await engine.parse(jsonStr, '@json:$.store.book[0].title');
// → "JavaScript权威指南"

// 提取所有书名
await engine.parse(jsonStr, '@json:$.store.book[*].title');
// → ["JavaScript权威指南", "Python编程", "活着"]

// 数组切片
await engine.parse(jsonStr, '@json:$.store.book[0:2].title');
// → ["JavaScript权威指南", "Python编程"]

// 递归搜索
await engine.parse(jsonStr, '@json:$..price');
// → [128, 99, 35, 399]

// 过滤 - 价格小于100的书
await engine.parse(jsonStr, '@json:$.store.book[?(@.price<100)].title');
// → ["Python编程", "活着"]

// 过滤 - 编程类书籍
await engine.parse(jsonStr, '@json:$.store.book[?(@.category=="programming")].title');
// → ["JavaScript权威指南", "Python编程"]
```

#### API 响应示例

```javascript
const apiResponse = {
  "code": 200,
  "message": "success",
  "data": {
    "user": {
      "id": 1001,
      "name": "张三",
      "email": "zhangsan@example.com"
    },
    "posts": [
      { "id": 1, "title": "第一篇文章", "likes": 100 },
      { "id": 2, "title": "第二篇文章", "likes": 250 },
      { "id": 3, "title": "第三篇文章", "likes": 80 }
    ]
  }
};

const jsonStr = JSON.stringify(apiResponse);

// 提取用户名
await engine.parse(jsonStr, '@json:$.data.user.name');
// → "张三"

// 提取所有文章标题
await engine.parse(jsonStr, '@json:$.data.posts[*].title');
// → ["第一篇文章", "第二篇文章", "第三篇文章"]

// 提取点赞超过100的文章
await engine.parse(jsonStr, '@json:$.data.posts[?(@.likes>100)].title');
// → ["第二篇文章"]
```

---

### 3. 正则选择器 `@regex:`

基于 JavaScript 原生正则表达式实现。

#### 语法

```
@regex:正则表达式
```

#### 示例

```javascript
// 提取数字
const text1 = '价格：128.50元';
await engine.parse(text1, '@regex:\\d+\\.\\d+');
// → "128.50"

// 提取整数
const text2 = '共有 1234 个结果';
await engine.parse(text2, '@regex:\\d+');
// → "1234"

// 提取中文
const text3 = 'Hello世界World';
await engine.parse(text3, '@regex:[\\u4e00-\\u9fa5]+');
// → "世界"

// 提取邮箱
const text4 = '联系邮箱：support@example.com';
await engine.parse(text4, '@regex:[\\w.-]+@[\\w.-]+\\.\\w+');
// → "support@example.com"

// 提取URL
const text5 = '访问 https://example.com/page 查看详情';
await engine.parse(text5, '@regex:https?://[\\w./]+');
// → "https://example.com/page"

// 提取ISBN
const text6 = 'ISBN: 978-7-115-12345-6';
await engine.parse(text6, '@regex:ISBN:\\s*([\\d-]+)');
// → "978-7-115-12345-6" (第一个捕获组)

// 提取日期
const text7 = '发布时间：2024-10-13';
await engine.parse(text7, '@regex:\\d{4}-\\d{2}-\\d{2}');
// → "2024-10-13"
```

#### 常用正则模式

```javascript
// 数字相关
'@regex:\\d+'                          // 整数
'@regex:\\d+\\.\\d+'                   // 小数
'@regex:[+-]?\\d+\\.?\\d*'             // 正负数

// 文本相关
'@regex:[\\u4e00-\\u9fa5]+'            // 中文
'@regex:[a-zA-Z]+'                     // 英文
'@regex:[a-zA-Z0-9]+'                  // 字母数字

// 联系方式
'@regex:\\d{11}'                       // 手机号
'@regex:[\\w.-]+@[\\w.-]+\\.\\w+'      // 邮箱
'@regex:https?://[^\\s]+'              // URL

// 日期时间
'@regex:\\d{4}-\\d{2}-\\d{2}'          // 日期 YYYY-MM-DD
'@regex:\\d{2}:\\d{2}:\\d{2}'          // 时间 HH:MM:SS

// 特殊格式
'@regex:ISBN:\\s*([\\d-]+)'            // ISBN
'@regex:#[0-9A-Fa-f]{6}'               // 颜色代码
```

#### 注意事项

⚠️ **反斜杠转义**：JavaScript 字符串中需要双反斜杠

```javascript
// ❌ 错误
'@regex:\d+'

// ✅ 正确
'@regex:\\d+'
```

---

### 4. XPath 选择器 `@xpath:`

基于 [xpath](https://www.npmjs.com/package/xpath) 实现，支持标准 XPath 1.0 语法。

#### 语法

```
@xpath:XPath表达式[@属性]
```

#### 示例

```javascript
const html = `
  <bookstore>
    <book category="programming">
      <title lang="en">JavaScript Guide</title>
      <author>David</author>
      <price>128</price>
    </book>
    <book category="fiction">
      <title lang="zh">活着</title>
      <author>余华</author>
      <price>35</price>
    </book>
  </bookstore>
`;

// 提取所有书名
await engine.parse(html, '@xpath://book/title/text()');
// → ["JavaScript Guide", "活着"]

// 提取第一本书的标题
await engine.parse(html, '@xpath://book[1]/title/text()');
// → "JavaScript Guide"

// 提取编程类书籍
await engine.parse(html, '@xpath://book[@category="programming"]/title/text()');
// → "JavaScript Guide"

// 提取价格大于50的书
await engine.parse(html, '@xpath://book[price>50]/title/text()');
// → "JavaScript Guide"

// 提取属性
await engine.parse(html, '@xpath://title/@lang');
// → ["en", "zh"]
```

#### 常用 XPath 表达式

| 表达式 | 说明 |
|--------|------|
| `//node` | 选择所有 node 节点 |
| `/node` | 从根节点选择 |
| `//node[@attr]` | 有 attr 属性的节点 |
| `//node[@attr='value']` | 属性值等于 value |
| `//node[position()=1]` | 第一个节点 |
| `//node[last()]` | 最后一个节点 |
| `//node/text()` | 节点的文本内容 |
| `//node/@attr` | 节点的属性值 |

---

### 5. JavaScript 选择器 `@js:`

执行自定义 JavaScript 代码进行数据提取。

#### 语法

```
@js:JavaScript表达式
```

#### 示例

```javascript
// 字符串操作
await engine.parse('hello world', '@js:this.toUpperCase()');
// → "HELLO WORLD"

// 数组操作
await engine.parse('[1,2,3,4,5]', '@js:this.filter(x => x > 3)');
// → [4, 5]

// JSON 操作
const json = '{"name":"张三","age":25}';
await engine.parse(json, '@js:JSON.parse(this).name');
// → "张三"

// 字符串切割
await engine.parse('a,b,c,d', '@js:this.split(",")');
// → ["a", "b", "c", "d"]

// 数学计算
await engine.parse('100', '@js:parseInt(this) * 1.1');
// → 110
```

#### 注意事项

⚠️ **安全警告**：`@js:` 会执行任意代码，请确保输入来源可信！

---

### 6. 文本选择器 `@text:`

直接返回指定的文本内容，通常用于拼接操作。

#### 语法

```
@text:文本内容
```

#### 示例

```javascript
// 单独使用
await engine.parse('', '@text:默认值');
// → "默认值"

// 拼接使用
await engine.parse(html, '@css:.title@text && @text:（完整版）');
// → "书名（完整版）"

// 格式化
await engine.parse(html, 
  '@text:【 && @css:.category@text && @text:】 && @css:.title@text'
);
// → "【小说】书名"

// 特殊字符
await engine.parse('', '@text: - ');  // 保留空格
await engine.parse('', '@text:');     // 空字符串
```

---

## 🔧 操作符详解

### 1. 拼接操作符 `&&`

将多个选择器的结果拼接成一个字符串。

#### 语法规则

- 必须用**单个空格**包围：`选择器1 && 选择器2`
- 支持多个拼接：`选择器1 && 选择器2 && 选择器3`
- 任一选择器失败则整体失败

#### 示例

```javascript
const html = `
  <div class="book">
    <h1 class="title">JavaScript权威指南</h1>
    <span class="author">David Flanagan</span>
    <span class="price">￥128.00</span>
  </div>
`;

// 简单拼接
await engine.parse(html, '@css:.title@text && @text: - && @css:.author@text');
// → "JavaScript权威指南 - David Flanagan"

// 格式化书名
await engine.parse(html,
  '@text:《 && @css:.title@text && @text:》 && @text:作者： && @css:.author@text'
);
// → "《JavaScript权威指南》作者：David Flanagan"

// 多字段拼接
await engine.parse(html,
  '@css:.title@text && @text: | && @css:.author@text && @text: | ￥ && @css:.price@text##\\d+\\.\\d+'
);
// → "JavaScript权威指南 | David Flanagan | ￥128.00"
```

#### 空格处理

```javascript
// ❌ 错误写法
'@css:.title@text&&@css:.author@text'           // 缺少空格
'@css:.title@text  &&  @css:.author@text'       // 多余空格

// ✅ 正确写法
'@css:.title@text && @css:.author@text'         // 标准格式
'@css:.title@text  && @css:.author@text'        // 左侧多空格（可以）
```

---

### 2. 回退操作符 `||`

当前面的选择器失败时，尝试后面的选择器，实现容错机制。

#### 语法规则

- 必须用**单个空格**包围：`选择器1 || 选择器2`
- 支持多级回退：`选择器1 || 选择器2 || 选择器3`
- 从左到右依次尝试，返回第一个成功的结果

#### 示例

```javascript
const html = '<div class="book"><p class="desc">一本好书</p></div>';

// 二级回退
await engine.parse(html, '@css:.title@text || @css:.name@text');
// → null (两个都不存在)

// 三级回退
await engine.parse(html, '@css:.title@text || @css:.name@text || @css:.desc@text');
// → "一本好书" (使用第三个)

// 提供默认值
await engine.parse(html, '@css:.title@text || @text:未知标题');
// → "未知标题"

// 多字段容错
await engine.parse(html,
  '(@css:.title@text || @css:.name@text || @text:未知) && @text: - && (@css:.author@text || @text:佚名)'
);
// → "未知 - 佚名"
```

#### 实战应用

```javascript
// 电商网站标题提取（不同网站结构不同）
const titleRule = `
  @css:h1.product-title@text ||
  @css:.product-name@text ||
  @css:#productTitle@text ||
  @xpath://h1[@class='title']/text() ||
  @text:商品标题未找到
`;

// API 数据提取（兼容不同版本）
const priceRule = `
  @json:$.data.price ||
  @json:$.product.price ||
  @json:$.info.salePrice ||
  @text:0
`;
```

---

### 3. 正则净化操作符 `##`

使用正则表达式清理或提取匹配的内容。

#### 语法规则

```
选择器##正则表达式
```

#### 示例

```javascript
// 提取数字
const html = '<span class="price">价格：￥128.50元</span>';
await engine.parse(html, '@css:.price@text##\\d+\\.\\d+');
// → "128.50"

// 清除HTML标签
const html2 = '<div>这是<strong>重要</strong>内容</div>';
await engine.parse(html2, '@css:div@html##<[^>]*>');
// → "这是重要内容"

// 提取日期
const text = '发布于2024年10月13日';
await engine.parse(text, '@text:发布于2024年10月13日##\\d{4}年\\d{2}月\\d{2}日');
// → "2024年10月13日"

// 提取括号内容
const text2 = '书名（第二版）';
await engine.parse(text2, '@text:书名（第二版）##（[^）]+）');
// → "（第二版）"
```

#### 组合使用

```javascript
// 先提取，再净化
await engine.parse(html,
  '@css:.price@text##\\d+\\.\\d+ && @text:元'
);
// → "128.50元"

// 多次净化
await engine.parse(html,
  '@css:.content@html##<script[^>]*>.*?</script>##<style[^>]*>.*?</style>##<[^>]*>'
);
// → 清除 script、style 和其他标签
```

---

## 📚 API 参考

### RuleEngine 类

#### 构造函数

```javascript
const engine = new RuleEngine(options);
```

##### 参数：`options` (可选)

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `timeout` | Number | `5000` | 解析超时时间(ms) |
| `maxDepth` | Number | `10` | 最大递归深度 |
| `enableCache` | Boolean | `true` | 启用结果缓存 |
| `strictMode` | Boolean | `false` | 严格模式（抛出错误而非返回null） |
| `cacheSize` | Number | `100` | 缓存大小限制 |

##### 示例

```javascript
// 默认配置
const engine = new RuleEngine();

// 自定义配置
const engine = new RuleEngine({
  timeout: 10000,        // 10秒超时
  maxDepth: 20,          // 最大20层嵌套
  enableCache: false,    // 禁用缓存
  strictMode: true       // 严格模式
});
```

---

### 解析方法

#### `parse(source, rule, context)`

解析单个规则。

##### 参数

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `source` | String | ✅ | 数据源（HTML/JSON/文本） |
| `rule` | String | ✅ | 规则表达式 |
| `context` | Object | ❌ | 上下文数据（可选） |

##### 返回值

```typescript
{
  success: boolean,      // 是否成功
  data: any,            // 提取的数据
  rule: string,         // 使用的规则
  selector: string,     // 选择器类型
  errors?: Array        // 错误信息（失败时）
}
```

##### 示例

```javascript
const result = await engine.parse(html, '@css:.title@text');

console.log(result.success);  // true
console.log(result.data);     // "提取的内容"
console.log(result.selector); // "css"
console.log(result.rule);     // "@css:.title@text"
```

---

#### `parseBatch(source, rules, context)`

批量解析多个规则。

##### 参数

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `source` | String | ✅ | 数据源 |
| `rules` | Object | ✅ | 规则对象 `{key: rule}` |
| `context` | Object | ❌ | 上下文数据 |

##### 返回值

```typescript
{
  [key: string]: {
    success: boolean,
    data: any,
    rule: string,
    selector: string,
    errors?: Array
  }
}
```

##### 示例

```javascript
const results = await engine.parseBatch(html, {
  title: '@css:.title@text',
  author: '@css:.author@text',
  price: '@css:.price@text##\\d+',
  cover: '@css:img@src'
});

console.log(results.title.data);   // "书名"
console.log(results.author.data);  // "作者"
console.log(results.price.data);   // "128"
console.log(results.cover.data);   // "/cover.jpg"
```

---

#### `parseArray(source, itemRule, fieldRules, context)`

提取列表数据（如商品列表、文章列表）。

##### 参数

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `source` | String | ✅ | 数据源 |
| `itemRule` | String | ✅ | 列表项选择器 |
| `fieldRules` | Object | ✅ | 字段提取规则 |
| `context` | Object | ❌ | 上下文数据 |

##### 示例

```javascript
const html = `
  <ul class="book-list">
    <li class="book">
      <h3 class="title">书1</h3>
      <span class="price">¥99</span>
    </li>
    <li class="book">
      <h3 class="title">书2</h3>
      <span class="price">¥128</span>
    </li>
  </ul>
`;

const results = await engine.parseArray(
  html,
  '@css:.book',  // 列表项
  {
    title: '@css:.title@text',
    price: '@css:.price@text##\\d+'
  }
);

console.log(results);
// [
//   { title: "书1", price: "99" },
//   { title: "书2", price: "128" }
// ]
```

---

### 静态方法

#### `parseRule(source, rule)`

静态方法，无需创建实例即可解析。

```javascript
import { parseRule } from 'book-source-rule-parser';

const result = await parseRule(html, '@css:.title@text');
```

#### `parseRules(source, rules)`

静态方法，批量解析。

```javascript
import { parseRules } from 'book-source-rule-parser';

const results = await parseRules(html, {
  title: '@css:.title@text',
  author: '@css:.author@text'
});
```

---

### 工厂函数

#### `createRuleEngine(options)`

创建规则引擎实例。

```javascript
import { createRuleEngine } from 'book-source-rule-parser';

const engine = createRuleEngine({
  timeout: 5000,
  enableCache: true
});
```

#### 默认导出

```javascript
import createParser from 'book-source-rule-parser';

const parser = createParser();
await parser.parse(html, '@css:.title@text');
```

---

## 🎓 高级用法

### 1. 复杂嵌套规则

```javascript
// 多层回退 + 拼接
const complexRule = `
  (
    @css:.main-title@text ||
    @css:.title@text ||
    @xpath://h1/text() ||
    @text:未知标题
  )
  &&
  @text: - 
  &&
  (
    @css:.author@text ||
    @text:佚名
  )
`;

await engine.parse(html, complexRule);
```

### 2. 动态规则生成

```javascript
function createProductRule(siteName) {
  const siteRules = {
    'taobao': {
      title: '@css:.title@text',
      price: '@css:.price@text##\\d+\\.\\d+'
    },
    'jd': {
      title: '@css:#name h1@text',
      price: '@css:.p-price@text##\\d+\\.\\d+'
    }
  };
  
  return siteRules[siteName];
}

const rules = createProductRule('taobao');
const result = await engine.parseBatch(html, rules);
```

### 3. 链式处理

```javascript
// 第一步：提取商品列表
const items = await engine.parse(html, '@css:.product');

// 第二步：对每个商品提取详细信息
const products = [];
for (const item of items.data) {
  const product = await engine.parseBatch(item, {
    title: '@css:.title@text',
    price: '@css:.price@text##\\d+',
    image: '@css:img@src'
  });
  products.push(product);
}
```

### 4. 条件提取

```javascript
// 根据条件选择不同规则
const isPriceAvailable = html.includes('class="price"');

const rule = isPriceAvailable
  ? '@css:.price@text##\\d+'
  : '@text:价格待定';

await engine.parse(html, rule);
```

### 5. 自定义处理函数

```javascript
async function extractWithTransform(html, rule, transformFn) {
  const result = await engine.parse(html, rule);
  
  if (result.success) {
    result.data = transformFn(result.data);
  }
  
  return result;
}

// 使用
const result = await extractWithTransform(
  html,
  '@css:.price@text##\\d+',
  (price) => parseFloat(price) * 0.9  // 打九折
);
```

---

## 💼 实战案例

### 案例1: 电商商品爬虫

```javascript
import { RuleEngine } from 'book-source-rule-parser';
import axios from 'axios';

class ProductScraper {
  constructor() {
    this.engine = new RuleEngine();
  }
  
  async scrapeProduct(url) {
    // 获取页面
    const { data: html } = await axios.get(url);
    
    // 定义提取规则
    const rules = {
      // 标题（多种选择器兼容）
      title: `
        @css:h1.product-title@text ||
        @css:#productTitle@text ||
        @css:.title@text ||
        @text:标题未找到
      `,
      
      // 价格（提取数字）
      price: `
        @css:.price@text##\\d+\\.\\d+ ||
        @css:#priceblock_ourprice@text##\\d+\\.\\d+ ||
        @text:0
      `,
      
      // 原价
      originalPrice: `
        @css:.original-price@text##\\d+\\.\\d+ ||
        @css:.price-del@text##\\d+\\.\\d+
      `,
      
      // 商品图片
      image: `
        @css:#main-image@src ||
        @css:.product-image img@src ||
        @css:img[itemprop="image"]@src
      `,
      
      // 商品描述
      description: `
        @css:.product-description@text ||
        @css:#productDescription@text
      `,
      
      // 评分
      rating: `
        @css:.rating-score@text##\\d+\\.\\d+ ||
        @css:[itemprop="ratingValue"]@content
      `,
      
      // 评论数
      reviews: `
        @css:.review-count@text##\\d+ ||
        @text:0
      `,
      
      // 库存状态
      stock: `
        @css:.stock-status@text ||
        @text:有货
      `,
      
      // 卖家
      seller: `
        @css:.seller-name@text ||
        @css:#sellerProfileTriggerId@text ||
        @text:未知
      `
    };
    
    // 批量提取
    const results = await this.engine.parseBatch(html, rules);
    
    // 格式化结果
    return {
      title: results.title.data,
      price: parseFloat(results.price.data),
      originalPrice: results.originalPrice.success 
        ? parseFloat(results.originalPrice.data) 
        : null,
      discount: results.originalPrice.success
        ? ((results.originalPrice.data - results.price.data) / results.originalPrice.data * 100).toFixed(0) + '%'
        : null,
      image: results.image.data,
      description: results.description.data,
      rating: results.rating.success ? parseFloat(results.rating.data) : null,
      reviews: parseInt(results.reviews.data),
      stock: results.stock.data,
      seller: results.seller.data,
      url: url,
      scrapedAt: new Date().toISOString()
    };
  }
}

// 使用
const scraper = new ProductScraper();
const product = await scraper.scrapeProduct('https://example.com/product/123');
console.log(product);
```

### 案例2: 新闻文章提取

```javascript
class ArticleScraper {
  constructor() {
    this.engine = new RuleEngine();
  }
  
  async scrapeArticle(url) {
    const { data: html } = await axios.get(url);
    
    const rules = {
      // 标题
      title: `
        @css:h1.article-title@text ||
        @css:.post-title@text ||
        @xpath://article/h1/text() ||
        @css:h1@text
      `,
      
      // 作者
      author: `
        @css:.author-name@text ||
        @css:[rel="author"]@text ||
        @xpath://meta[@name="author"]/@content ||
        @text:未知作者
      `,
      
      // 发布时间
      publishDate: `
        @css:time@datetime ||
        @css:.publish-time@text##\\d{4}-\\d{2}-\\d{2} ||
        @xpath://meta[@property="article:published_time"]/@content
      `,
      
      // 正文内容（清除标签）
      content: `
        @css:.article-content@html##<script[^>]*>.*?</script>##<style[^>]*>.*?</style>##<[^>]*> ||
        @css:.post-content@html##<[^>]*>
      `,
      
      // 摘要
      summary: `
        @css:.article-summary@text ||
        @xpath://meta[@name="description"]/@content ||
        @css:p:first-of-type@text
      `,
      
      // 分类
      category: `
        @css:.category@text ||
        @css:[rel="category"]@text ||
        @text:未分类
      `,
      
      // 标签
      tags: `
        @css:.tags a@text ||
        @css:[rel="tag"]@text
      `,
      
      // 阅读数
      views: `
        @css:.view-count@text##\\d+ ||
        @text:0
      `,
      
      // 封面图
      coverImage: `
        @css:.article-cover img@src ||
        @xpath://meta[@property="og:image"]/@content ||
        @css:article img:first-of-type@src
      `
    };
    
    const results = await this.engine.parseBatch(html, rules);
    
    return {
      title: results.title.data,
      author: results.author.data,
      publishDate: results.publishDate.data,
      content: results.content.data,
      summary: results.summary.data,
      category: results.category.data,
      tags: Array.isArray(results.tags.data) ? results.tags.data : [results.tags.data],
      views: parseInt(results.views.data),
      coverImage: results.coverImage.data,
      url: url,
      wordCount: results.content.data ? results.content.data.length : 0
    };
  }
}
```

### 案例3: 小说网站爬虫

```javascript
class NovelScraper {
  constructor() {
    this.engine = new RuleEngine();
  }
  
  // 获取书籍信息
  async scrapeBookInfo(url) {
    const { data: html } = await axios.get(url);
    
    const rules = {
      // 书名
      title: `
        @css:h1.book-title@text ||
        @css:.book-name@text ||
        @text:未知书名
      `,
      
      // 作者
      author: `
        @css:.author-name@text ||
        @css:a[href*="author"]@text ||
        @text:佚名
      `,
      
      // 简介
      description: `
        @css:.book-intro@text ||
        @css:#intro@text
      `,
      
      // 封面
      cover: `
        @css:.book-cover img@src ||
        @css:#fmimg@src
      `,
      
      // 分类
      category: `
        @css:.book-category@text ||
        @css:.category a@text
      `,
      
      // 状态
      status: `
        @css:.book-status@text ||
        @text:连载中
      `,
      
      // 最新章节
      latestChapter: `
        @css:.latest-chapter@text ||
        @css:#newlist a:first-child@text
      `,
      
      // 最新章节链接
      latestChapterUrl: `
        @css:.latest-chapter@href ||
        @css:#newlist a:first-child@href
      `,
      
      // 更新时间
      updateTime: `
        @css:.update-time@text##\\d{4}-\\d{2}-\\d{2} ||
        @text:未知
      `,
      
      // 总字数
      wordCount: `
        @css:.word-count@text##\\d+ ||
        @text:0
      `
    };
    
    const results = await this.engine.parseBatch(html, rules);
    
    return {
      title: results.title.data,
      author: results.author.data,
      description: results.description.data,
      cover: results.cover.data,
      category: results.category.data,
      status: results.status.data,
      latestChapter: results.latestChapter.data,
      latestChapterUrl: results.latestChapterUrl.data,
      updateTime: results.updateTime.data,
      wordCount: parseInt(results.wordCount.data),
      url: url
    };
  }
  
  // 获取章节列表
  async scrapeChapterList(url) {
    const { data: html } = await axios.get(url);
    
    const chapters = await this.engine.parseArray(
      html,
      '@css:#list dd',  // 章节列表项
      {
        title: '@css:a@text',
        url: '@css:a@href'
      }
    );
    
    return chapters.map((chapter, index) => ({
      index: index + 1,
      title: chapter.title,
      url: chapter.url
    }));
  }
  
  // 获取章节内容
  async scrapeChapterContent(url) {
    const { data: html } = await axios.get(url);
    
    const rules = {
      title: '@css:.chapter-title@text || @css:h1@text',
      content: '@css:#content@html##<[^>]*> || @css:.content@text',
      prevUrl: '@css:.prev@href',
      nextUrl: '@css:.next@href'
    };
    
    const results = await this.engine.parseBatch(html, rules);
    
    return {
      title: results.title.data,
      content: results.content.data
        .split('\n')
        .filter(line => line.trim())
        .map(line => `  ${line}`)
        .join('\n'),
      prevUrl: results.prevUrl.data,
      nextUrl: results.nextUrl.data
    };
  }
}

// 使用示例
const scraper = new NovelScraper();

// 1. 获取书籍信息
const bookInfo = await scraper.scrapeBookInfo('https://example.com/book/123');
console.log('书籍信息:', bookInfo);

// 2. 获取章节列表
const chapters = await scraper.scrapeChapterList('https://example.com/book/123');
console.log(`共 ${chapters.length} 章`);

// 3. 下载第一章
const chapter1 = await scraper.scrapeChapterContent(chapters[0].url);
console.log('第一章:', chapter1);
```

### 案例4: API 数据处理

```javascript
class APIDataProcessor {
  constructor() {
    this.engine = new RuleEngine();
  }
  
  async processUserData(apiResponse) {
    const jsonStr = JSON.stringify(apiResponse);
    
    const rules = {
      // 用户基本信息
      userId: '@json:$.data.user.id',
      username: '@json:$.data.user.name',
      email: '@json:$.data.user.email',
      avatar: '@json:$.data.user.avatar',
      
      // 统计数据
      postCount: '@json:$.data.statistics.posts',
      followerCount: '@json:$.data.statistics.followers',
      followingCount: '@json:$.data.statistics.following',
      
      // 最新文章标题列表
      latestPosts: '@json:$.data.posts[*].title',
      
      // 热门文章（点赞>100）
      hotPosts: '@json:$.data.posts[?(@.likes>100)].title',
      
      // 用户标签
      tags: '@json:$.data.user.tags[*]'
    };
    
    return await this.engine.parseBatch(jsonStr, rules);
  }
  
  async processProductList(apiResponse) {
    const jsonStr = JSON.stringify(apiResponse);
    
    // 提取所有商品
    const products = await this.engine.parse(
      jsonStr,
      '@json:$.data.products[*]'
    );
    
    // 对每个商品进行详细解析
    const detailedProducts = [];
    for (const product of products.data) {
      const productStr = JSON.stringify(product);
      const detail = await this.engine.parseBatch(productStr, {
        id: '@json:$.id',
        name: '@json:$.name',
        price: '@json:$.price',
        originalPrice: '@json:$.originalPrice || @json:$.price',
        discount: '@js:(function(){const o=JSON.parse(this).originalPrice||JSON.parse(this).price;const p=JSON.parse(this).price;return Math.round((1-p/o)*100)})()',
        image: '@json:$.images[0]',
        rating: '@json:$.rating || @text:0',
        sales: '@json:$.sales || @text:0'
      });
      detailedProducts.push(detail);
    }
    
    return detailedProducts;
  }
}

// 使用示例
const processor = new APIDataProcessor();

const apiData = {
  code: 200,
  data: {
    user: {
      id: 1001,
      name: "张三",
      email: "zhangsan@example.com",
      avatar: "https://example.com/avatar.jpg",
      tags: ["编程", "阅读", "旅行"]
    },
    statistics: {
      posts: 128,
      followers: 1500,
      following: 300
    },
    posts: [
      { id: 1, title: "文章1", likes: 150 },
      { id: 2, title: "文章2", likes: 80 },
      { id: 3, title: "文章3", likes: 200 }
    ]
  }
};

const result = await processor.processUserData(apiData);
console.log(result);
```

---

## ⚡ 性能优化

### 1. 启用缓存

```javascript
const engine = new RuleEngine({
  enableCache: true,
  cacheSize: 200  // 缓存最近200个结果
});
```

### 2. 批量处理

```javascript
// ❌ 低效：多次调用
const title = await engine.parse(html, '@css:.title@text');
const author = await engine.parse(html, '@css:.author@text');
const price = await engine.parse(html, '@css:.price@text');

// ✅ 高效：批量处理
const results = await engine.parseBatch(html, {
  title: '@css:.title@text',
  author: '@css:.author@text',
  price: '@css:.price@text'
});
```

### 3. 避免过度复杂的选择器

```javascript
// ❌ 低效
'@css:div > ul > li > div > span.price@text'

// ✅ 高效
'@css:.price@text'
```

### 4. 使用具体的选择器

```javascript
// ❌ 低效：遍历所有元素
'@css:*[class*="title"]@text'

// ✅ 高效：直接定位
'@css:.title@text'
```

### 5. 预编译正则表达式

```javascript
// 对于频繁使用的正则，考虑预编译
const priceRegex = /\d+\.\d+/;
```

---

## 🚨 错误处理

### 1. 基本错误处理

```javascript
const result = await engine.parse(html, '@css:.title@text');

if (result.success) {
  console.log('成功:', result.data);
} else {
  console.error('失败:', result.errors);
}
```

### 2. Try-Catch 处理

```javascript
try {
  const result = await engine.parse(html, '@css:.title@text');
  console.log(result.data);
} catch (error) {
  console.error('解析错误:', error.message);
}
```

### 3. 严格模式

```javascript
// 启用严格模式：失败时抛出异常
const engine = new RuleEngine({
  strictMode: true
});

try {
  const result = await engine.parse(html, '@invalid:syntax');
} catch (error) {
  console.error('规则错误:', error);
}
```

### 4. 使用回退操作符

```javascript
// 推荐：使用回退提供默认值
const rule = '@css:.title@text || @text:默认标题';
const result = await engine.parse(html, rule);
// 即使 .title 不存在，也会返回"默认标题"
```

### 5. 批量处理的错误

```javascript
const results = await engine.parseBatch(html, {
  title: '@css:.title@text',
  author: '@css:.author@text',
  invalid: '@invalid:syntax'
});

// 检查每个结果
Object.entries(results).forEach(([key, result]) => {
  if (!result.success) {
    console.error(`${key} 提取失败:`, result.errors);
  }
});
```

---

## ❓ 常见问题

### Q1: 为什么操作符周围必须有空格？

**A:** 这是语法规则要求，用于明确区分操作符和选择器内容。

```javascript
// ❌ 错误
'@css:.title@text&&@css:.author@text'

// ✅ 正确
'@css:.title@text && @css:.author@text'
```

### Q2: 如何处理动态加载的内容？

**A:** 本库处理的是静态 HTML，对于 JavaScript 动态加载的内容，需要先使用 Puppeteer 或 Playwright 渲染页面。

```javascript
import puppeteer from 'puppeteer';
import { RuleEngine } from 'book-source-rule-parser';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://example.com');
const html = await page.content();
await browser.close();

const engine = new RuleEngine();
const result = await engine.parse(html, '@css:.title@text');
```

### Q3: 正则表达式为什么要双反斜杠？

**A:** JavaScript 字符串中反斜杠需要转义。

```javascript
// ❌ 错误
'@regex:\d+'

// ✅ 正确
'@regex:\\d+'

// 或使用原始字符串（如果支持）
String.raw`@regex:\d+`
```

### Q4: 如何提取多个元素？

**A:** 选择器自动返回数组。

```javascript
// 单个元素
await engine.parse(html, '@css:.title@text');
// → "标题"

// 多个元素
await engine.parse(html, '@css:li.item@text');
// → ["项目1", "项目2", "项目3"]
```

### Q5: 如何调试复杂规则？

**A:** 分步测试。

```javascript
// 1. 测试基础选择器
await engine.parse(html, '@css:.title@text');

// 2. 测试拼接
await engine.parse(html, '@css:.title@text && @text: - ');

// 3. 测试完整规则
await engine.parse(html, '@css:.title@text && @text: - && @css:.author@text');
```

### Q6: 支持哪些 Node.js 版本？

**A:** Node.js 18.0.0 及以上版本（需要 ES Modules 支持）。

### Q7: 可以用于商业项目吗？

**A:** 查看 [LICENSE](LICENSE) 文件。当前使用 PolyForm Noncommercial License，仅供非商业使用。

### Q8: 如何贡献代码？

**A:** 欢迎提交 Issue 和 Pull Request！

```bash
git clone https://github.com/LegadoTeam/legado-rule.git
cd legado-rule
pnpm install
pnpm test
```

---

## 📚 相关文档

- [README.md](README.md) - 项目说明
- [LIBRARY_USAGE.md](LIBRARY_USAGE.md) - 库引用指南
- [examples/](examples/) - 完整示例
- [LLM_PROMPT.md](LLM_PROMPT.md) - AI 辅助提示词
- [测试报告.md](测试报告.md) - 测试覆盖率
- [CHANGELOG.md](CHANGELOG.md) - 更新日志

---

## 🤝 技术支持

- **Issues**: [GitHub Issues](https://github.com/LegadoTeam/legado-rule/issues)
- **Discussions**: [GitHub Discussions](https://github.com/LegadoTeam/legado-rule/discussions)
- **文档**: [完整文档](DOCS_NAVIGATION.md)

---

## 📄 许可证

[PolyForm Noncommercial License](LICENSE) - 仅供非商业使用

---

**🌟 如果这个项目对你有帮助，请给我们一个 Star！**
