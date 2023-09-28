import React, {useState} from "react";
import Tarea from "./Tarea";

export default function ListaDeTareas(){
    const [tareas, updateTareas] = useState([
        {
          titulo:"Renderizar Objeto con tareas",
          id:0,
          notas:"Cargar el objeto tareas con un map en el fichero App",
          estado:2,
          subtareas:{}
        },{
          titulo:"Poder eliminar Tareas",
          id:1,
          notas:"Añadir funcionalidad de eliminar la tarea",
          estado:2,
          subtareas:{}
        },{
          titulo:"Añadir funcionalidad de editar la tarea",
          id:2,
          notas:"",
          estado:1,
          subtareas:{}
        },
        {
          titulo:"Añadir funcionalidad de editar la tarea",
          id:3,
          notas:"",
          estado:1,
          subtareas:{}
        },
        
      ])

    // Eliminar la tarea
    function handleClick(id){
        const newList = tareas.filter((item) => item.id !== id);    
        updateTareas(newList);  
    }

    // Actualizar el estado de la lista cuando se modifica el selector
    function handleChange(id, e){
        const newList = tareas.map((item) => {
            if (item.id === id) {
              const updatedItem = {
                ...item,
                estado: e.target.value,
              };
              return updatedItem;
            }
            return item;
          });
          updateTareas(newList);
    }


    return tareas.map(({id, titulo, notas, estado}) =>
        <div key={id}>
            <Tarea 
                lista={tareas}
                id={id} 
                titulo={titulo} 
                notas={notas} 
                estado={estado} 
            />
            <select value={estado} onChange={e => {
                    handleChange(id, e)
                    }}>
                    <option value="0">Por hacer</option>
                    <option value="1">En curso</option>
                    <option value="2">Finalizada</option>
                </select>
            <button onClick={()=>{
                handleClick(id)
            }}>Eliminar</button>
        </div>
    )
}