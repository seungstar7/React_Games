import React from 'react';
import GameMain from '@/pages/game/GameMain'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SnakeGame from '@/compnents/game/snake/SnakeGame'
import Matgo from '@/compnents/game/matGo/Matgo'

const App = () => {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<GameMain/>}></Route>
                  <Route path="/game" element={<GameMain/>}></Route>
                  <Route path="/game/snake" element={<SnakeGame/>} ></Route>
                  <Route path="/game/matgo" element={<Matgo/>} ></Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
};

export default App;