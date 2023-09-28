import React, {useState} from 'react';
import './App.css';
import { toHaveFormValues } from '@testing-library/jest-dom/matchers';
import ListaDeTareas from './components/ListaDeTareas';

function App() {
  
  return (
    <div className="App">
      <ListaDeTareas></ListaDeTareas>
    </div>
  );
}

export default App;
