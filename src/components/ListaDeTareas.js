import React, { useState, useEffect } from "react";
import Tarea from "./Tarea";
export default function ListaDeTareas() {
    const [tareas, updateTareas] = useState([
        {
            subtarea: false,
            titulo: "Renderizar Objeto con tareas",
            id: 0,
            notas: "Cargar el objeto tareas con un map en el fichero App",
            estado: 2,
            subtareas: [
                // {
                //     subtarea: true,
                //     titulo: "subtarea1",
                //     id: 0,
                //     notas: "tareaFake",
                //     estado: 0,
                // },
                // {
                //     subtarea: true,
                //     titulo: "subtarea2",
                //     id: 1,
                //     notas: "tareaFake",
                //     estado: 0,
                // },
                // {
                //     subtarea: true,
                //     titulo: "subtarea3",
                //     id: 2,
                //     notas: "tareaFake",
                //     estado: 0,
                // }
            ]
        }, {
            titulo: "Poder eliminar Tareas",
            subtarea: false,
            id: 1,
            notas: "Añadir funcionalidad de eliminar la tarea",
            estado: 2,
            subtareas: []
        }, {
            titulo: "Añadir funcionalidad de editar la tarea",
            subtarea: false,
            id: 2,
            notas: "",
            estado: 1,
            subtareas: []
        },
        {
            titulo: "Añadir funcionalidad de editar la tarea",
            subtarea: false,
            id: 3,
            notas: "",
            estado: 1,
            subtareas: []
        },

    ])
    const [maxId, updatedMax] = useState(tareas.length)
    const [newTask, updatednewTask] = useState(false)


    // Crear la tarea
    function addTask() {
        let maxCopia = maxId
        updatedMax(++maxCopia)
        const tareaFake = {
            titulo: "tareaFake",
            id: maxId,
            notas: "tareaFake",
            estado: 0,
            subtareas: {}
        }
        const newList = tareas.concat(tareaFake);
        updateTareas(newList);
    }

    // Eliminar la tarea
    function handleRemove(id) {
        const newList = tareas.filter((item) => item.id !== id);
        updateTareas(newList);
    }

    function handleRemoveSubTarea(idPadre, idHijo) {
        
        tareas.forEach((tarea, posicion) => {
            if(tarea.id == idPadre){
                {
                    tarea.subtareas.forEach((hijo) => {
                        if (hijo.id === idHijo) {
                            let newList = [... tareas]
                            let result = tareas[posicion].subtareas.filter((item) => item.id !== idHijo);
                            newList[posicion].subtareas = result;
                            updateTareas(newList);
                        }
                    });
                }
            }
        });
    }

    // Editar la tarea
    function handleEdit(id) {
        let obj = {
            titulo: "Objeto editado",
            notas: "Notas de prueba hola hola hola",
            estado: 1,
        }
        let newList = [... tareas]
        newList.forEach((item)=>{
            if(item.id == id){
                item.titulo = obj.titulo
                item.notas = obj.notas
            }
        })  
        updateTareas(newList);
    }

    function handleEditSubTarea(idPadre, idHijo) {
        let obj = {
            titulo: "Objeto editado",
            notas: "Notas de prueba hola hola hola",
            estado: 1,
        }
        let newList = [... tareas]
        newList.forEach((item)=>{
            if(item.id == idPadre){
                item.subtareas.forEach((itemHijo)=>{
                    if(itemHijo.id == idHijo){
                        itemHijo.titulo = obj.titulo
                        itemHijo.notas = obj.notas
                    }
                })  
            }
        })  
        updateTareas(newList);
    }

    function getMax(arr, prop) {
        var max;
        for (var i=0 ; i<arr.length ; i++) {
            if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        }
        return max;
    }

    // Añadir subTarea tarea
    function handleAddSubTask(id) {
        var maxId;      
        const tareaFake = {
            titulo: "tareaFake",
            id: 0,
            notas: "tareaFake",
            estado: 0,
            subtareas: {}
        }
        let newList = [... tareas]
        newList.forEach((item)=>{
            if(item.id == id){
                if(item.subtareas.length == 0){
                    item.subtareas.push(tareaFake) 
                }else{    
                    maxId = getMax(item.subtareas, "id");   
                    tareaFake.id = maxId.id
                    tareaFake.id++
                    item.subtareas.push(tareaFake)
                }   
            }
        })  
        updateTareas(newList);
    }

    // Actualizar el estado de la lista cuando se modifica el selector
    function handleChange(id, e) {
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


    return (
        <div >
            <div className="taskBox">
                {newTask == true &&
                    <div className="tarea" >
                    <Tarea
                        titulo="Hola"
                        notas="Probando"
                    />
                </div>
                }
                {newTask == false &&
                    <div className="tarea addbutton buttonBox" onClick={addTask} >
                        +
                    </div>
                }
                {tareas.map(({ id, titulo, notas, estado, subtareas }) =>
                    <div key={id} className="tarea">
                        <Tarea
                            titulo={titulo}
                            notas={notas}
                        />
                        {subtareas.length > 0 && subtareas.map((subtarea) =>
                            <div key={subtarea.id} className="subTarea" >

                                <Tarea
                                    titulo={subtarea.titulo}
                                    notas={subtarea.notas}
                                />

                                <div className="botones">
                                    <select className="custom-select" value={subtarea.estado} onChange={e => {
                                        handleChange(subtarea.id, e)
                                    }}>
                                        <option value="0">Por hacer</option>
                                        <option value="1">En curso</option>
                                        <option value="2">Finalizada</option>
                                    </select>
                                    <button className="removeButton" onClick={() => {
                                        handleRemoveSubTarea(id, subtarea.id)
                                    }}> <i class="fa fa-trash" aria-hidden="true"></i> 
                                    Eliminar</button>
                                    <button className="editButton" onClick={() => {
                                        handleEditSubTarea(id,subtarea.id)
                                    }}> <i class="fa fa-pencil" aria-hidden="true"></i>
                                    Editar</button>
                                </div>

                            </div>
                        )}

                        <div className="botones">
                            <select className="custom-select" value={estado} onChange={e => {
                                handleChange(id, e)
                            }}>
                                <option value="0">Por hacer</option>
                                <option value="1">En curso</option>
                                <option value="2">Finalizada</option>
                            </select>
                            <button className="removeButton" onClick={() => {
                                handleRemove(id)
                            }}> <i class="fa fa-trash" aria-hidden="true"> </i> 
                            Eliminar</button>
                            <button className="editButton" onClick={() => {
                                handleEdit(id)
                            }}> <i class="fa fa-pencil" aria-hidden="true"></i>
                            Editar</button>
                            <button onClick={() => {
                                handleAddSubTask(id)
                            }}> <i class="fa fa-plus" aria-hidden="true"></i>
                            Agregar Subtarea</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}