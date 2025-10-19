# AI-Note-Book Frontend

AI智能笔记本应用的前端部分，基于React + TypeScript构建。

## 项目简介

这是一个现代化的AI智能笔记本应用前端，提供直观的用户界面来管理笔记、项目和AI配置。

## 技术栈

- **React 18** - 现代化的前端框架
- **TypeScript** - 类型安全的JavaScript
- **React Router** - 客户端路由
- **Axios** - HTTP客户端
- **CSS3** - 现代化样式

## 主要功能

- 📝 笔记管理 - 创建、编辑、删除笔记
- 📁 项目管理 - 组织和管理项目
- 🤖 AI配置 - 管理AI模型和API配置
- 🎨 现代化UI - 响应式设计，支持多种设备
- 🔍 搜索功能 - 快速查找笔记和项目

## 项目结构

```
src/
├── components/          # 可复用组件
│   ├── NoteManagement/  # 笔记管理组件
│   ├── ProjectManagement/ # 项目管理组件
│   └── APIConfig/       # API配置组件
├── pages/              # 页面组件
├── services/           # API服务
├── types/              # TypeScript类型定义
├── hooks/              # 自定义React Hooks
└── utils/              # 工具函数
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建生产版本

```bash
npm run build
```

### 运行测试

```bash
npm test
```

## 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

## 相关仓库

- [后端仓库](https://github.com/xuanjsh95/AI-notebook) - AI笔记本后端API

## 开发指南

1. 确保后端服务正在运行
2. 配置正确的API端点
3. 遵循项目的代码规范
4. 提交前运行测试

## 许可证

MIT License
