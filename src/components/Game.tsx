import React, { useRef, useEffect } from 'react';
import { Direction, GRID_SIZE } from '../utils/gameTypes';
import { useGameLoop } from '../hooks/useGameLoop';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    snake,
    food,
    direction,
    setDirection,
    gameOver,
    score,
    moveSnake,
  } = useGameLoop();

  // 处理键盘事件
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== Direction.DOWN) setDirection(Direction.UP);
          break;
        case 'ArrowDown':
          if (direction !== Direction.UP) setDirection(Direction.DOWN);
          break;
        case 'ArrowLeft':
          if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
          break;
        case 'ArrowRight':
          if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, setDirection]);

  // 游戏循环
  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [gameOver, moveSnake]);

  // 渲染游戏画面
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 清空画布
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制蛇
    ctx.fillStyle = '#00ff00';
    snake.forEach(({ x, y }) => {
      ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    });
    
    // 绘制食物
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
  }, [snake, food]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div>分数: {score}</div>
      {gameOver && <div style={{ color: 'red' }}>游戏结束!</div>}
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{
          border: '2px solid #fff',
          margin: '20px'
        }}
      />
    </div>
  );
};

export default Game;