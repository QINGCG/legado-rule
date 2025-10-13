/**
 * 实战案例：电商网站数据提取
 * 模拟从电商网站提取商品信息
 */

import { RuleEngine } from '../index.js';

const engine = new RuleEngine();

// 模拟电商网站HTML
const ecommerceHTML = `
<!DOCTYPE html>
<html>
<body>
  <div class="product-page">
    <!-- 商品基本信息 -->
    <div class="product-header">
      <h1 class="product-title">Apple iPhone 15 Pro Max</h1>
      <span class="product-category">手机通讯</span>
    </div>
    
    <!-- 价格信息 -->
    <div class="price-box">
      <span class="current-price">￥9999</span>
      <span class="original-price">￥12999</span>
      <span class="discount">77折</span>
    </div>
    
    <!-- 商品属性 -->
    <div class="specs">
      <div class="spec-item">
        <span class="spec-name">颜色</span>
        <span class="spec-value">钛金属</span>
      </div>
      <div class="spec-item">
        <span class="spec-name">存储</span>
        <span class="spec-value">256GB</span>
      </div>
      <div class="spec-item">
        <span class="spec-name">品牌</span>
        <span class="spec-value">Apple</span>
      </div>
    </div>
    
    <!-- 商品图片 -->
    <div class="gallery">
      <img src="https://example.com/images/iphone-1.jpg" class="main-image">
      <img src="https://example.com/images/iphone-2.jpg" class="thumb-image">
      <img src="https://example.com/images/iphone-3.jpg" class="thumb-image">
    </div>
    
    <!-- 商品状态 -->
    <div class="status">
      <span class="stock">库存：999+</span>
      <span class="sales">已售：2.5万</span>
    </div>
    
    <!-- 商品详情 -->
    <div class="description">
      <p>iPhone 15 Pro Max 采用钛金属设计，更轻更坚固。</p>
      <p>搭载 A17 Pro 芯片，性能强劲。</p>
    </div>
    
    <!-- 评价信息 -->
    <div class="reviews">
      <span class="review-count">用户评价(12580)</span>
      <span class="rating">4.8分</span>
    </div>
  </div>
</body>
</html>
`;

console.log('=== 电商网站数据提取案例 ===\n');

// 案例1：提取基础商品信息
console.log('【案例1】基础商品信息');
const basicInfo = await engine.parse(
  ecommerceHTML,
  '@text:【 && @css:.product-category@text && @text:】 && @css:.product-title@text'
);
console.log('商品信息:', basicInfo.data);

// 案例2：提取价格信息（带格式化）
console.log('\n【案例2】价格信息');
const priceInfo = await engine.parse(
  ecommerceHTML,
  '@text:当前价：￥ && @css:.current-price@text##\\d+ && @text: | 原价：￥ && @css:.original-price@text##\\d+ && @text: | 折扣： && @css:.discount@text'
);
console.log('价格信息:', priceInfo.data);

// 案例3：提取商品规格（多个值）
console.log('\n【案例3】商品规格');
const color = await engine.parse(ecommerceHTML, '@css:.spec-item:nth-child(1) .spec-value@text');
const storage = await engine.parse(ecommerceHTML, '@css:.spec-item:nth-child(2) .spec-value@text');
const brand = await engine.parse(ecommerceHTML, '@css:.spec-item:nth-child(3) .spec-value@text');
console.log('颜色:', color.data);
console.log('存储:', storage.data);
console.log('品牌:', brand.data);

// 案例4：提取图片链接（多个）
console.log('\n【案例4】商品图片');
const mainImage = await engine.parse(ecommerceHTML, '@css:.main-image@src');
const thumbImages = await engine.parse(ecommerceHTML, '@css:.thumb-image@src');
console.log('主图:', mainImage.data);
console.log('缩略图:', thumbImages.data);

// 案例5：提取库存和销量信息
console.log('\n【案例5】库存和销量');
const stock = await engine.parse(ecommerceHTML, '@css:.stock@text##\\d+');
const sales = await engine.parse(ecommerceHTML, '@css:.sales@text##([\\d.]+万)');
console.log('库存:', stock.data);
console.log('销量:', sales.data);

// 案例6：提取评价信息
console.log('\n【案例6】评价信息');
const reviewInfo = await engine.parse(
  ecommerceHTML,
  '@css:.review-count@text##\\d+ && @text:条评价，评分 && @css:.rating@text'
);
console.log('评价:', reviewInfo.data);

// 案例7：完整商品信息（复杂组合）
console.log('\n【案例7】完整商品信息卡片');
const fullInfo = await engine.parse(
  ecommerceHTML,
  '@text:📱 && @css:.product-title@text && @text:\n💰 价格：￥ && @css:.current-price@text##\\d+ && @text: (原价￥ && @css:.original-price@text##\\d+ && @text:)\n📦 库存： && @css:.stock@text##\\d+ && @text: | 已售： && @css:.sales@text##[\\d.]+万 && @text:\n⭐ 评分： && @css:.rating@text && @text: (共 && @css:.review-count@text##\\d+ && @text:条评价)'
);
console.log(fullInfo.data);

// 案例8：使用回退机制保证数据完整性
console.log('\n【案例8】容错提取（回退机制）');
const safeExtract = await engine.parse(
  ecommerceHTML,
  '@css:.premium-badge@text || @css:.product-category@text || @text:未分类'
);
console.log('分类（带回退）:', safeExtract.data);

// 案例9：商品卡片格式化输出
console.log('\n【案例9】商品卡片格式');
const productCard = await engine.parse(
  ecommerceHTML,
  '@text:━━━━━━━━━━━━━━━━\n && @css:.product-title@text && @text:\n━━━━━━━━━━━━━━━━\n分类： && @css:.product-category@text && @text:\n价格：￥ && @css:.current-price@text##\\d+ && @text: && @css:.discount@text && @text:\n品牌： && @css:.spec-item:nth-child(3) .spec-value@text && @text:\n库存： && @css:.stock@text && @text:\n评分：⭐ && @css:.rating@text && @text:\n━━━━━━━━━━━━━━━━'
);
console.log(productCard.data);

console.log('\n=== 电商案例执行完成 ===');
