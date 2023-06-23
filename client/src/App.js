import './App.css';
import { Outlet } from 'react-router-dom';
import { useState, useContext, createContext } from 'react';

export function App() {
  return (
    <div className="App">
      <div className='page'>
          <Outlet />
      </div>
    </div>
  );
}