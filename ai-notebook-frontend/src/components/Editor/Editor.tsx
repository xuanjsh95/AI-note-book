import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  IconButton,
  Toolbar,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  Code,
  Save,
  Preview,
} from '@mui/icons-material';

interface EditorProps {
  content: string;
  title: string;
  tags: string[];
  onContentChange: (content: string) => void;
  onTitleChange: (title: string) => void;
  onTagsChange: (tags: string[]) => void;
  onSave: () => void;
  readOnly?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  content,
  title,
  tags,
  onContentChange,
  onTitleChange,
  onTagsChange,
  onSave,
  readOnly = false,
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && newTag.trim()) {
      if (!tags.includes(newTag.trim())) {
        onTagsChange([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const formatText = (format: string) => {
    // 简单的文本格式化功能
    const textarea = document.querySelector('textarea');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      
      let formattedText = '';
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `<u>${selectedText}</u>`;
          break;
        case 'bullet':
          formattedText = `\n- ${selectedText}`;
          break;
        case 'number':
          formattedText = `\n1. ${selectedText}`;
          break;
        case 'code':
          formattedText = `\`${selectedText}\``;
          break;
        default:
          formattedText = selectedText;
      }
      
      const newContent = content.substring(0, start) + formattedText + content.substring(end);
      onContentChange(newContent);
    }
  };

  return (
    <Paper elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 工具栏 */}
      {!readOnly && (
        <Toolbar variant="dense" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <IconButton onClick={() => formatText('bold')} size="small">
            <FormatBold />
          </IconButton>
          <IconButton onClick={() => formatText('italic')} size="small">
            <FormatItalic />
          </IconButton>
          <IconButton onClick={() => formatText('underline')} size="small">
            <FormatUnderlined />
          </IconButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <IconButton onClick={() => formatText('bullet')} size="small">
            <FormatListBulleted />
          </IconButton>
          <IconButton onClick={() => formatText('number')} size="small">
            <FormatListNumbered />
          </IconButton>
          <IconButton onClick={() => formatText('code')} size="small">
            <Code />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={() => setIsPreview(!isPreview)} size="small">
            <Preview />
          </IconButton>
          <IconButton onClick={onSave} size="small" color="primary">
            <Save />
          </IconButton>
        </Toolbar>
      )}

      {/* 标题输入 */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="输入笔记标题..."
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          disabled={readOnly}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '1.5rem',
              fontWeight: 'bold',
            },
          }}
        />
      </Box>

      {/* 标签管理 */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={readOnly ? undefined : () => handleRemoveTag(tag)}
              size="small"
              color="primary"
              variant="outlined"
            />
          ))}
          {!readOnly && (
            <TextField
              size="small"
              placeholder="添加标签..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleAddTag}
              sx={{ minWidth: 120 }}
            />
          )}
        </Stack>
      </Box>

      {/* 内容编辑区 */}
      <Box sx={{ flex: 1, p: 2 }}>
        {isPreview ? (
          <Box
            sx={{
              height: '100%',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
            }}
          >
            <Typography variant="body1" component="div">
              {content || '暂无内容'}
            </Typography>
          </Box>
        ) : (
          <TextField
            fullWidth
            multiline
            variant="outlined"
            placeholder="开始写作..."
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            disabled={readOnly}
            sx={{
              height: '100%',
              '& .MuiOutlinedInput-root': {
                height: '100%',
                alignItems: 'flex-start',
              },
              '& .MuiOutlinedInput-input': {
                height: '100% !important',
                overflow: 'auto !important',
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: 1.5,
              },
            }}
          />
        )}
      </Box>
    </Paper>
  );
};

export default Editor;