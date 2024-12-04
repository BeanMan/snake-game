import React from 'react';
import './App.css';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>贪吃蛇游戏</h1>
        <Game />
      </header>
    </div>
  );
}

export default App;