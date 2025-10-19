# AI记事本 - 部署指南

## 📋 项目概述

AI记事本是一个现代化的笔记管理应用，支持智能聊天、番茄钟、项目管理等功能。

### 技术栈
- **前端**: React + TypeScript + Material-UI
- **后端**: Node.js + Express + TypeScript
- **部署**: Vercel (前后端分离部署)

## 🚀 部署步骤

### 1. 后端部署 (Vercel)

#### 1.1 准备工作
- 确保代码已推送到 GitHub 仓库
- 后端代码位于 `ai-notebook-backend/` 目录

#### 1.2 Vercel 配置
1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 选择你的 GitHub 仓库
4. 配置项目设置：
   - **Framework Preset**: Other
   - **Root Directory**: `ai-notebook-backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### 1.3 环境变量配置
在 Vercel 项目设置中添加以下环境变量：

```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-change-this-in-production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

#### 1.4 部署
点击 "Deploy" 按钮开始部署。

### 2. 前端部署 (Vercel)

#### 2.1 准备工作
- 确保前端代码已推送到 GitHub 仓库
- 前端代码位于 `ai-notebook-frontend/` 目录

#### 2.2 Vercel 配置
1. 在 Vercel 中创建新项目
2. 选择同一个 GitHub 仓库
3. 配置项目设置：
   - **Framework Preset**: Create React App
   - **Root Directory**: `ai-notebook-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

#### 2.3 环境变量配置
在 Vercel 项目设置中添加以下环境变量：

```env
REACT_APP_API_URL=https://your-backend-domain.vercel.app/api
```

#### 2.4 部署
点击 "Deploy" 按钮开始部署。

## 🔧 配置说明

### 后端配置文件

#### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/src/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/src/index.ts"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "src/index.ts": {
      "maxDuration": 30
    }
  }
}
```

#### CORS 配置
后端已配置支持多个域名：
- `http://localhost:3000` (本地开发)
- `https://ai-notebook-frontend.vercel.app`
- `https://ai-notebook-frontend-git-main.vercel.app`
- `https://ai-notebook-frontend-xuanjingsheng.vercel.app`
- 环境变量 `CORS_ORIGIN` 指定的域名

### 前端配置文件

#### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm start",
  "installCommand": "npm install"
}
```

## 🌐 域名配置

### 自定义域名 (可选)
1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录
4. 更新环境变量中的域名配置

## 🔍 故障排除

### 常见问题

#### 1. API 无法访问 (404 错误)
- 检查后端 `vercel.json` 路由配置
- 确认环境变量设置正确
- 查看 Vercel 部署日志

#### 2. CORS 错误
- 检查后端 CORS 配置
- 确认前端域名已添加到允许列表
- 更新 `CORS_ORIGIN` 环境变量

#### 3. 前端无法连接后端
- 检查 `REACT_APP_API_URL` 环境变量
- 确认后端 API 地址正确
- 测试后端健康检查端点: `/api/health`

#### 4. 构建失败
- 检查 `package.json` 依赖
- 查看构建日志错误信息
- 确认 TypeScript 配置正确

### 调试命令

#### 本地测试后端
```bash
cd ai-notebook-backend
npm install
npm run dev
```

#### 本地测试前端
```bash
cd ai-notebook-frontend
npm install
npm start
```

#### 测试 API 连接
```bash
curl https://your-backend-domain.vercel.app/api/health
```

## 📝 部署检查清单

### 后端部署
- [ ] 代码已推送到 GitHub
- [ ] Vercel 项目已创建
- [ ] Root Directory 设置为 `ai-notebook-backend`
- [ ] 环境变量已配置
- [ ] 部署成功
- [ ] API 健康检查通过

### 前端部署
- [ ] 代码已推送到 GitHub
- [ ] Vercel 项目已创建
- [ ] Root Directory 设置为 `ai-notebook-frontend`
- [ ] Framework Preset 设置为 Create React App
- [ ] 环境变量已配置
- [ ] 部署成功
- [ ] 前端页面可访问

### 集成测试
- [ ] 前端可以连接后端 API
- [ ] 用户注册/登录功能正常
- [ ] 笔记 CRUD 操作正常
- [ ] 聊天功能正常
- [ ] 番茄钟功能正常

## 🔄 更新部署

### 自动部署
Vercel 已配置自动部署，当你推送代码到 GitHub 主分支时会自动触发部署。

### 手动部署
1. 登录 Vercel 控制台
2. 选择对应项目
3. 点击 "Redeploy" 按钮

## 📞 支持

如果遇到部署问题，请检查：
1. Vercel 部署日志
2. 浏览器开发者工具控制台
3. 网络请求状态

---

**最后更新**: 2024年8月27日
**版本**: 1.0.0