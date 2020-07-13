import * as Acciones from './acciones';
import { combineReducers } from "redux";

const materiasReducer = (materias = [], accion) => {
    switch (accion.type) {
        case Acciones.CAMBIAR_ESTADO_MATERIA:
            return materias.map( materia => {
                return {
                    ...materia,
                    estado: (materia.id == accion.id) ? accion.estado : materia.estado
                }
            })
        default:
            return [...materias];
    }
}

let rootReducer = combineReducers({
    materias: materiasReducer,
})

export { rootReducer };