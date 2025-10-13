# 📚 书源规则解析器 - 文档索引

本项目提供完整的文档体系，适合不同阶段和需求的用户。

## 🎯 文档使用指南

### 我应该看哪个文档？

根据你的需求选择：

| 需求 | 推荐文档 | 说明 |
|------|----------|------|
| 🚀 **快速入门** | [README.md](README.md) | 5分钟快速开始 |
| 📖 **完整学习** | [USAGE_GUIDE.md](USAGE_GUIDE.md) | npm 包完整使用指南 ⭐ |
| 💻 **查看示例** | [examples/](examples/) | 可运行的实战代码 |
| 🤖 **AI 辅助** | [LLM_PROMPT.md](LLM_PROMPT.md) | 让 AI 帮你写规则 |
| 🔗 **引用库** | [LIBRARY_USAGE.md](LIBRARY_USAGE.md) | 在其他项目中使用 |
| 📋 **API 查询** | [USAGE_GUIDE.md#api-参考](USAGE_GUIDE.md#-api-参考) | 完整 API 文档 |

---

## 📁 完整文档列表

### 1️⃣ 核心文档

#### [README.md](README.md)
**项目主页和快速入门**

- ⚡ 5分钟快速开始
- 🎨 选择器速查表
- 💼 实战案例预览
- 🤖 AI 辅助说明
- 📚 文档导航

**阅读时间**：10 分钟  
**适合**：所有用户

---

#### [USAGE_GUIDE.md](USAGE_GUIDE.md) ⭐ **重点推荐**
**npm 包完整使用指南**

这是最全面、最详细的文档，包含：

##### 📦 安装部分
- 多种包管理器安装方式
- 系统要求说明
- 模块系统配置

##### 🚀 快速开始
- 基础示例代码
- 30秒上手指南
- 常用场景演示

##### 🎯 核心概念
- 规则语法结构详解
- 组成部分说明
- 数据流程图

##### 📖 选择器详解（6种）
1. **CSS 选择器** - 完整语法、属性表、高级用法
2. **JSON 选择器** - JSONPath 语法速查、过滤表达式
3. **正则选择器** - 常用模式、注意事项
4. **XPath 选择器** - 标准语法、常用表达式
5. **JS 选择器** - 自定义处理、安全警告
6. **文本选择器** - 拼接用法、特殊字符

##### 🔧 操作符详解（3种）
1. **拼接操作符 &&** - 语法规则、空格处理
2. **回退操作符 ||** - 容错机制、多级回退
3. **正则净化操作符 ##** - 清理提取、组合使用

##### 📚 API 参考
- **RuleEngine 类**
  - 构造函数参数
  - 配置选项详解
- **解析方法**
  - `parse()` - 单个规则
  - `parseBatch()` - 批量解析
  - `parseArray()` - 列表提取
- **静态方法**
  - `parseRule()`
  - `parseRules()`
- **工厂函数**
  - `createRuleEngine()`
  - 默认导出

##### 🎓 高级用法
- 复杂嵌套规则
- 动态规则生成
- 链式处理
- 条件提取
- 自定义处理函数

##### 💼 实战案例（4个完整案例）
1. **电商商品爬虫** - 完整代码、多网站兼容
2. **新闻文章提取** - 元数据、正文、图片
3. **小说网站爬虫** - 书籍信息、章节列表、内容
4. **API 数据处理** - 用户数据、商品列表

##### ⚡ 性能优化
- 启用缓存
- 批量处理
- 选择器优化
- 预编译技巧

##### 🚨 错误处理
- 基本错误处理
- Try-Catch 用法
- 严格模式
- 回退策略

##### ❓ 常见问题
- 8+ 个高频问题
- 详细解答
- 代码示例

**阅读时间**：60+ 分钟（完整阅读）  
**适合**：需要深入了解所有功能的开发者

---

#### [LIBRARY_USAGE.md](LIBRARY_USAGE.md)
**库引用和集成指南**

- ✅ 导出内容列表
- 📦 package.json 配置
- 🚀 3种使用方式
- 📝 完整使用示例
- 🔧 可用导出清单
- 🎯 实际应用示例
- ✅ 验证库可用性
- 📋 发布前检查清单

**阅读时间**：15 分钟  
**适合**：需要在其他项目中使用本库的开发者

---

### 2️⃣ 示例代码

#### [examples/](examples/)
**可运行的实战代码**

包含 4 个完整示例文件：

1. **[basic-usage.js](examples/basic-usage.js)**
   - CSS 选择器基础
   - JSON 选择器使用
   - 正则表达式提取
   - 文本选择器拼接
   
2. **[ecommerce-example.js](examples/ecommerce-example.js)**
   - 商品标题提取
   - 价格格式化
   - 规格参数解析
   - 图片链接提取
   - 评论数据
   
3. **[novel-example.js](examples/novel-example.js)**
   - 书籍信息提取
   - 章节列表获取
   - 正文内容清理
   - 导航链接
   
4. **[json-example.js](examples/json-example.js)**
   - JSONPath 查询
   - 数组过滤
   - 嵌套对象提取
   - API 数据处理

运行方式：
```bash
pnpm run examples           # 所有示例
pnpm run example:basic      # 基础用法
pnpm run example:ecommerce  # 电商案例
pnpm run example:novel      # 小说案例
pnpm run example:json       # JSON案例
```

**阅读时间**：30 分钟（运行并理解所有示例）  
**适合**：通过代码学习的开发者

---

### 3️⃣ AI 辅助文档

让大模型帮你编写规则！

#### [LLM_PROMPT.md](LLM_PROMPT.md) ⭐
**精简版提示词（推荐）**

- 核心语法要点
- 6种选择器速查
- 3种操作符说明
- 常用模式模板
- 实战示例

**使用方式**：
```
请阅读以下规则语法，帮我编写数据提取规则：
[复制 LLM_PROMPT.md 的内容]

我需要从以下网页提取数据：
[粘贴你的HTML或描述需求]
```

**阅读时间**：5 分钟  
**适合**：配合 ChatGPT/Claude 使用

---

#### [AI_PROMPT_SIMPLE.md](AI_PROMPT_SIMPLE.md)
**简化版指南**

- 快速参考表格
- 使用模式总结
- 真实案例

**阅读时间**：8 分钟  
**适合**：需要快速查询的场景

---

#### [AI_RULE_WRITING_GUIDE.md](AI_RULE_WRITING_GUIDE.md)
**详细完整版指南**

- 详细语法解释
- 最佳实践
- 调试技巧
- 错误处理
- 高级技巧

**阅读时间**：20 分钟  
**适合**：AI 深度学习

---

### 4️⃣ 参考文档

#### [CHANGELOG.md](CHANGELOG.md)
**版本更新日志**

- 版本历史
- 新增功能
- Bug 修复
- 重要变更

**适合**：了解项目演进

---

#### [测试报告.md](测试报告.md)
**测试覆盖报告**

- 199 个测试用例
- 功能覆盖详情
- 性能测试结果
- 边界场景测试

**适合**：了解项目质量

---

#### [DOCS_NAVIGATION.md](DOCS_NAVIGATION.md)
**文档导航（旧版）**

- 文档分类索引
- 快速查找入口

**适合**：文档导航

---

### 5️⃣ 项目管理

#### [PROJECT_CHECKLIST.md](PROJECT_CHECKLIST.md)
**项目文件清单**

- 完整文件列表
- 文件说明
- 状态检查

---

#### [备注.md](备注.md)
**项目备注**

- 开发笔记
- 注意事项

---

## 🎓 学习路径

### 新手路径（30分钟）

1. **[README.md](README.md)** (10分钟)
   - 快速了解功能
   - 运行第一个示例

2. **[examples/basic-usage.js](examples/basic-usage.js)** (10分钟)
   - 运行基础示例
   - 理解基本语法

3. **[LLM_PROMPT.md](LLM_PROMPT.md)** (10分钟)
   - 学习核心语法
   - 尝试写第一个规则

### 进阶路径（2小时）

1. **[USAGE_GUIDE.md](USAGE_GUIDE.md) - 选择器部分** (30分钟)
   - 深入学习每种选择器
   - 理解属性提取

2. **[USAGE_GUIDE.md](USAGE_GUIDE.md) - 操作符部分** (20分钟)
   - 掌握拼接、回退、净化
   - 学习组合使用

3. **运行所有示例** (30分钟)
   ```bash
   pnpm run examples
   ```
   - 理解实战应用
   - 修改示例练习

4. **[USAGE_GUIDE.md](USAGE_GUIDE.md) - 实战案例** (40分钟)
   - 学习完整项目结构
   - 模仿编写自己的爬虫

### 高级路径（持续学习）

1. **[USAGE_GUIDE.md](USAGE_GUIDE.md) - 高级用法**
   - 复杂嵌套规则
   - 动态规则生成
   - 自定义处理

2. **[USAGE_GUIDE.md](USAGE_GUIDE.md) - API 参考**
   - 完整 API 文档
   - 配置选项详解

3. **实战项目开发**
   - 应用到真实项目
   - 性能优化
   - 错误处理

---

## 📊 文档对比

| 文档 | 详细度 | 阅读时间 | 适合人群 |
|------|--------|----------|----------|
| **README.md** | ⭐⭐ | 10分钟 | 所有人 |
| **USAGE_GUIDE.md** | ⭐⭐⭐⭐⭐ | 60分钟+ | 深度学习 |
| **LIBRARY_USAGE.md** | ⭐⭐⭐ | 15分钟 | 库集成 |
| **examples/** | ⭐⭐⭐ | 30分钟 | 实践学习 |
| **LLM_PROMPT.md** | ⭐⭐ | 5分钟 | AI 辅助 |
| **AI_PROMPT_SIMPLE.md** | ⭐⭐⭐ | 8分钟 | 快速查询 |
| **AI_RULE_WRITING_GUIDE.md** | ⭐⭐⭐⭐ | 20分钟 | AI 深度 |

---

## 🔍 快速查找

### 我想学习...

- **选择器语法** → [USAGE_GUIDE.md#选择器详解](USAGE_GUIDE.md#-选择器详解)
- **操作符用法** → [USAGE_GUIDE.md#操作符详解](USAGE_GUIDE.md#-操作符详解)
- **API 接口** → [USAGE_GUIDE.md#API-参考](USAGE_GUIDE.md#-api-参考)
- **实战案例** → [USAGE_GUIDE.md#实战案例](USAGE_GUIDE.md#-实战案例)
- **性能优化** → [USAGE_GUIDE.md#性能优化](USAGE_GUIDE.md#-性能优化)
- **错误处理** → [USAGE_GUIDE.md#错误处理](USAGE_GUIDE.md#-错误处理)

### 我想解决...

- **如何安装？** → [README.md#安装](README.md#-安装)
- **如何开始？** → [README.md#快速开始](README.md#-快速开始)
- **如何引用？** → [LIBRARY_USAGE.md](LIBRARY_USAGE.md)
- **运行示例？** → [examples/README.md](examples/README.md)
- **AI 辅助？** → [LLM_PROMPT.md](LLM_PROMPT.md)
- **常见问题？** → [USAGE_GUIDE.md#常见问题](USAGE_GUIDE.md#-常见问题)

---

## 💡 使用建议

### 第一次使用？
👉 从 [README.md](README.md) 开始，5分钟快速入门

### 需要完整学习？
👉 阅读 [USAGE_GUIDE.md](USAGE_GUIDE.md)，这是最全面的文档

### 想快速实践？
👉 运行 [examples/](examples/) 中的示例代码

### 想让 AI 帮忙？
👉 复制 [LLM_PROMPT.md](LLM_PROMPT.md) 给 ChatGPT/Claude

### 要集成到项目？
👉 查看 [LIBRARY_USAGE.md](LIBRARY_USAGE.md)

---

## 📞 获取帮助

- **文档问题**：查看 [USAGE_GUIDE.md#常见问题](USAGE_GUIDE.md#-常见问题)
- **Bug 报告**：[GitHub Issues](https://github.com/LegadoTeam/legado-rule/issues)
- **功能建议**：[GitHub Discussions](https://github.com/LegadoTeam/legado-rule/discussions)

---

**📚 文档持续完善中，欢迎反馈！**
