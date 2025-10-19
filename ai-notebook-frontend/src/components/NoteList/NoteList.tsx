import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Chip,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  InputBase,
  Divider,
} from '@mui/material';
import {
  Note as NoteIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Note } from '../../types';

interface NoteListProps {
  notes: Note[];
  selectedNoteId?: string;
  onNoteSelect: (noteId: string) => void;
  onNoteDelete: (noteId: string) => void;
  onNoteFavorite: (noteId: string, isFavorite: boolean) => void;
  onNoteEdit: (noteId: string) => void;
  loading?: boolean;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedNoteId,
  onNoteSelect,
  onNoteDelete,
  onNoteFavorite,
  onNoteEdit,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, note: Note) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedNote(note);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNote(null);
  };

  const handleDelete = () => {
    if (selectedNote) {
      onNoteDelete(selectedNote.id);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedNote) {
      onNoteEdit(selectedNote.id);
    }
    handleMenuClose();
  };

  const handleFavorite = () => {
    if (selectedNote) {
      onNoteFavorite(selectedNote.id, !selectedNote.is_favorite);
    }
    handleMenuClose();
  };

  // 过滤笔记
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return '今天';
    } else if (diffDays === 2) {
      return '昨天';
    } else if (diffDays <= 7) {
      return `${diffDays - 1}天前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };

  // 截取内容预览
  const getContentPreview = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          加载中...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 搜索框 */}
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          m: 2,
          mb: 1,
        }}
      >
        <SearchIcon sx={{ p: '10px', color: 'text.secondary' }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="搜索笔记..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      {/* 笔记列表 */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {filteredNotes.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {searchTerm ? '没有找到匹配的笔记' : '暂无笔记'}
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {filteredNotes.map((note) => (
              <React.Fragment key={note.id}>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={selectedNoteId === note.id}
                    onClick={() => onNoteSelect(note.id)}
                    sx={{
                      py: 2,
                      px: 2,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        '&:hover': {
                          backgroundColor: 'primary.light',
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <NoteIcon color={selectedNoteId === note.id ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: selectedNoteId === note.id ? 'bold' : 'normal',
                              flex: 1,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {note.title || '无标题'}
                          </Typography>
                          {note.is_favorite && (
                            <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              mb: 1,
                            }}
                          >
                            {getContentPreview(note.content)}
                          </Typography>
                          
                          {/* 标签 */}
                          {note.tags.length > 0 && (
                            <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
                              {note.tags.slice(0, 3).map((tag) => (
                                <Chip
                                  key={tag}
                                  label={tag}
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem', height: 20 }}
                                />
                              ))}
                              {note.tags.length > 3 && (
                                <Chip
                                  label={`+${note.tags.length - 3}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem', height: 20 }}
                                />
                              )}
                            </Stack>
                          )}
                          
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(note.updated_at)}
                          </Typography>
                        </Box>
                      }
                    />
                    <IconButton
                      edge="end"
                      onClick={(e) => handleMenuOpen(e, note)}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>

      {/* 上下文菜单 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>编辑</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleFavorite}>
          <ListItemIcon>
            {selectedNote?.is_favorite ? (
              <StarBorderIcon fontSize="small" />
            ) : (
              <StarIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {selectedNote?.is_favorite ? '取消收藏' : '添加收藏'}
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>删除</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NoteList;