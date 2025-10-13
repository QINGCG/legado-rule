/**
 * 实战案例：小说网站章节提取
 * 模拟从小说网站提取章节信息和内容
 */

import { RuleEngine } from '../index.js';

const engine = new RuleEngine();

// 模拟小说网站HTML
const novelHTML = `
<!DOCTYPE html>
<html>
<body>
  <div class="novel-page">
    <!-- 小说信息 -->
    <div class="book-info">
      <h1 class="book-title">修真世界</h1>
      <div class="author">作者：方想</div>
      <div class="status">状态：已完结</div>
      <div class="category">分类：仙侠修真</div>
      <div class="words-count">字数：568万字</div>
      <div class="update-time">更新时间：2024-10-12 15:30</div>
    </div>
    
    <!-- 小说简介 -->
    <div class="intro">
      <p>这是一个平凡的少年，修真的故事。他没有天赋异禀，没有显赫背景...</p>
    </div>
    
    <!-- 章节列表 -->
    <div class="chapter-list">
      <ul>
        <li class="chapter-item">
          <a href="/chapter/1" class="chapter-link">第1章：入门</a>
          <span class="chapter-time">2023-01-01</span>
        </li>
        <li class="chapter-item">
          <a href="/chapter/2" class="chapter-link">第2章：筑基</a>
          <span class="chapter-time">2023-01-02</span>
        </li>
        <li class="chapter-item">
          <a href="/chapter/3" class="chapter-link">第3章：金丹</a>
          <span class="chapter-time">2023-01-03</span>
        </li>
        <li class="chapter-item latest">
          <a href="/chapter/2000" class="chapter-link">第2000章：大结局</a>
          <span class="chapter-time">2024-10-12</span>
          <span class="badge-new">最新</span>
        </li>
      </ul>
    </div>
    
    <!-- 统计信息 -->
    <div class="stats">
      <span class="reads">阅读：256.8万</span>
      <span class="favorites">收藏：12.5万</span>
      <span class="recommendations">推荐：8520</span>
    </div>
  </div>
</body>
</html>
`;

// 模拟章节内容页
const chapterHTML = `
<!DOCTYPE html>
<html>
<body>
  <div class="chapter-page">
    <!-- 章节头部 -->
    <div class="chapter-header">
      <h1 class="chapter-title">第1章：入门</h1>
      <div class="book-name">《修真世界》</div>
      <div class="chapter-info">
        <span class="word-count">字数：3580</span>
        <span class="update-time">更新：2023-01-01 10:00</span>
      </div>
    </div>
    
    <!-- 章节正文 -->
    <div class="chapter-content">
      <p>　　清晨的阳光透过窗棂，洒在少年的脸上。</p>
      <p>　　卓云溪睁开眼睛，新的一天开始了。</p>
      <p>　　今天是他进入宗门的日子。</p>
    </div>
    
    <!-- 章节导航 -->
    <div class="chapter-nav">
      <a href="/chapter/0" class="prev-chapter">上一章</a>
      <a href="/chapters" class="chapter-index">目录</a>
      <a href="/chapter/2" class="next-chapter">下一章</a>
    </div>
  </div>
</body>
</html>
`;

console.log('=== 小说网站数据提取案例 ===\n');

// 案例1：提取小说基本信息
console.log('【案例1】小说基本信息');
const bookTitle = await engine.parse(novelHTML, '@css:.book-title@text');
const author = await engine.parse(novelHTML, '@css:.author@text##作者：(.+)');
const status = await engine.parse(novelHTML, '@css:.status@text##状态：(.+)');
const category = await engine.parse(novelHTML, '@css:.category@text##分类：(.+)');
console.log('书名:', bookTitle.data);
console.log('作者:', author.data);
console.log('状态:', status.data);
console.log('分类:', category.data);

// 案例2：格式化书籍信息卡片
console.log('\n【案例2】书籍信息卡片');
const bookCard = await engine.parse(
  novelHTML,
  '@text:📖 && @css:.book-title@text && @text:\n✍️ 作者： && @css:.author@text##作者：(.+) && @text:\n📂 分类： && @css:.category@text##分类：(.+) && @text:\n📊 状态： && @css:.status@text##状态：(.+) && @text:\n📝 字数： && @css:.words-count@text##字数：(.+) && @text:\n🕒 更新： && @css:.update-time@text##更新时间：(.+)'
);
console.log(bookCard.data);

