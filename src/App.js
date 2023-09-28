import React, {useState} from 'react';
import './App.css';
import { toHaveFormValues } from '@testing-library/jest-dom/matchers';
import ListaDeTareas from './components/ListaDeTareas';

function App() {
  
  return (
    <div className="App">
      <div className='container'>
        <ListaDeTareas></ListaDeTareas>
      </div>
    </div>
  );
}

export default App;
