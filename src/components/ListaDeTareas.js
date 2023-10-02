import React, { useState, useEffect } from "react";
import Tarea from "./Tarea";
export default function ListaDeTareas() {
    const [tareas, updateTareas] = useState([
        {
            titulo: "Editar Tareas",
            id: 6,
            notas: "Cambiar funciones de editar subtarea para esconder formularios y cosas",
            estado: 0,
            subtareas: [{
                titulo: "Subtarea1",
                id: 8,
                notas: "",
                editando:false,
                estado: 1,
                subtareas: []
            }]
        },{
            titulo: "Editar Tareas",
            id: 7,
            notas: "Cambiar funciones de editar subtarea para esconder formularios y cosas",
            estado: 0,
            subtareas: [{
                titulo: "Subtarea2",
                id: 8,
                notas: "",
                editando:false,
                estado: 1,
                subtareas: []
            }]
        },
    ])
    const [maxId, updatedMax] = useState(tareas.length)
    const [newTask, updatednewTask] = useState(false)
    const [titulo, updateTitulo] = useState("")
    const [tituloCopia, updateTituloCopia] = useState("")
    const [nota, updateNota] = useState("")
    const [notaCopia, updateNotaCopia] = useState("")
    const [estado, updateEstado] = useState("")
    const [estadoCopia, updateEstadoCopia] = useState("")
    const [editando, updateEditando] = useState(false)
    const [editandoSubtarea, updateEditandoSubtarea] = useState(false)
    const [errorEditar, updateErrorEditar] = useState("")

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
            estado: 0,
            subtareas: []
        }
        const newList = tareas.concat(tareaFake);
        updateTareas(newList);
        updatednewTask(false)
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
    function handleEdit(id, titulo, notas, estado) {
        if (!editando) {
            updateEditando(true)
            updateTituloCopia(titulo)
            updateNotaCopia(notas)
            updateEstadoCopia(estado)
            let objCopia = []
            let newList = [...tareas]
            newList.forEach((item) => {
                if (item.id == id) {
                    item.editando = true
                    objCopia[0] = item
                }
            })
            updateTareas(newList);
        } else {
            updateErrorEditar('No se puede editar 2 tareas simultaneamente')
        }
        handleChange(id)
    }

    // Completar edicion de la tarea
    function handleEditComplete(id) {
        console.log('a');
        let newList = [...tareas]
        newList.forEach((item) => {
            if (item.id == id) {
                item.editando = false
                item.titulo = tituloCopia
                item.notas = notaCopia
                item.estado = estadoCopia
            }
        })
        updateErrorEditar('')
        updateEditando(false)
        updateTareas(newList);
        handleChange(id)
    }

    function handleEditSubTarea(idPadre, idHijo ,titulo, notas, estado) {
        if (!editando) {
            let obj = {
                editando: true,
            }
            let newList = [...tareas]
            newList.forEach((item) => {
                if (item.id == idPadre) {
                    item.subtareas.forEach((itemHijo) => {
                        if (itemHijo.id == idHijo) {
                            itemHijo.editando = obj.editando
                        }
                    })
                }
            })
            updateTituloCopia(titulo)
            updateNotaCopia(notas)
            updateEstadoCopia(estado)
            updateEditandoSubtarea(true)
            updateEditando(true)
        }else {
            updateErrorEditar('No se puede editar 2 tareas simultaneamente')
        }
    }


    function handleEditSubTareaComplete(idPadre, idHijo) {
        let obj = {
            titulo: tituloCopia,
            notas: notaCopia,
            estado: estadoCopia,
        }
        let newList = [...tareas]
        newList.forEach((item) => {
            if (item.id == idPadre) {
                item.subtareas.forEach((itemHijo) => {
                    if (itemHijo.id == idHijo) {
                        itemHijo.titulo = obj.titulo
                        itemHijo.notas = obj.notas
                        itemHijo.estado = obj.estado
                        
                    }
                })
            }
        })
        handleChange(idPadre)
        updateTareas(newList);
        updateEditando(false)
        updateEditandoSubtarea(false)
        handleCancel(idPadre, idHijo)
        handleChange(idPadre)
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
            titulo: "SubTarea",
            id: 0,
            notas: "Notas subtarea",
            estado: 0,
            editando: false,
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

    function checkIfFinished(subtareas){
        let allSubTasksCompleted = false;
        subtareas.forEach(subtarea => {
            if (subtarea.estado==2) {
                allSubTasksCompleted = true;
            }else{
                allSubTasksCompleted = false;
                return
            }
        });
        return allSubTasksCompleted;
    }

    // Actualizar el estado de la lista cuando se modifica el selector
    function handleChange(id) {
        let canChange = true;
        const newList = tareas.map((item) => {
            if (item.id === id) {
                if(item.subtareas.length>0){
                    item.subtareas.forEach(element => {
                        if(element.estado!=2){
                            canChange = false
                            return
                        }else{
                            canChange = true
                        }
                    });
                }
                if(checkIfFinished(item.subtareas)){ //Si la funcion devuelve true, todas la subtareas han sido completadas
                    const updatedItem = {
                        ...item,
                        estado: 2,
                    };
                    return updatedItem;
                }else{
                    const updatedItem = {
                        ...item,
                        estado: 1,
                    };
                    return updatedItem;
                }
            }
            return item;
        });
        updateTareas(newList);
    }

    function handleCancel(id, idHijo) {
        if(idHijo){
            let obj = {
                editando: false,
            }
            let newList = [...tareas]
            newList.forEach((item) => {
                if (item.id == id) {
                    item.subtareas.forEach((itemHijo) => {
                        if (itemHijo.id == idHijo) {
                            itemHijo.editando = obj.editando
                        }
                    })
                }
            })
        }
        let newList = [...tareas]
        newList.forEach((item) => {
            if (item.id == id) {
                item.editando = false
            }
        })
        updateTareas(newList);
        updateErrorEditar('')
        updateEditando(false)
        updateEditandoSubtarea(false)
    }

    return (
        <div >
            {editando && errorEditar && <h1 >{errorEditar}</h1>}
            <div className="taskBox">
                {newTask == true &&
                    <div className="tarea">
                        <div className="inputText">
                            <label>Titulo:</label>
                            <input
                                value={titulo}
                                onChange={(e) => updateTitulo(e.target.value)}
                                className="input"
                                placeholder="Introduce el titulo de tu tarea"></input>
                            <label>Notas:</label>
                            <textarea
                                value={nota}
                                onChange={(e) => updateNota(e.target.value)}
                                className="input"
                                placeholder="Introduce las notas de tu tarea"></textarea>
                            <button className="createButton" onClick={handleCreate}>
                                Crear Tarea
                            </button>
                        </div>
                    </div>
                }
                {newTask == false &&
                    <button className="tarea addbutton buttonBox" onClick={addTask} >
                        +
                    </button>
                }
                {tareas.map(({ id, titulo, notas, estado, subtareas, editando }) =>
                    <div key={id}>
                        <div className="tarea">
                            {!editando && <Tarea
                                titulo={titulo}
                                notas={notas}
                            />}
                            {editando &&
                                <div>
                                    <button className="cancelButton" onClick={() => {
                                        handleCancel(id)
                                    }}>X</button>
                                    <div className="inputText">
                                        <label>Titulo:</label>
                                        <input
                                            value={tituloCopia}
                                            onChange={(e) => updateTituloCopia(e.target.value)}
                                            className="input"
                                            placeholder="Introduce el titulo de tu tarea"></input>
                                        <label>Notas:</label>
                                        <textarea
                                            value={notaCopia}
                                            onChange={(e) => updateNotaCopia(e.target.value)}
                                            placeholder="Introduce las notas de tu tarea"
                                            className="input"></textarea>
                                        <label>Estado de la Tarea:</label>
                                        <select className="custom-select"
                                            value={estadoCopia}
                                            onChange={(e) => updateEstadoCopia(e.target.value)}
                                        >
                                            <option value="0">Por hacer</option>
                                            <option value="1">En curso</option>
                                            <option value="2">Finalizada</option>
                                        </select>
                                        <button className="createButton" onClick={() => {
                                            handleEditComplete(id)
                                        }}>
                                            Editar Tarea
                                        </button>
                                    </div>

                                </div>
                            }
                            {subtareas.length > 0 && subtareas.map((subtarea) =>
                                <div key={subtarea.id} >
                                    {!subtarea.editando && 
                                    <div className="subTarea" >
                                        <Tarea 
                                            titulo={subtarea.titulo}
                                            notas={subtarea.notas}
                                        />
                                    </div>}
                                    
                                    {subtarea.editando &&
                                        <div>
                                            <button className="cancelButton" onClick={() => {
                                                handleCancel(id, subtarea.id)
                                            }}>X</button>
                                            <div className="inputText">
                                                <label>Titulo:</label>
                                                <input
                                                    value={tituloCopia}
                                                    placeholder="Introduce el titulo de tu tarea"
                                                    onChange={(e) => updateTituloCopia(e.target.value)}
                                                    className="input"></input>
                                                <label>Notas:</label>
                                                <textarea
                                                    value={notaCopia}
                                                    onChange={(e) => updateNotaCopia(e.target.value)}
                                                    placeholder="Introduce las notas de tu tarea"
                                                    className="input"></textarea>
                                                <label>Estado de la Tarea:</label>
                                                <select className="custom-select"
                                                    value={estadoCopia}
                                                    onChange={(e) => updateEstadoCopia(e.target.value)}
                                                >
                                                    <option value="0">Por hacer</option>
                                                    <option value="1">En curso</option>
                                                    <option value="2">Finalizada</option>
                                                </select>
                                                <button className="createButton" onClick={() => {
                                                    handleEditSubTareaComplete(id, subtarea.id)
                                                }}>
                                                    Editar Tarea
                                                </button>
                                            </div>

                                        </div>
                                    }


                                    {!subtarea.editando && <div className="botones">
                                        <select className="custom-select" value={subtarea.estado} onChange={e => {
                                            handleChange(subtarea.id, e)
                                        }}>
                                            <option disabled value="0">Por hacer</option>
                                            <option disabled value="1">En curso</option>
                                            <option disabled value="2">Finalizada</option>
                                        </select>
                                        <button className="removeButton" onClick={() => {
                                            handleRemoveSubTarea(id, subtarea.id)
                                        }}> <i className="fa fa-trash" aria-hidden="true"></i>
                                            Eliminar</button>
                                        <button className="editButton" onClick={() => {
                                            handleEditSubTarea(id, subtarea.id, subtarea.titulo, subtarea.notas, subtarea.estado)
                                        }}> <i className="fa fa-pencil" aria-hidden="true"></i>
                                            Editar</button>
                                    </div>}

                                </div>
                            )}
                        </div>
                        <div className="botones">

                            <select className="custom-select" value={estado} onChange={e => {
                                handleChange(id, e)
                            }}>
                                <option disabled value="0">Por hacer</option>
                                <option disabled value="1">En curso</option>
                                <option disabled value="2">Finalizada</option>
                            </select>
                            <button className="removeButton" onClick={() => {
                                handleRemove(id)
                            }}> <i className="fa fa-trash" aria-hidden="true"> </i>
                                Eliminar</button>
                            <button className="editButton" onClick={() => {
                                handleEdit(id, titulo, notas, estado)
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