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
            ]
        }, {
            titulo: "Poder eliminar Tareas",
            subtarea: false,
            id: 1,
            notas: "Añadir funcionalidad de eliminar la tarea",
            estado: 2,
            subtareas: [
                {
                    subtarea: true,
                    titulo: "Arreglar bugs menores",
                    id: 0,
                    notas: "",
                    estado: 2,
                }
            ]
        }, 
        {
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
        },{
            titulo: "Editar tareas",
            subtarea: false,
            id: 4,
            notas: "Con un formulario dinamico",
            estado: 1,
            subtareas: []
        },{
            titulo: "Editar subtareas",
            subtarea: false,
            id: 5,
            notas: "Con un formulario dinamico",
            estado: 1,
            subtareas: []
        },{
            titulo: "Controlar estados",
            subtarea: false,
            id: 6,
            notas: "Cuando una tarea esta En proceso sus subtareas igual y lo mismo cuando se completa",
            estado: 1,
            subtareas: []
        },

    ])
    const [maxId, updatedMax] = useState(tareas.length)
    const [newTask, updatednewTask] = useState(true)
    const [titulo, updateTitulo] = useState()
    const [nota, updateNota] = useState()
    const [estado, updateEstado] = useState()


    // Crear la tarea
    function addTask() {
        updatednewTask(true)
    }

    function handleCreate() {
        let maxCopia = maxId
        updatedMax(++maxCopia)
        const tareaFake = {
            titulo: titulo,
            id: maxId,
            notas: nota,
            estado: estado,
            subtareas: []
        }
        const newList = tareas.concat(tareaFake);
        updateTareas(newList);
        updatednewTask(true)
        updateTitulo()
        updateNota()
    }

    // Eliminar la tarea
    function handleRemove(id) {
        const newList = tareas.filter((item) => item.id !== id);
        updateTareas(newList);
    }

    function handleRemoveSubTarea(idPadre, idHijo) {

        tareas.forEach((tarea, posicion) => {
            if (tarea.id == idPadre) {
                {
                    tarea.subtareas.forEach((hijo) => {
                        if (hijo.id === idHijo) {
                            let newList = [...tareas]
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
        let newList = [...tareas]
        newList.forEach((item) => {
            if (item.id == id) {
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
        let newList = [...tareas]
        newList.forEach((item) => {
            if (item.id == idPadre) {
                item.subtareas.forEach((itemHijo) => {
                    if (itemHijo.id == idHijo) {
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
        for (var i = 0; i < arr.length; i++) {
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
        let newList = [...tareas]
        newList.forEach((item) => {
            if (item.id == id) {
                if (item.subtareas.length == 0) {
                    item.subtareas.push(tareaFake)
                } else {
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
                    <div className="tarea">
                        <div className="inputText">
                            <label>Titulo:</label>
                            <input 
                            value={titulo}
                            onChange={(e) => updateTitulo(e.target.value)} 
                            className="input"></input>
                            <label>Notas:</label>
                            <textarea 
                            value={nota}
                            onChange={(e) => updateNota(e.target.value)} 
                            className="input"></textarea>
                            <label>Estado de la Tarea:</label>
                            <select className="custom-select"
                            value={estado}
                            onChange={(e) => updateEstado(e.target.value)} >
                                <option value="0">Por hacer</option>
                                <option value="1">En curso</option>
                                <option value="2">Finalizada</option>
                            </select>
                            <button className="createButton" onClick={handleCreate}>
                                Create Taks
                            </button>
                        </div>

                    </div>
                }
                {newTask == false &&
                    <button className="tarea addbutton buttonBox" onClick={addTask} >
                        +
                    </button>
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
                                    }}> <i className="fa fa-trash" aria-hidden="true"></i>
                                        Eliminar</button>
                                    <button className="editButton" onClick={() => {
                                        handleEditSubTarea(id, subtarea.id)
                                    }}> <i className="fa fa-pencil" aria-hidden="true"></i>
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
                            }}> <i className="fa fa-trash" aria-hidden="true"> </i>
                                Eliminar</button>
                            <button className="editButton" onClick={() => {
                                handleEdit(id)
                            }}> <i className="fa fa-pencil" aria-hidden="true"></i>
                                Editar</button>
                            <button onClick={() => {
                                handleAddSubTask(id)
                            }}> <i className="fa fa-plus" aria-hidden="true"></i>
                                Agregar Subtarea</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}