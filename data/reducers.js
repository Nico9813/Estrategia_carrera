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

const planesGuardadosReducer = (planes_guardados=[], accion) => {
    switch (accion.type) {
        case Acciones.GUARDAR_PLAN:
            return [...planes_guardados, accion.plan]
        case Acciones.ELIMINAR_PLAN:
            return [...planes_guardados.filter(plan => plan.id != accion.id)]
        default:
            return [...planes_guardados];
    }
}

let rootReducer = combineReducers({
    plan : (plan = '', _) => plan,
    materias: materiasReducer,
    planes_guardados: planesGuardadosReducer
})

export { rootReducer };