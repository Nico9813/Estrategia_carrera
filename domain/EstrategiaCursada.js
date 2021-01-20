import { CargaHoraria } from './CargaHoraria'
import { MATERIA_FINAL } from './Plan'
import { EstadoMateria } from './EstadoMateria'
import { indiceMaterias } from './indiceMaterias'

export default class EstrategiaCursada{
    anios = []
    id
    static id_actual = 0
    materias_totales = {}
    materia_objetivo
    rendir
    materiasCursadas 
    materiasAprobadas
    CANTIDAD_MAXIMA_MATERIAS_ANUAL
    CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE
    CANTIDAD_MAXIMA_FINALES_CUATRIMESTRE

    constructor(materia_objetivo, rendir, max_anual, max_mat_cuatri, max_final_cuatri, estado_actual){
        this.id = EstrategiaCursada.id_actual++
        this.CANTIDAD_MAXIMA_FINALES_CUATRIMESTRE = max_final_cuatri
        this.CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE = max_mat_cuatri
        this.CANTIDAD_MAXIMA_MATERIAS_ANUAL = max_anual
        this.materiasCursadas = []
        this.materiasAprobadas = []
        this.materia_objetivo = materia_objetivo
        this.rendir = rendir
        this.materias_totales_plan = indiceMaterias
        this.agregarMateriasAprobadas(estado_actual)
    }

    generar(){
        this.agregarMateria(this.materia_objetivo, this.rendir)
    }

    agregarMateriasAprobadas(estadoAlumno) {
        const materiasCursadasActuales = estadoAlumno.filter(materia => materia.estado != EstadoMateria.NO_CURSADA)
        const materiasAprobadasActuales = estadoAlumno.filter(materia => materia.estado == EstadoMateria.APROBADA)

        materiasCursadasActuales.forEach( materia => {
            this.materiasCursadas[materia.id] = -1
        })

        materiasAprobadasActuales.forEach( materia => {
            this.materiasAprobadas[materia.id] = -1
        })
    }

    materiasCuatrimestre(numero_cuatri){
        return this.materiasCursadas
            .map((cuatri, id) => (cuatri == numero_cuatri && this.materias_totales_plan[id].tipo == CargaHoraria.CUATRIMESTRAL) ? this.materias_totales_plan[id] : null)
            .filter(Boolean)
    }
    
    materiasAnuales(anio){
        return this.materiasCursadas.map((cuatri, id) => (Math.floor(cuatri / 2) == anio && this.materias_totales_plan[id].tipo == CargaHoraria.ANUAL) ? this.materias_totales_plan[id] : null)
            .filter(Boolean)
    }

    finalesCuatrimestre(numero_cuatri){
        return this.materiasAprobadas
            .map((cuatri, id) => (cuatri == numero_cuatri) ? this.materias_totales_plan[id] : undefined)
            .filter(Boolean)
    }

    duracion(){
        return Math.max(...this.materiasCursadas.filter(value => value != undefined))
    }

