# 书源规则解析器 - 文档导航

欢迎使用书源规则解析器！本文档帮助您快速找到所需的资源。

## 📚 核心文档

### [README.md](README.md)
项目主文档，包含：
- 快速入门示例
- 核心特性概览
- 选择器速查表
- 实战案例
- 文档索引

**适用于**：快速了解项目和入门使用

---

### [USAGE_GUIDE.md](USAGE_GUIDE.md) ⭐ **完整使用指南**
**npm 包完整使用文档**（推荐深入学习）

包含：
- 📦 详细安装说明
- 🚀 快速开始教程
- 🎯 核心概念解析
- 📖 所有选择器详解（CSS、JSON、正则、XPath、JS、文本）
- 🔧 操作符完整说明（拼接、回退、净化）
- 📚 完整 API 参考
- 🎓 高级用法指南
- 💼 实战案例（电商、新闻、小说、API）
- ⚡ 性能优化建议
- 🚨 错误处理方案
- ❓ 常见问题解答

**适用于**：
- npm 包完整功能参考
- 深入学习所有功能
- 实际项目开发
- API 完整文档查询

---

### [LIBRARY_USAGE.md](LIBRARY_USAGE.md)
库引用和导出说明

包含：
- 导出内容列表
- 引用方式示例
- npm 发布指南
- 实际应用示例

**适用于**：在其他项目中引用本库

---

### [CHANGELOG.md](CHANGELOG.md)
版本更新日志
- 版本历史
- 新增功能
- Bug 修复记录
- 重要变更说明

**适用于**：了解版本更新内容

---

### [测试报告.md](测试报告.md)
详细的测试报告
- 测试用例统计
- 功能覆盖率
- 性能测试结果
- 测试执行细节

**适用于**：了解项目质量和可靠性

---

## 🎯 示例代码

### [examples/](examples/)
实战示例代码目录

- **[basic-usage.js](examples/basic-usage.js)**
  - 各种选择器基础用法
  - 操作符组合示例
  - 新手入门必看

- **[ecommerce-example.js](examples/ecommerce-example.js)**
  - 电商网站数据提取
  - 商品信息格式化
  - 价格、库存等实战案例

- **[novel-example.js](examples/novel-example.js)**
  - 小说网站章节提取
  - 书籍信息获取
  - 章节列表处理

- **[json-example.js](examples/json-example.js)**
  - JSON API 数据提取
  - JSONPath 高级用法
  - 复杂数据结构处理

- **[README.md](examples/README.md)**
  - 示例文件详细说明
  - 运行指南

**运行示例**：
```bash
pnpm run examples           # 运行所有示例
pnpm run example:basic      # 基础用法
pnpm run example:ecommerce  # 电商案例
pnpm run example:novel      # 小说案例
pnpm run example:json       # JSON案例
```

---

## 🤖 AI 辅助文档

帮助大模型理解规则语法并辅助编写规则

### [LLM_PROMPT.md](LLM_PROMPT.md)
**精简版提示词** ⭐ 推荐首选

- 最核心的语法要点
- 常用模式和模板
- 适合直接作为 AI 系统提示词
- 快速参考

**适用于**：
- 作为 ChatGPT/Claude 等的系统提示
- 快速查询规则语法
- AI 对话中引用

---

### [AI_PROMPT_SIMPLE.md](AI_PROMPT_SIMPLE.md)
**简化版指南**

- 核心语法表格
- 常用规则模板
- 实用示例库
- 编写流程说明

**适用于**：
- 需要更多示例的场景
- AI 辅助编写复杂规则
- 学习规则编写模式

---

### [AI_RULE_WRITING_GUIDE.md](AI_RULE_WRITING_GUIDE.md)
**详细完整版指南**

- 完整的语法说明
- 详细的最佳实践
- 常见错误和解决方案
- 调试技巧

**适用于**：
- 深入理解规则系统
- 解决复杂问题
- 规则优化和调试

---

## 🔧 开发文档

### [备注.md](备注.md)
开发备注和说明
- 项目设计思路
- 技术选型说明
- 开发注意事项

---

## 📖 使用建议

### 新手入门路径
1. 阅读 [README.md](README.md) 了解基本概念
2. 运行 [examples/basic-usage.js](examples/basic-usage.js) 体验基础功能
3. 参考 [LLM_PROMPT.md](LLM_PROMPT.md) 快速查询语法

### AI 辅助编写规则
1. 将 [LLM_PROMPT.md](LLM_PROMPT.md) 内容提供给 AI
2. 描述您的数据提取需求
3. AI 会根据提示词生成相应规则
4. 参考 [examples/](examples/) 中的实战案例优化规则

### 实战开发
1. 参考 [examples/](examples/) 中对应场景的示例
2. 根据实际需求修改规则
3. 查看 [README.md](README.md) 的 API 文档了解高级用法
4. 遇到问题查看 [AI_RULE_WRITING_GUIDE.md](AI_RULE_WRITING_GUIDE.md) 的故障排查部分

### 深入学习
1. 查看 [测试报告.md](测试报告.md) 了解测试用例
2. 阅读 `test/` 目录下的测试代码
3. 查看 `src/` 目录下的源码实现
4. 参考 [CHANGELOG.md](CHANGELOG.md) 了解新特性

---

## 🚀 快速命令

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 运行所有示例
pnpm run examples

# 测试覆盖率
pnpm run coverage

# 启动测试UI
pnpm run test:ui

# 开发模式
pnpm run dev
```

---

## 📞 获取帮助

1. **查看文档**：先查阅相关文档
2. **运行示例**：参考示例代码
3. **AI 辅助**：使用 AI 提示词文档
4. **提交 Issue**：在 GitHub 上提交问题

---

## 🎯 快速查找

| 需求 | 推荐文档 |
|------|----------|
| 了解项目功能 | [README.md](README.md) |
| 快速上手 | [examples/basic-usage.js](examples/basic-usage.js) |
| AI 辅助编写规则 | [LLM_PROMPT.md](LLM_PROMPT.md) |
| 电商数据提取 | [examples/ecommerce-example.js](examples/ecommerce-example.js) |
| 小说章节提取 | [examples/novel-example.js](examples/novel-example.js) |
| JSON 数据提取 | [examples/json-example.js](examples/json-example.js) |
| 规则语法查询 | [LLM_PROMPT.md](LLM_PROMPT.md) 或 [README.md](README.md) |
| 故障排查 | [AI_RULE_WRITING_GUIDE.md](AI_RULE_WRITING_GUIDE.md) |
| 版本更新 | [CHANGELOG.md](CHANGELOG.md) |
| 测试覆盖 | [测试报告.md](测试报告.md) |

---

**Happy Coding! 🎉**
