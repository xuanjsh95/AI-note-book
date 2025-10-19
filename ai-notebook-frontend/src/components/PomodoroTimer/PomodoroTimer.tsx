import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Schedule as ClockIcon,
} from '@mui/icons-material';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25分钟，以秒为单位
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime] = useState(25 * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            // 可以在这里添加提醒音效或通知
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 计算时钟指针角度
  const getClockAngles = (seconds: number) => {
    const totalMinutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    // 分针角度：每分钟6度 (360/60)
    const minuteAngle = (25 - totalMinutes) * 6;
    // 秒针角度：每秒6度 (360/60)
    const secondAngle = (60 - remainingSeconds) * 6;
    
    return { minuteAngle, secondAngle };
  };

  const { minuteAngle, secondAngle } = getClockAngles(timeLeft);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ClockIcon sx={{ mr: 1 }} />
        <Typography variant="h5" fontWeight={600}>
          番茄钟
        </Typography>
      </Box>

      <Paper sx={{ p: 3, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* 圆形时钟 */}
        <Box sx={{ 
          position: 'relative',
          width: 300,
          height: 300,
          borderRadius: '50%',
          border: '8px solid',
          borderColor: 'primary.main',
          backgroundColor: 'background.paper',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* 时钟刻度 */}
          {Array.from({ length: 12 }, (_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: 2,
                height: 20,
                backgroundColor: 'text.secondary',
                transformOrigin: 'center bottom',
                transform: `rotate(${i * 30}deg) translateY(-140px)`,
              }}
            />
          ))}
          
          {/* 分钟刻度 */}
          {Array.from({ length: 60 }, (_, i) => (
            i % 5 !== 0 && (
              <Box
                key={`min-${i}`}
                sx={{
                  position: 'absolute',
                  width: 1,
                  height: 10,
                  backgroundColor: 'text.disabled',
                  transformOrigin: 'center bottom',
                  transform: `rotate(${i * 6}deg) translateY(-140px)`,
                }}
              />
            )
          ))}

          {/* 中心点 */}
          <Box sx={{
            position: 'absolute',
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            zIndex: 3
          }} />

          {/* 分针 */}
          <Box sx={{
            position: 'absolute',
            width: 4,
            height: 80,
            backgroundColor: 'primary.main',
            transformOrigin: 'center bottom',
            transform: `rotate(${minuteAngle}deg)`,
            borderRadius: '2px 2px 0 0',
            zIndex: 2
          }} />

          {/* 秒针 */}
          <Box sx={{
            position: 'absolute',
            width: 2,
            height: 100,
            backgroundColor: 'error.main',
            transformOrigin: 'center bottom',
            transform: `rotate(${secondAngle}deg)`,
            borderRadius: '1px 1px 0 0',
            zIndex: 1
          }} />

          {/* 数字显示 */}
          <Typography 
            variant="h4" 
            sx={{ 
              position: 'absolute',
              bottom: 60,
              fontFamily: 'monospace', 
              fontWeight: 'bold',
              color: 'primary.main',
              backgroundColor: 'rgba(255,255,255,0.9)',
              px: 2,
              py: 1,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {formatTime(timeLeft)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
          {!isRunning ? (
            <IconButton 
              onClick={handleStart} 
              color="primary" 
              size="large"
              disabled={timeLeft === 0}
              sx={{ 
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': { backgroundColor: 'primary.dark' }
              }}
            >
              <PlayIcon sx={{ fontSize: 40 }} />
            </IconButton>
          ) : (
            <IconButton 
              onClick={handlePause} 
              color="warning" 
              size="large"
              sx={{ 
                backgroundColor: 'warning.main',
                color: 'white',
                '&:hover': { backgroundColor: 'warning.dark' }
              }}
            >
              <PauseIcon sx={{ fontSize: 40 }} />
            </IconButton>
          )}
          
          <IconButton 
            onClick={handleStop} 
            color="error" 
            size="large"
            disabled={timeLeft === totalTime && !isRunning}
            sx={{ 
              backgroundColor: 'error.main',
              color: 'white',
              '&:hover': { backgroundColor: 'error.dark' },
              '&:disabled': { backgroundColor: 'action.disabled' }
            }}
          >
            <StopIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
        
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
          {timeLeft === 0 ? '时间到！休息一下吧 🎉' : 
           isRunning ? '专注工作中...' : '点击开始专注工作'}
        </Typography>
      </Paper>
    </Box>
  );
};

export default PomodoroTimer;