// 案例3：提取章节列表
console.log('\n【案例3】章节列表');
const chapterTitles = await engine.parse(novelHTML, '@css:.chapter-link@text');
const chapterLinks = await engine.parse(novelHTML, '@css:.chapter-link@href');
console.log('章节标题:', chapterTitles.data);
console.log('章节链接:', chapterLinks.data);

// 案例4：提取最新章节
console.log('\n【案例4】最新章节');
const latestChapter = await engine.parse(
  novelHTML,
  '@css:.chapter-item.latest .chapter-link@text && @text: (更新于 && @css:.chapter-item.latest .chapter-time@text && @text:)'
);
console.log('最新章节:', latestChapter.data);

// 案例5：提取统计数据
console.log('\n【案例5】统计数据');
const statsInfo = await engine.parse(
  novelHTML,
  '@css:.reads@text##([\\d.]+万) && @text:次阅读 | && @css:.favorites@text##([\\d.]+万) && @text:人收藏 | && @css:.recommendations@text##(\\d+) && @text:推荐票'
);
console.log('统计信息:', statsInfo.data);

// 案例6：提取章节内容页信息
console.log('\n【案例6】章节内容');
const chapterTitle = await engine.parse(chapterHTML, '@css:.chapter-title@text');
const bookName = await engine.parse(chapterHTML, '@css:.book-name@text');
const wordCount = await engine.parse(chapterHTML, '@css:.word-count@text##字数：(.+)');
console.log('章节标题:', chapterTitle.data);
console.log('所属书籍:', bookName.data);
console.log('字数:', wordCount.data);

// 案例7：提取章节正文
console.log('\n【案例7】章节正文');
const content = await engine.parse(chapterHTML, '@css:.chapter-content@text');
console.log('正文内容:');
console.log(content.data);

// 案例8：提取章节导航链接
console.log('\n【案例8】章节导航');
const prevLink = await engine.parse(chapterHTML, '@css:.prev-chapter@href');
const indexLink = await engine.parse(chapterHTML, '@css:.chapter-index@href');
const nextLink = await engine.parse(chapterHTML, '@css:.next-chapter@href');
console.log('上一章:', prevLink.data);
console.log('目录:', indexLink.data);
console.log('下一章:', nextLink.data);

// 案例9：完整章节信息格式化
console.log('\n【案例9】完整章节信息卡片');
const chapterCard = await engine.parse(
  chapterHTML,
  '@text:━━━━━━━━━━━━━━━━━━━━\n && @css:.book-name@text && @text:\n && @css:.chapter-title@text && @text:\n━━━━━━━━━━━━━━━━━━━━\n字数： && @css:.word-count@text##字数：(.+) && @text:\n更新： && @css:.update-time@text##更新：(.+) && @text:\n━━━━━━━━━━━━━━━━━━━━'
);
console.log(chapterCard.data);

// 案例10：容错处理（回退机制）
console.log('\n【案例10】容错提取');
const safeExtract = await engine.parse(
  novelHTML,
  '@css:.rating@text || @text:暂无评分'
);
console.log('评分（带回退）:', safeExtract.data);

// 案例11：综合书源规则示例
console.log('\n【案例11】综合书源规则');
const bookSourceRule = {
  name: '@css:.book-title@text',
  author: '@css:.author@text##作者：(.+)',
  intro: '@css:.intro p@text',
  coverUrl: '@css:.book-cover@src || @text:',
  category: '@css:.category@text##分类：(.+)',
  status: '@css:.status@text##状态：(.+)',
  latestChapter: '@css:.chapter-item.latest .chapter-link@text',
  chapterList: '@css:.chapter-link@text',
  chapterUrls: '@css:.chapter-link@href'
};

console.log('书源规则配置:');
console.log(JSON.stringify(bookSourceRule, null, 2));

console.log('\n执行规则提取:');
for (const [key, rule] of Object.entries(bookSourceRule)) {
  const result = await engine.parse(novelHTML, rule);
  console.log(`${key}:`, result.data);
}

console.log('\n=== 小说网站案例执行完成 ===');
