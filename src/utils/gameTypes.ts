export interface Position {
    x: number;
    y: number;
  }
  
  export enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
  }
  
  export const GRID_SIZE = 20; // 每个格子的大小
  export const GRID_COUNT = 20; // 网格数量