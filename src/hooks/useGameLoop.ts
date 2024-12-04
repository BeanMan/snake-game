import { useState, useEffect, useCallback } from 'react';
import { Position, Direction, GRID_SIZE, GRID_COUNT } from '../utils/gameTypes';

export const useGameLoop = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // 生成新的食物位置
  const generateFood = useCallback((): Position => {
    return {
      x: Math.floor(Math.random() * GRID_COUNT),
      y: Math.floor(Math.random() * GRID_COUNT),
    };
  }, []);

  // 检查是否撞墙或撞到自己
  const checkCollision = useCallback((head: Position): boolean => {
    if (
      head.x < 0 || 
      head.x >= GRID_COUNT || 
      head.y < 0 || 
      head.y >= GRID_COUNT
    ) {
      return true;
    }
    
    for (const segment of snake.slice(1)) {
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }
    return false;
  }, [snake]);

  // 移动蛇
  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (direction) {
        case Direction.UP:
          head.y -= 1;
          break;
        case Direction.DOWN:
          head.y += 1;
          break;
        case Direction.LEFT:
          head.x -= 1;
          break;
        case Direction.RIGHT:
          head.x += 1;
          break;
      }

      if (checkCollision(head)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];
      
      // 检查是否吃到食物
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, checkCollision, generateFood]);

  return {
    snake,
    food,
    direction,
    setDirection,
    gameOver,
    score,
    moveSnake,
  };
};