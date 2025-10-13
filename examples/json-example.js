/**
 * JSON 数据提取示例
 * 展示如何从 API 返回的 JSON 数据中提取信息
 */

import { RuleEngine } from '../index.js';

const engine = new RuleEngine();

// 模拟图书 API 返回的 JSON 数据
const booksAPIResponse = {
  "code": 200,
  "message": "success",
  "data": {
    "total": 150,
    "page": 1,
    "pageSize": 10,
    "books": [
      {
        "id": 1001,
        "title": "JavaScript高级程序设计",
        "author": {
          "name": "Nicholas C. Zakas",
          "country": "USA",
          "bio": "著名JavaScript专家"
        },
        "price": 99.00,
        "originalPrice": 128.00,
        "discount": 0.77,
        "isbn": "9787115275790",
        "publisher": "人民邮电出版社",
        "publishDate": "2012-03-01",
        "category": ["编程", "JavaScript", "Web开发"],
        "rating": {
          "score": 4.8,
          "count": 15620
        },
        "inStock": true,
        "sales": 25800
      },
      {
        "id": 1002,
        "title": "深入理解计算机系统",
        "author": {
          "name": "Randal E. Bryant",
          "country": "USA",
          "bio": "卡内基梅隆大学教授"
        },
        "price": 139.00,
        "originalPrice": 168.00,
        "discount": 0.83,
        "isbn": "9787111544937",
        "publisher": "机械工业出版社",
        "publishDate": "2016-11-01",
        "category": ["计算机科学", "系统"],
        "rating": {
          "score": 4.9,
          "count": 12580
        },
        "inStock": true,
        "sales": 18900
      },
      {
        "id": 1003,
        "title": "Python编程：从入门到实践",
        "author": {
          "name": "Eric Matthes",
          "country": "USA",
          "bio": "高中科学和数学老师"
        },
        "price": 89.00,
        "originalPrice": 99.00,
        "discount": 0.90,
        "isbn": "9787115428028",
        "publisher": "人民邮电出版社",
        "publishDate": "2016-07-01",
        "category": ["编程", "Python"],
        "rating": {
          "score": 4.7,
          "count": 23450
        },
        "inStock": false,
        "sales": 35600
      }
    ]
  }
};

console.log('=== JSON 数据提取示例 ===\n');

// 案例1：提取基础字段
console.log('【案例1】基础字段提取');
let result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.code');
console.log('状态码:', result.data);

result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.total');
console.log('总数量:', result.data);

// 案例2：提取第一本书的信息
console.log('\n【案例2】第一本书信息');
result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[0].title');
console.log('书名:', result.data);

result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[0].author.name');
console.log('作者:', result.data);

result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[0].price');
console.log('价格:', result.data);

// 案例3：提取所有书名
console.log('\n【案例3】所有书名');
result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[*].title');
console.log('所有书名:', result.data);

// 案例4：提取所有作者名
console.log('\n【案例4】所有作者');
result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[*].author.name');
console.log('所有作者:', result.data);

// 案例5：提取嵌套数组（分类标签）
console.log('\n【案例5】第一本书的分类');
result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[0].category');
console.log('分类:', result.data);

// 案例6：提取评分信息
console.log('\n【案例6】评分信息');
result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[0].rating.score');
console.log('评分:', result.data);

result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[0].rating.count');
console.log('评价人数:', result.data);

// 案例7：组合操作符 - 格式化输出
console.log('\n【案例7】格式化书籍信息');
result = await engine.parse(
  JSON.stringify(booksAPIResponse),
  '@text:《 && @json:$.data.books[0].title && @text:》\n作者： && @json:$.data.books[0].author.name && @text:\n价格：￥ && @json:$.data.books[0].price && @text:\n评分：⭐ && @json:$.data.books[0].rating.score && @text: (共 && @json:$.data.books[0].rating.count && @text:人评价)'
);
console.log(result.data);

// 案例8：回退机制
console.log('\n【案例8】回退机制');
result = await engine.parse(
  JSON.stringify(booksAPIResponse),
  '@json:$.data.books[0].subtitle || @text:无副标题'
);
console.log('副标题（带回退）:', result.data);

// 案例9：复杂嵌套数据
const complexJSON = {
  "library": {
    "name": "市图书馆",
    "floors": [
      {
        "level": 1,
        "sections": [
          { "name": "文学", "bookCount": 5000 },
          { "name": "历史", "bookCount": 3000 }
        ]
      },
      {
        "level": 2,
        "sections": [
          { "name": "科技", "bookCount": 4000 },
          { "name": "艺术", "bookCount": 2500 }
        ]
      }
    ]
  }
};

console.log('\n【案例9】复杂嵌套提取');
result = await engine.parse(JSON.stringify(complexJSON), '@json:$.library.name');
console.log('图书馆名称:', result.data);

result = await engine.parse(JSON.stringify(complexJSON), '@json:$.library.floors[0].sections[0].name');
console.log('一楼第一区:', result.data);

result = await engine.parse(JSON.stringify(complexJSON), '@json:$.library.floors[*].sections[*].name');
console.log('所有分区名称:', result.data);

// 案例10：数组索引访问
console.log('\n【案例10】数组索引访问');
result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[1].title');
console.log('第二本书:', result.data);

result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[2].title');
console.log('第三本书:', result.data);

// 案例11：布尔值处理
console.log('\n【案例11】布尔值处理');
result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[0].inStock');
console.log('第一本书库存状态:', result.data);

result = await engine.parse(JSON.stringify(booksAPIResponse), '@json:$.data.books[2].inStock');
console.log('第三本书库存状态:', result.data);

// 案例12：综合书源规则（JSON版）
console.log('\n【案例12】JSON书源规则配置');
const jsonBookSourceRules = {
  bookName: '@json:$.data.books[0].title',
  author: '@json:$.data.books[0].author.name',
  price: '@json:$.data.books[0].price',
  isbn: '@json:$.data.books[0].isbn',
  publisher: '@json:$.data.books[0].publisher',
  category: '@json:$.data.books[0].category[0]',
  rating: '@json:$.data.books[0].rating.score',
  inStock: '@json:$.data.books[0].inStock',
  
  // 格式化输出
  formatted: '@text:【 && @json:$.data.books[0].category[0] && @text:】 && @json:$.data.books[0].title && @text: - && @json:$.data.books[0].author.name && @text: | ￥ && @json:$.data.books[0].price'
};

console.log('规则配置:');
console.log(JSON.stringify(jsonBookSourceRules, null, 2));

console.log('\n执行规则提取:');
for (const [key, rule] of Object.entries(jsonBookSourceRules)) {
  const result = await engine.parse(JSON.stringify(booksAPIResponse), rule);
  console.log(`${key}:`, result.data);
}

console.log('\n=== JSON示例执行完成 ===');
