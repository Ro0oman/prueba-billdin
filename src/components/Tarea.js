import React from "react";

export default function Tarea({ titulo, notas, estado, lista, id }) {
    return (
        <div>
            <div>
                {/* <button onClick={function(){
                    // lista.filter(tarea => tarea.id = id)
                    console.log(lista);
                }}>Eliminar</button>
                <button>Editar</button>
                <button>Añadir Subtarea</button> */}
            </div>
            <div className="tarea">
                <h1>Titulo:{titulo}</h1>
                <p>Notas:{notas}</p>
            </div>
        </div>
    )
}