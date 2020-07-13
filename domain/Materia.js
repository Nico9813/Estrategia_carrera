export default class Materia{
    static id_materia_actual = 0
    id
    nombre
    tipo
    id_correlativas_cursar = []
    id_correlativas_final_cursar = []
    id_correlativas_rendir = []

    constructor(tipo, nombre_materia){
        this.nombre = nombre_materia
        this.id_correlativas_cursar = []
        this.id_correlativas_final_cursar = []
        this.id_correlativas_rendir = []
        Materia.id_materia_actual++
        this.id = Materia.id_materia_actual
        this.tipo = tipo
    }

    agregar_correlativa_cursar(materia){
        this.id_correlativas_cursar.push(materia.id);
    }

    agregar_correlativa_final_cursar(materia) {
        this.id_correlativas_final_cursar.push(materia.id);
    }

    agregar_correlativa_rendir(materia) {
        this.id_correlativas_rendir.push(materia.id);
    }
}