import EstrategiaCursada from "./EstrategiaCursada"

export default class GeneradorEstrategia {

    CANTIDAD_MAXIMA_MATERIAS_ANUAL = 4
    CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE = 4
    CANTIDAD_MAXIMA_FINALES_CUATRIMESTRE = 2
    plan
    indiceMaterias
    estadoAlumno

    constructor(plan, estadoAlumno, max_anual, max_mat_cuatri, max_final_cuatri) {
        this.plan = plan
        this.CANTIDAD_MAXIMA_FINALES_CUATRIMESTRE = max_final_cuatri
        this.CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE = max_mat_cuatri
        this.CANTIDAD_MAXIMA_MATERIAS_ANUAL = max_anual
        this.indiceMaterias = this.generarIndiceAcceso(plan.materias)
        this.estadoAlumno = estadoAlumno
    }

    generarIndiceAcceso(materias){
        const keyByAcceso = (arr = []) => arr.reduce((acc, el) => {
            acc[el.id] = el
            return acc
        }, {})
        return keyByAcceso(materias)
    }

    generarPlan(id_materia, rendirFinal) {

        let materia_inicial = this.indiceMaterias[id_materia]
        
        if(!materia_inicial) return null

        var estrategia_actual = new EstrategiaCursada(
            this.CANTIDAD_MAXIMA_MATERIAS_ANUAL, 
            this.CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE, 
            this.CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE
        )

        estrategia_actual.agregarMateriasAprobadas(this.estadoAlumno);

        let rendirCorrelativas = (materia) => {
            materia.id_correlativas_rendir.forEach((id) => cursarCorrelativas(this.indiceMaterias[id]))
            estrategia_actual.agregarMateria(materia)
            estrategia_actual.agregarFinal(materia)
        }

        let cursarCorrelativas = (materia) => {
            if(materia){
                materia.id_correlativas_cursar.forEach((id) => cursarCorrelativas(this.indiceMaterias[id]))
                materia.id_correlativas_final_cursar.forEach((id) => rendirCorrelativas(this.indiceMaterias[id]))
                estrategia_actual.agregarMateria(materia)
            }
        }

        cursarCorrelativas(materia_inicial)

        if(rendirFinal) { rendirCorrelativas(materia_inicial) }
        
        return estrategia_actual
    }
}

