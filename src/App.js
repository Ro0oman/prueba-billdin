import React, {useState} from 'react';
import './App.css';
import { toHaveFormValues } from '@testing-library/jest-dom/matchers';
import Tarea from './components/Tarea';

function App() {
  const [tareas, updateTareas] = useState([
    {
      "titulo":"Renderizar Objeto con tareas",
      "id":0,
      "notas":"Cargar el objeto tareas con un map en el fichero App",
      "estado":1,
    },{
      "titulo":"Hola soy un titulo",
      "id":1,
      "notas":"Hola soy las notas",
      "estado":0,
    },
    
  ])
  return (
    <div className="App">
      {
        tareas.map(obj =><Tarea key={obj.id} titulo={obj.titulo} notas={obj.notas} estado={obj.estado} />)
      }
    </div>
  );
}

export default App;
