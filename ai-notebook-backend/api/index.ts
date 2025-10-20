import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../src/routes/auth';
import notesRoutes from '../src/routes/notes';
import notebooksRoutes from '../src/routes/notebooks';
import tagsRoutes from '../src/routes/tags';
import usersRoutes from '../src/routes/users';
import chatRoutes from '../src/routes/chat';
import { errorHandler } from '../src/middleware/errorHandler';

// 加载环境变量
dotenv.config();

const app = express();

// 中间件
const allowedOrigins = [
  'http://localhost:3000',
  'https://ai-notebook-frontend.vercel.app',
  'https://ai-notebook-frontend-git-main.vercel.app',
  'https://ai-notebook-frontend-xuanjingsheng.vercel.app',
  'https://ai-note-book.vercel.app'
];

// 如果设置了环境变量，添加到允许列表
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(process.env.CORS_ORIGIN);
}

app.use(cors({
  origin: (origin, callback) => {
    // 允许没有origin的请求（如移动应用或Postman）
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/notebooks', notebooksRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/chat', chatRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Notebook Backend is running' });
});

// 错误处理中间件
app.use(errorHandler);

export default app;