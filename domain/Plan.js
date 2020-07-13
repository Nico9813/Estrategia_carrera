import Materia from "./Materia";
import { CargaHoraria } from "./CargaHoraria";

export const MATERIA_FINAL = "Finalizar carrera"

export default class Plan{
    nombre
    materias = []

    constructor(){
        
    }

    agregar_materia(materia){
        this.materias.push(materia);
    }

    finalizarCreacion(){
        let materia_final = new Materia(CargaHoraria.CUATRIMESTRAL, MATERIA_FINAL)
        this.materias.forEach( (materia) => {
            materia_final.agregar_correlativa_cursar(materia)
            materia_final.agregar_correlativa_final_cursar(materia)
            materia_final.agregar_correlativa_rendir(materia)
        })
        this.materias.push(materia_final)
    }
}