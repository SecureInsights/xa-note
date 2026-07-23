# XA Note - 一键部署指南

## 全自动部署到 Cloudflare Pages

本项目已配置 GitHub Actions，支持一键自动部署到 Cloudflare Pages。

### 首次设置步骤（只需一次）

#### 1. 在 Cloudflare 创建 API Token

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **My Profile** → **API Tokens**
3. 点击 **Create Token**
4. 选择 **Edit Cloudflare Workers** 模板
5. 权限配置：
   - Account.Cloudflare Pages: Edit
   - Account.Cloudflare Workers: Edit
6. 点击 **Continue to summary** 然后 **Create Token**
7. **复制并保存**生成的 API Token（只会显示一次）

#### 2. 获取 Cloudflare Account ID

1. 在 Cloudflare Dashboard 右侧边栏找到 **Account ID**
2. 或者访问：https://dash.cloudflare.com/ 查看顶部账户信息
3. 复制 Account ID

#### 3. 在 GitHub 配置 Secrets

1. 打开你的 GitHub 仓库
2. 进入 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加以下两个 secrets：

   | Name | Value |
   |------|-------|
   | `CLOUDFLARE_API_TOKEN` | 第 1 步创建的 API Token |
   | `CLOUDFLARE_ACCOUNT_ID` | 第 2 步获取的 Account ID |

#### 4. 创建 Cloudflare Pages 项目（可选）

如果尚未创建项目：
1. 登录 Cloudflare Dashboard
2. 进入 **Workers & Pages** → **Create application** → **Pages**
3. 选择 **Connect to Git**
4. 选择你的仓库
5. 项目名称设为 `xa-note`（或修改 `.github/workflows/deploy.yml` 中的 `project-name`）
6. 构建设置：
   - Build command: `npm run build`
   - Build output directory: `/` (根目录)
7. 点击 **Save and Deploy**

### 自动部署流程

完成上述设置后，每次推送代码到 `main` 或 `master` 分支时：

1. GitHub Actions 会自动触发
2. 安装依赖
3. 自动部署到 Cloudflare Pages
4. 部署完成后，你的应用将通过 `https://xa-note.pages.dev` 访问

### 手动触发部署

如需手动触发部署：
1. 进入 GitHub 仓库的 **Actions** 标签
2. 选择 **Deploy to Cloudflare Pages** workflow
3. 点击 **Run workflow**
4. 选择分支并确认

### JWT 密钥说明

- ✅ **安全特性**：JWT_SECRET 每次启动时自动生成随机密钥
- ⚠️ **注意**：项目重启后所有现有 token 将失效，用户需要重新登录
- 🔒 **优势**：即使 token 被窃取，重启后立即失效，极大提升安全性

### 环境变量（可选）

如需自定义配置，可在 Cloudflare Pages 设置中添加环境变量：
1. Cloudflare Dashboard → Workers & Pages → 你的项目
2. **Settings** → **Environment variables**
3. 添加变量（当前不需要额外变量）

### 故障排查

如果部署失败：
1. 检查 GitHub Actions 日志
2. 验证 API Token 权限是否正确
3. 确认 Account ID 是否正确
4. 确保 Cloudflare Pages 项目名称匹配

---

**享受一键部署的便利！** 🚀
