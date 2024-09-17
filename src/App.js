import logo from './logo.svg';
import './App.css';
import Weather from './Weather';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Details from './components/Details';
import History from './components/History';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/weather/:details" element={<Details/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
