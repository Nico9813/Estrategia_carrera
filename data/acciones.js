export const CAMBIAR_ESTADO_MATERIA = "CAMBIAR_ESTADO_MATERIA"

export const cambiarEstadoMateria = (id_materia, nuevo_estado) => {
    return {
        type: CAMBIAR_ESTADO_MATERIA,
        id: id_materia,
        estado: nuevo_estado
    }
}