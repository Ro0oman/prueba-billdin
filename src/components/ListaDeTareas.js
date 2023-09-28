import React, { useState, Component } from "react";
import Tarea from "./Tarea";
export default function ListaDeTareas() {
    const [tareas, updateTareas] = useState([
        {
            titulo: "Renderizar Objeto con tareas",
            id: 0,
            notas: "Cargar el objeto tareas con un map en el fichero App",
            estado: 2,
            subtareas: [
                {
                    titulo: "subtarea1",
                    id: 4,
                    notas: "tareaFake",
                    estado: 0,
                    subtareas: {}
                },
                {
                    titulo: "subtarea2",
                    id: 5,
                    notas: "tareaFake",
                    estado: 0,
                    subtareas: {}
                },
                {
                    titulo: "subtarea3",
                    id: 6,
                    notas: "tareaFake",
                    estado: 0,
                    subtareas: {}
                }
            ]
        }, {
            titulo: "Poder eliminar Tareas",
            id: 1,
            notas: "Añadir funcionalidad de eliminar la tarea",
            estado: 2,
            subtareas: {}
        }, {
            titulo: "Añadir funcionalidad de editar la tarea",
            id: 2,
            notas: "",
            estado: 1,
            subtareas: {}
        },
        {
            titulo: "Añadir funcionalidad de editar la tarea",
            id: 3,
            notas: "",
            estado: 1,
            subtareas: {}
        },

    ])

    // Crear la tarea
    function handleCreate(item) {
        const tareaFake = {
            titulo: "tareaFake",
            id: 4,
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

    // Editar la tarea
    function handleEdit(id) {

    }

    // Añadir subTarea tarea
    function handleAddSubTask(id) {

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
            <div>
                <button className="createButton" onClick={handleCreate}>
                    Create Taks
                </button>
            </div>
            <div className="taskBox">
                {tareas.map(({ id, titulo, notas, estado, subtareas }) =>
                    <div key={id} className="tarea">
                        <Tarea
                            titulo={titulo}
                            notas={notas}
                        />
                        {subtareas.length > 0 && subtareas.map(({ id, titulo, notas, estado, subtareas }) =>
                            <div key={id} className="subTarea" >

                                <Tarea
                                    titulo={titulo}
                                    notas={notas}
                                />

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
                                    }}>Eliminar</button>
                                    <button onClick={() => {
                                        handleEdit(id)
                                    }}>Editar</button>
                                    <button onClick={() => {
                                        handleAddSubTask(id)
                                    }}>Agregar Subtarea</button>
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
                            <button onClick={() => {
                                handleRemove(id)
                            }}>Eliminar</button>
                            <button onClick={() => {
                                handleEdit(id)
                            }}>Editar</button>
                            <button onClick={() => {
                                handleAddSubTask(id)
                            }}>Agregar Subtarea</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}