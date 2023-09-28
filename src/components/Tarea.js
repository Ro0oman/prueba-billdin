import React from "react";

export default function Tarea({ titulo, notas, estado }) {
    return (
        <div>
            <div>
                <button>Eliminar</button>
                <button>Editar</button>
                <button>Añadir Subtarea</button>
            </div>
            <div className="tarea">
                <h1>Titulo:{titulo}</h1>
                <select value={estado} onChange={e => estado = e.target.value}>
                    <option value="0">Por hacer</option>
                    <option value="1">En curso</option>
                    <option value="2">Finalizada</option>
                </select>
                <p>Notas:{notas}</p>
            </div>
        </div>
    )
}