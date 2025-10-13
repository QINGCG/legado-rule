/**
 * 基础用法示例
 * 展示如何使用各种选择器提取数据
 */

import { RuleEngine } from '../index.js';

const engine = new RuleEngine();

// ============================================
// 1. CSS 选择器示例
// ============================================

const htmlSample = `
<!DOCTYPE html>
<html>
<head>
  <title>JavaScript权威指南</title>
</head>
<body>
  <div class="book-container">
    <h1 class="title">JavaScript权威指南</h1>
    <p class="author">David Flanagan</p>
    <div class="price">
      <span class="sale-price">￥89.00</span>
      <span class="original-price">￥128.00</span>
    </div>
    <img src="https://example.com/cover.jpg" alt="封面" class="cover">
    <a href="https://example.com/book/123" class="buy-link">购买链接</a>
    <div class="description">
      这是一本经典的JavaScript教程书籍，适合初学者和进阶开发者。
    </div>
    <ul class="tags">
      <li>编程</li>
      <li>JavaScript</li>
      <li>前端开发</li>
    </ul>
  </div>
</body>
</html>
`;

console.log('=== CSS 选择器示例 ===\n');

// 提取书名
let result = await engine.parse(htmlSample, '@css:.title@text');
console.log('书名:', result.data);

// 提取作者
result = await engine.parse(htmlSample, '@css:.author@text');
console.log('作者:', result.data);

// 提取价格（带正则净化）
result = await engine.parse(htmlSample, '@css:.sale-price@text##\\d+\\.\\d+');
console.log('价格:', result.data);

// 提取图片链接
result = await engine.parse(htmlSample, '@css:.cover@src');
console.log('封面图片:', result.data);

// 提取超链接
result = await engine.parse(htmlSample, '@css:.buy-link@href');
console.log('购买链接:', result.data);

// 提取多个标签
result = await engine.parse(htmlSample, '@css:ul.tags li@text');
console.log('标签:', result.data);

// ============================================
// 2. JSON 选择器示例
// ============================================

const jsonSample = {
  "status": "success",
  "data": {
    "book": {
      "title": "JavaScript高级程序设计",
      "author": {
        "name": "Nicholas C. Zakas",
        "country": "USA"
      },
      "price": 99.00,
      "isbn": "9787115275790",
      "chapters": [
        { "id": 1, "title": "什么是JavaScript" },
        { "id": 2, "title": "HTML中的JavaScript" },
        { "id": 3, "title": "语言基础" }
      ]
    }
  }
};

console.log('\n=== JSON 选择器示例 ===\n');

// 提取书名
result = await engine.parse(JSON.stringify(jsonSample), '@json:$.data.book.title');
console.log('书名:', result.data);

// 提取作者
result = await engine.parse(JSON.stringify(jsonSample), '@json:$.data.book.author.name');
console.log('作者:', result.data);

// 提取第一章标题
result = await engine.parse(JSON.stringify(jsonSample), '@json:$.data.book.chapters[0].title');
console.log('第一章:', result.data);

// 提取所有章节标题
result = await engine.parse(JSON.stringify(jsonSample), '@json:$.data.book.chapters[*].title');
console.log('所有章节:', result.data);

// ============================================
// 3. 正则表达式选择器示例
// ============================================

const textSample = `
书名：《深入理解计算机系统》
作者：Randal E. Bryant
ISBN：978-7-111-54493-7
价格：139.00元
出版日期：2016-11-01
`;

console.log('\n=== 正则表达式选择器示例 ===\n');

// 提取书名
result = await engine.parse(textSample, '@regex:书名：《(.+?)》');
console.log('书名:', result.data);

// 提取作者
result = await engine.parse(textSample, '@regex:作者：([^\\n]+)');
console.log('作者:', result.data);

// 提取ISBN
result = await engine.parse(textSample, '@regex:ISBN：([\\d-]+)');
console.log('ISBN:', result.data);

// 提取价格数字
result = await engine.parse(textSample, '@regex:价格：(\\d+\\.\\d+)');
console.log('价格:', result.data);

// ============================================
// 4. 文本选择器示例
// ============================================

console.log('\n=== 文本选择器示例 ===\n');

// 固定文本输出
result = await engine.parse(htmlSample, '@text:这是默认文本');
console.log('固定文本:', result.data);

// 带空格的文本
result = await engine.parse(htmlSample, '@text: - ');
console.log('分隔符:', `"${result.data}"`);

// ============================================
// 5. 操作符组合示例
// ============================================

console.log('\n=== 操作符组合示例 ===\n');

// 拼接操作符
result = await engine.parse(htmlSample, '@text:书名： && @css:.title@text');
console.log('拼接结果:', result.data);

// 回退操作符
result = await engine.parse(htmlSample, '@css:.nonexistent@text || @text:默认标题');
console.log('回退结果:', result.data);

// 复杂组合：格式化书籍信息
result = await engine.parse(
  htmlSample,
  '@text:《 && @css:.title@text && @text:》 - && @css:.author@text && @text: | 价格：￥ && @css:.sale-price@text##\\d+\\.\\d+'
);
console.log('完整信息:', result.data);

console.log('\n=== 示例执行完成 ===');
