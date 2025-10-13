# 包管理器更新说明

## ✅ 已完成更新

项目包管理器已统一为 **pnpm**，所有文档中的命令已更新。

### 📝 更新的文件

1. **README.md** - 主文档
   - ✅ 安装命令：`pnpm install book-source-rule-parser`
   - ✅ 运行示例：`pnpm run example:*`
   - ✅ 开发命令：`pnpm test`, `pnpm run coverage`

2. **examples/README.md** - 示例说明
   - ✅ 安装依赖：`pnpm install`
   - ✅ 运行示例：`pnpm run example:*`
   - ✅ 保留了 `node examples/*.js` 直接运行方式

3. **DOCS_NAVIGATION.md** - 文档导航
   - ✅ 快速命令：`pnpm test`, `pnpm run examples`

### 🎯 标准命令

现在所有用户应该使用以下命令：

```bash
# 安装项目
pnpm install

# 运行测试
pnpm test

# 运行示例
pnpm run examples
pnpm run example:basic
pnpm run example:ecommerce
pnpm run example:novel
pnpm run example:json

# 测试覆盖率
pnpm run coverage

# 测试UI
pnpm run test:ui

# 开发模式
pnpm run dev
```

### 📦 为什么使用 pnpm？

1. **更快的安装速度** - 内容寻址存储
2. **节省磁盘空间** - 全局存储，硬链接
3. **严格的依赖管理** - 避免幽灵依赖
4. **Monorepo 友好** - workspace 支持更好

### 💡 用户迁移指南

如果你之前使用 npm：

```bash
# 删除旧的依赖
rm -rf node_modules package-lock.json

# 使用 pnpm 安装
pnpm install
```

### ✅ 验证

检查 `package.json` 确认包管理器配置：

```json
{
  "packageManager": "pnpm@10.16.1"
}
```

---

**✨ 所有文档已更新为使用 pnpm！**
