import {CargaHoraria} from './CargaHoraria'
import { MATERIA_FINAL } from './Plan'
import { EstadoMateria } from './EstadoMateria'

export default class EstrategiaCursada{
    anios = []
    materias_totales = {}
    materiasCursadas 
    materiasAprobadas
    CANTIDAD_MAXIMA_MATERIAS_ANUAL
    CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE
    CANTIDAD_MAXIMA_FINALES_CUATRIMESTRE

    /*
        plan_cursada = [{
        id_materias_anuales: [],
        cuatrimestres: [
            {
                id_finales:[]
                id_materias: []
            },
            {
                id_materias: []
            }
        ]
        }]
    */

    constructor(max_anual, max_mat_cuatri, max_final_cuatri){
        this.CANTIDAD_MAXIMA_FINALES_CUATRIMESTRE = max_final_cuatri
        this.CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE = max_mat_cuatri
        this.CANTIDAD_MAXIMA_MATERIAS_ANUAL = max_anual
    }

    agregarMateriasAprobadas(estadoAlumno){
        this.materiasCursadas = estadoAlumno.filter( materia => materia.estado != EstadoMateria.NO_CURSADA)
        this.materiasAprobadas = estadoAlumno.filter( materia => materia.estado == EstadoMateria.APROBADA)

        const keyBy = (arr = []) => arr.reduce((acc, el) => {
            acc[el.id] = el.estado
            return acc
        }, {})
        
        this.materiasCursadas = keyBy(this.materiasCursadas)

        this.materiasAprobadas = keyBy(this.materiasAprobadas)
    }

    getCursadasTotales(){
        return this.materias_totales.length
    }

    agregarAnioCursada(){
        this.anios.push({
            id_materia_anuales: [],
            cuatrimestres: []
        }) 
        this.agregarCuatrimestreCursada(this.anios.length - 1)
        this.agregarCuatrimestreCursada(this.anios.length - 1)
    }

    agregarCuatrimestreCursada(numero_anio){
        this.anios[numero_anio].cuatrimestres.push({
            id_finales: [],
            id_materias: []
        }) 
    }

    cuatrimestreMateria(id_materia) {
        let cuatrimestres = this.anios.flatMap((anio) =>
            anio.cuatrimestres.map((cuatri, index) => cuatri.id_materias.concat(((index % 2) == 1) ? anio.id_materia_anuales : [])))

        return cuatrimestres.findIndex(id_materias => id_materias.some(id => id == id_materia))
    }

    agregarMateriaAnual(materia){

        let reducer = (acc, el) => Math.max(this.cuatrimestreMateria(el), acc)

        let cuatri_minimo = materia.id_correlativas_cursar.filter(id => !this.materiasCursadas[id]).reduce(reducer, -1);

        let anio_disponible = Math.trunc((cuatri_minimo + 2) / 2)

        if (!this.anios[anio_disponible]) {
            anio_disponible = this.anios.length
            this.agregarAnioCursada();
        }

        while (this.anios[anio_disponible].id_materia_anuales.length >= this.CANTIDAD_MAXIMA_MATERIAS_ANUAL){ 
            anio_disponible++
            if (!this.anios[anio_disponible]) {
                anio_disponible = this.anios.length
                this.agregarAnioCursada();
            }
        }

        this.anios[anio_disponible].id_materia_anuales.push(materia.id)
    }

    agregarMateriaCuatrimestral(materia){
        let reducer = (acc, el) => Math.max(this.cuatrimestreMateria(el), acc)

        let cuatri_minimo = materia.id_correlativas_cursar.filter(id => !this.materiasCursadas[id]).reduce(reducer, -1);

        let anio_disponible = Math.trunc((cuatri_minimo + 1) / 2)

        let cuatri_disponible = Math.trunc((cuatri_minimo + 1) % 2)

        if(!this.anios[anio_disponible]){
            anio_disponible = this.anios.length
            this.agregarAnioCursada();
        }

        while (this.anios[anio_disponible].cuatrimestres[cuatri_disponible].id_materias.length >= this.CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE) {
            if (cuatri_disponible > 0) {
                anio_disponible = anio_disponible + 1
                cuatri_disponible = 0;
                if (!this.anios[anio_disponible]) {
                    anio_disponible = this.anios.length
                    this.agregarAnioCursada();
                }
            } else {
                cuatri_disponible = (cuatri_disponible + 1) % 2
            }
        }

        this.anios[anio_disponible].cuatrimestres[cuatri_disponible].id_materias.push(materia.id)
    }

    existeFinal(materia_id) {
        return this.materiasAprobadas[materia_id] 
            || this.anios.some(anio => anio.cuatrimestres.some(cuatri => cuatri.id_finales.includes(materia_id)))
    }

    agregarMateria(materia){
        if(this.materias_totales[materia.id]
            || this.materiasCursadas[materia.id]
            || materia.nombre == MATERIA_FINAL){
            return
        }
        switch (materia.tipo) {
            case CargaHoraria.CUATRIMESTRAL:
                this.agregarMateriaCuatrimestral(materia)
                break
            case CargaHoraria.ANUAL:
                this.agregarMateriaAnual(materia)
                break
            default:
                break
        }

        this.materias_totales[materia.id] = materia.id
    }

    agregarFinal(materia){
        if(this.existeFinal(materia.id)){
            return
        }

        let reducer = (acc, el) => Math.max(this.cuatrimestreMateria(el), acc)

        let cuatri_minimo = materia.id_correlativas_rendir.filter(id => !this.materiasAprobadas[id]).reduce(reducer, 0);

        let cuatri_cursada = this.cuatrimestreMateria(materia.id)

        cuatri_minimo = Math.max(cuatri_cursada, cuatri_minimo)

        let anio_disponible = Math.trunc(cuatri_minimo / 2)

        let cuatri_disponible = Math.trunc(cuatri_minimo % 2)

        if (!this.anios[anio_disponible]) {
            anio_disponible = this.anios.length
            this.agregarAnioCursada();
        }

        while (this.anios[anio_disponible].cuatrimestres[cuatri_disponible].id_finales.length >= this.CANTIDAD_MAXIMA_FINALES_CUATRIMESTRE) {
            if(cuatri_disponible > 0){
                anio_disponible = anio_disponible + 1
                cuatri_disponible = 0;
                if (!this.anios[anio_disponible]) {
                    anio_disponible = this.anios.length
                    this.agregarAnioCursada();
                }
            }else{
                cuatri_disponible = (cuatri_disponible + 1) % 2 
            }
        }

        this.anios[anio_disponible].cuatrimestres[cuatri_disponible].id_finales.push(materia.id)
    }
}
