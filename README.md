# 🌿 全球采购联系人搜索系统

可降解纸袋 · 垃圾袋 · 发达国家零售商采购联系人一键搜索

---

## 🚀 三步完成部署

### 第一步：上传代码到 GitHub

```bash
# 在项目根目录执行
git init
git add .
git commit -m "feat: 全球采购联系人搜索系统"

# 在 GitHub 创建仓库后
git remote add origin https://github.com/你的用户名/eco-buyer-search.git
git branch -M main
git push -u origin main
```

---

### 第二步：部署到 Vercel

1. 访问 [vercel.com](https://vercel.com) → 登录
2. 点击 **"Add New → Project"**
3. 选择刚才创建的 GitHub 仓库 `eco-buyer-search`
4. 点击 **"Deploy"**（默认配置即可）

---

### 第三步：配置 Claude API Key

1. 打开 [console.anthropic.com](https://console.anthropic.com/settings/keys) 获取 API Key
2. 在 Vercel Dashboard → 进入你的项目 → **Settings → Environment Variables**
3. 添加以下变量：

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-你的key...` |

4. 回到 **Deployments** → 点击 **"Redeploy"** 使环境变量生效

---

## ✅ 完成！

部署成功后，Vercel 会给你一个访问链接，例如：

```
https://eco-buyer-search.vercel.app
```

客户访问该链接，选择市场和产品，点击一个按钮即可搜索全球采购联系人。

---

## 💻 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local，填入真实的 ANTHROPIC_API_KEY

# 启动开发服务器
npm run dev
# 访问 http://localhost:3000
```

---

## 📁 项目结构

```
eco-buyer-search/
├── app/
│   ├── layout.js          # 页面布局 + 元数据
│   ├── globals.css        # 全局样式 + Tailwind
│   ├── page.js            # 主界面（一键搜索、结果表格、导出）
│   └── api/
│       └── search/
│           └── route.js   # Claude API 代理（Edge Runtime + SSE 流式）
├── .env.local.example     # 环境变量模板
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## ⚙️ 功能说明

| 功能 | 说明 |
|------|------|
| **AI 搜索** | 调用 Claude Sonnet + 网络搜索，实时查找采购联系人 |
| **流式输出** | SSE 实时显示搜索日志和进度，无需等待 |
| **Edge Runtime** | 无超时限制，免费 Hobby 计划可用 |
| **备用数据** | API 失败时自动加载 20+ 内置企业数据库 |
| **批量邮件** | 选中联系人 → 一键跳转 Vercel 邮件生成器 |
| **CSV 导出** | 导出所选联系人为 Excel 可读的 CSV 文件 |
| **国家筛选** | 美国、英国、德国、法国、澳大利亚、加拿大、日本等 |

---

## 🔗 相关链接

- [Anthropic Console](https://console.anthropic.com) — 获取 API Key
- [Vercel Dashboard](https://vercel.com/dashboard) — 管理部署
- [Vercel 邮件生成器](https://v0-email-generator-one.vercel.app/) — 批量生成开发信
