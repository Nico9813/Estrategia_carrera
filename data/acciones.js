export const CAMBIAR_ESTADO_MATERIA = "CAMBIAR_ESTADO_MATERIA"
export const GUARDAR_PLAN = "GUARDAR_PLAN"
export const ELIMINAR_PLAN = "ELIMINAR_PLAN"

export const cambiarEstadoMateria = (id_materia, nuevo_estado) => {
    return {
        type: CAMBIAR_ESTADO_MATERIA,
        id: id_materia,
        estado: nuevo_estado
    }
}

export const guardarPlan = (plan) => {
    return {
        type: GUARDAR_PLAN,
        plan
    }
}

export const eliminarPlan = (id) => {
    return {
        type: ELIMINAR_PLAN,
        id
    }
}