    agregarMateria(materia, rendir){
        console.log(this.materias_totales_plan[materia].nombre)
        if(this.materiasCursadas[materia] == undefined){
            console.log("AGREGO " + this.materias_totales_plan[materia].nombre)
            //console.log('agrego materia')
            //console.log(this.materias_totales_plan[materia])

            const materias_correlativas_a_cursar = this.materias_totales_plan[materia].id_correlativas_cursar
            const materias_correlativas_a_rendir = this.materias_totales_plan[materia].id_correlativas_rendir

            const cursadas_restantes = materias_correlativas_a_cursar.filter(id => !this.materiasCursadas[id])
            const finales_restantes = materias_correlativas_a_rendir.filter(id => !this.materiasAprobadas[id])

            //console.log(cursadas_restantes)
            //console.log(finales_restantes)

            console.log(cursadas_restantes)
            console.log(finales_restantes)

            cursadas_restantes.forEach(id => this.agregarMateria(id, false))
            finales_restantes.forEach(id => this.agregarMateria(id, true))

            const cuatrimestre_minimo_por_cursadas =
                Math.max(...materias_correlativas_a_cursar
                    .map(id_materia => 
                        this.materias_totales_plan[id_materia].tipo == CargaHoraria.CUATRIMESTRAL ? this.materiasCursadas[id_materia] + 1 : this.materiasCursadas[id_materia] + 2))
            const cuatrimestre_minimo_por_finales =
                Math.max(...materias_correlativas_a_rendir.map(id_materia => this.materiasAprobadas[id_materia] ? this.materiasAprobadas[id_materia] : 0))
            let cuatrimestre_minimo = Math.max(cuatrimestre_minimo_por_cursadas, cuatrimestre_minimo_por_finales, 0)

            

            const { tipo, nombre } = this.materias_totales_plan[materia]
            const comparador = tipo == CargaHoraria.ANUAL ? this.CANTIDAD_MAXIMA_MATERIAS_ANUAL : this.CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE
            const duracion = tipo == CargaHoraria.ANUAL ? 2 : 1
            cuatrimestre_minimo += (tipo == CargaHoraria.ANUAL && cuatrimestre_minimo % 2 ? 1 : 0)

            console.log("cuatrimestre minimo post aumento impar " + cuatrimestre_minimo)

            //console.log(this.materiasCursadas.filter((cuatri, index) => cuatri == cuatrimestre_minimo && index).length)
            while (this.materiasCursadas.filter((cuatri, index) => index && cuatri == cuatrimestre_minimo && this.materias_totales_plan[index].tipo == tipo).length 
                >= comparador){
                //console.log("aumento cuatri")
                //console.log(this.materiasCursadas.filter((cuatri, index) => cuatri == cuatrimestre_minimo && index).length)
                cuatrimestre_minimo+=duracion
            }
            
            if(nombre != MATERIA_FINAL){
                this.materiasCursadas[materia] = cuatrimestre_minimo
            }
            console.log("cursadas")
            console.log(this.materiasCursadas.map((value, index) => this.materias_totales_plan[index]?.nombre + ` ${value}`))
        }
        if(rendir){
            console.log("AGREGO FINAL" + this.materias_totales_plan[materia].nombre)
            const materias_correlativas_a_cursar_para_rendir = this.materias_totales_plan[materia].id_correlativas_final_cursar
            const cursadas_restantes_rendir = materias_correlativas_a_cursar_para_rendir.filter(id => this.materiasCursadas[id])

            console.log(cursadas_restantes_rendir)

            cursadas_restantes_rendir.forEach(id => this.agregarMateria(id))
            let cuatrimestre_minimo_rendir = 
                Math.max(...materias_correlativas_a_cursar_para_rendir.map(id_materia => this.materias_totales_plan[id_materia]))
            const fin_cursada_materia = this.materias_totales_plan[materia].tipo == CargaHoraria.CUATRIMESTRAL ? this.materiasCursadas[materia] : this.materiasCursadas[materia] + 1
            console.log("cuatrimestre minimo " + cuatrimestre_minimo_rendir)
            cuatrimestre_minimo_rendir = Math.max(cuatrimestre_minimo_rendir, fin_cursada_materia, 0)
            console.log("cuatrimestre minimo post aumento cursada " + cuatrimestre_minimo_rendir)
            console.log("cuatrimestre actual finales " + this.materiasAprobadas.filter((cuatri) => cuatri == cuatrimestre_minimo_rendir).length)
            console.log("cuatrimestre actual finales maxima " + this.CANTIDAD_MAXIMA_FINALES_CUATRIMESTRE)

            while (this.materiasAprobadas.filter((cuatri) => cuatri == cuatrimestre_minimo_rendir).length >= this.CANTIDAD_MAXIMA_FINALES_CUATRIMESTRE){
                cuatrimestre_minimo_rendir++
            }

            console.log("cuatrimestre minimo post aumento maximo " + cuatrimestre_minimo_rendir)
            
            this.materiasAprobadas[materia] = cuatrimestre_minimo_rendir
            console.log("finales")
            console.log(this.materiasAprobadas.map((value, index) => this.materias_totales_plan[index]?.nombre + ` ${value}`))
        }
    }
}
