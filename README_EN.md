[中文](README.md) | Endlish

# XA Note

XA Note is a **lightweight, fully self-hosted personal note-taking system**, designed for users who prioritize **privacy, security, and full control**. You deploy and manage it entirely on your own infrastructure. It supports Markdown editing, category management, tagging, and full-text search—offering a smooth writing experience and clear knowledge organization.

Author's Blog: [https://www.xiaoa.me](https://www.xiaoa.me)

If you find this project helpful, please give it a `Star` ⭐!

![](screenshot.png)

## 🌟 Core Features

### 🔐 Full Data Ownership
- **Self-hosted deployment**: All data resides solely on your own server
- **No third-party dependencies**: No reliance on external cloud services—complete data sovereignty
- **Privacy-first**: Your data never leaves your control

### 📝 Powerful Note-Taking Capabilities
- **Markdown editor**: Real-time preview with rich syntax support
- **Category management**: Flexible categorization for structured knowledge
- **Tag system**: Multi-dimensional tagging for quick note discovery
- **Full-text search**: Powerful search to instantly locate content
- **Data export**: Export notes as Markdown files to avoid vendor lock-in

### 🛡️ Multi-Layer Security
- **Multiple login options**: Username/password or GitHub OAuth (not supported on Cloudflare Pages)
- **Security verification**: Optional image CAPTCHA or Cloudflare Turnstile protection
- **Screen lock**: Prevent unauthorized access with an inactivity lock
- **Access control**: Ideal for long-term use on personal servers or private networks
- **Audit logging**: Comprehensive operation logs for security auditing

### 🔗 Secure Sharing & Backup
- **Read-only sharing**: Share notes with optional password and expiration time
- **WebDAV backup**: Integrate with cloud storage or private NAS for automatic sync (not supported on Cloudflare Pages)
- **Long-term preservation**: Multiple backup strategies ensure data safety

### 🎨 Excellent User Experience
- **Responsive design**: Works seamlessly on desktop and mobile devices
- **Theme switching**: Toggle between light and dark modes
- **Multi-language support**: Switch effortlessly between Chinese and English
- **Keyboard shortcuts**: Boost productivity with hotkeys
- **System monitoring**: Built-in log management with filtering and viewing capabilities

---

## 🚀 Quick Deployment Guide

### Method 1: One-Click Deploy on Cloudflare

This project ships with a GitHub Actions workflow that automatically deploys to Cloudflare Pages whenever you push to the `main` branch. Complete the following one-time setup before deploying.

> 📌 Full illustrated guide: [DEPLOYMENT.md](DEPLOYMENT.md)

#### Step 1: Fork This Repository
Fork this repo to your own account-and don't forget to give it a `Star`! ⭐

#### Step 2: Create the D1 Database (one-time)
XA Note uses Cloudflare D1 as its database. You only need to create an empty database-the **table schema is created automatically on the app's first startup**, so there's no need to import any SQL manually.

```bash
# Create the D1 database (name: xa-note-db)
wrangler d1 create xa-note-db
```

> You can also create an empty database named `xa-note-db` manually in the Cloudflare dashboard.

#### Step 3: Create a Cloudflare API Token
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **My Profile** -> **API Tokens** -> **Create Token**
2. Choose the **Edit Cloudflare Workers** template; permissions must include:
   - Account -> **Cloudflare Pages: Edit**
   - Account -> **Cloudflare Workers: Edit**
3. **Copy and save** the generated API Token (shown only once)

#### Step 4: Configure GitHub Secrets
In your GitHub repo -> **Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret**, add:

| Name | Value |
|------|-------|
| `CLOUDFLARE_API_TOKEN` | The API Token from Step 3 |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID (visible in the dashboard sidebar) |

#### Step 5: Bind the D1 Database (one-time, via Dashboard)
After the first automatic deployment creates the Pages project, bind the database so the app can read/write data:
1. Cloudflare Dashboard -> **Workers & Pages** -> open the `xa-note` project
2. **Settings** -> **Bindings** -> add a **D1 database** binding:
   - **Variable name**: `DB`
   - **D1 database**: `xa-note-db`
3. Go to **Deployments** -> find the latest deployment and click **Retry deployment** (a redeploy is required after binding D1 for it to take effect)

#### Step 6: Trigger Deployment and Visit
1. Push any commit to the `main` branch (or manually **Run workflow** under the repo's **Actions** tab) and GitHub Actions will deploy automatically
2. Once deployed, visit your site at: `https://xa-note.pages.dev`
3. **Custom domain**: Bind your own domain in the Pages project settings
4. **Complete setup**: Follow the onboarding wizard and create your first note!

> 💡 Every subsequent push to `main` triggers an automatic deployment-no manual action needed.

---

### Method 2: Docker Deployment

#### **One-Command Deployment**
```bash
# Pull the image
docker pull awinds/xa-note:latest

mkdir -p /var/xa-note/data

# Run container
docker run -d \
  --name xa-note \
  -p 9915:9915 \
  -v /var/xa-note/data:/app/data \
  -e NODE_ENV=production \
  -e PORT=9915 \
  --restart unless-stopped \
  awinds/xa-note:latest
```

#### **Docker Compose Deployment**
```yaml
# docker-compose.yml
version: "3.9"

services:
  xa-note:
    image: awinds/xa-note:latest
    container_name: xa-note
    ports:
      - "9915:9915"
    volumes:
      - /var/xa-note/data:/app/data
    environment:
      NODE_ENV: production
      PORT: 9915
    restart: unless-stopped
```

#### **Nginx Reverse Proxy Example**
```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:9915;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

Thanks to all contributors of the open-source ecosystem. XA Note leverages the following excellent open-source projects:

- React – UI library  
- TypeScript – Typed JavaScript  
- Vite – Next-gen build tool  
- Hono – Lightweight web framework  
- Tailwind CSS – Utility-first CSS framework  
- SQLite – Embedded database  

---

**XA Note** – A lightweight, self-hosted note-taking system, your personal knowledge management companion 🚀