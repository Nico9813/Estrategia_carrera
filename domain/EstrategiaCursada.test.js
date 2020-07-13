import Materia from './Materia';
import EstrategiaCursada from './EstrategiaCursada';
import { CargaHoraria } from './CargaHoraria';

describe(('Estrategia cursada'), () => {

    test('Agregar materia anual anio actual', () => {
        let estrategia = new EstrategiaCursada(4,4,2)
        let materia = new Materia("Prueba")
        materia.tipo = CargaHoraria.ANUAL

        estrategia.agregarMateria(materia)

        expect(estrategia.anios[0].id_materia_anuales).toContain(materia.id);
    });


    test('Agregar materia cuatrimestral anio actual', () => {
        let estrategia = new EstrategiaCursada(4,4,2)
        let materia = new Materia("Prueba")
        materia.tipo = CargaHoraria.CUATRIMESTRAL

        estrategia.agregarMateria(materia)

        expect(estrategia.anios[0].cuatrimestres[0].id_materias).toContain(materia.id);
    });


    test('Agregar materia anual anio agregado', () => {
        let estrategia = new EstrategiaCursada(4,4,2)
        estrategia.CANTIDAD_MAXIMA_MATERIAS_ANUAL = 1

        let materia_1 = new Materia("Prueba")
        materia_1.tipo = CargaHoraria.ANUAL

        let materia_2 = new Materia("Prueba")
        materia_2.tipo = CargaHoraria.ANUAL

        estrategia.agregarMateria(materia_1)
        estrategia.agregarMateria(materia_2)

        expect(estrategia.anios[0].id_materia_anuales).toContain(materia_1.id);
        expect(estrategia.anios[0].id_materia_anuales.length).toBe(1)
        expect(estrategia.anios[1].id_materia_anuales).toContain(materia_2.id);
        expect(estrategia.anios[1].id_materia_anuales.length).toBe(1)
        expect(estrategia.anios.length).toBe(2)
    });

    test('Agregar materia cuatrimestral - nuevo cuatrimestre - mismo anio', () => {
        let estrategia = new EstrategiaCursada(4,4,2)
        estrategia.CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE = 1

        let materia_1 = new Materia("Prueba")
        materia_1.tipo = CargaHoraria.CUATRIMESTRAL

        let materia_2 = new Materia("Prueba")
        materia_2.tipo = CargaHoraria.CUATRIMESTRAL

        estrategia.agregarMateria(materia_1)
        estrategia.agregarMateria(materia_2)

        expect(estrategia.anios[0].cuatrimestres[0].id_materias).toContain(materia_1.id);
        expect(estrategia.anios[0].cuatrimestres[0].id_materias.length).toBe(1)
        expect(estrategia.anios[0].cuatrimestres[1].id_materias).toContain(materia_2.id);
        expect(estrategia.anios[0].cuatrimestres[1].id_materias.length).toBe(1)
        expect(estrategia.anios.length).toBe(1)
    });

    test('Agregar materia anual - nuevo anio', () => {
        let estrategia = new EstrategiaCursada(4,4,2)
        estrategia.CANTIDAD_MAXIMA_MATERIAS_ANUAL = 1

        let materia_1 = new Materia("Prueba")
        materia_1.tipo = CargaHoraria.ANUAL

        let materia_2 = new Materia("Prueba")
        materia_2.tipo = CargaHoraria.ANUAL

        estrategia.agregarMateria(materia_1)
        estrategia.agregarMateria(materia_2)

        expect(estrategia.anios[0].id_materia_anuales).toContain(materia_1.id);
        expect(estrategia.anios[1].id_materia_anuales).toContain(materia_2.id);
        expect(estrategia.anios.length).toBe(2)
    });

    test('Agregar materia cuatrimestral - nuevo cuatrimestre - nuevo anio', () => {
        let estrategia = new EstrategiaCursada(4,4,2)
        estrategia.CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE = 1

        let materia_1 = new Materia("Prueba")
        materia_1.tipo = CargaHoraria.CUATRIMESTRAL

        let materia_2 = new Materia("Prueba")
        materia_2.tipo = CargaHoraria.CUATRIMESTRAL

        let materia_3 = new Materia("Prueba")
        materia_3.tipo = CargaHoraria.CUATRIMESTRAL

        let materia_4 = new Materia("Prueba")
        materia_4.tipo = CargaHoraria.CUATRIMESTRAL

        estrategia.agregarMateria(materia_1)
        estrategia.agregarMateria(materia_2)
        estrategia.agregarMateria(materia_3)
        estrategia.agregarMateria(materia_4)

        expect(estrategia.anios[0].cuatrimestres[0].id_materias).toContain(materia_1.id);
        expect(estrategia.anios[0].cuatrimestres[0].id_materias.length).toBe(1)
        expect(estrategia.anios[0].cuatrimestres[1].id_materias).toContain(materia_2.id);
        expect(estrategia.anios[0].cuatrimestres[1].id_materias.length).toBe(1)
        expect(estrategia.anios[1].cuatrimestres[0].id_materias).toContain(materia_3.id);
        expect(estrategia.anios[1].cuatrimestres[0].id_materias.length).toBe(1)
        expect(estrategia.anios[1].cuatrimestres[1].id_materias).toContain(materia_4.id);
        expect(estrategia.anios[1].cuatrimestres[1].id_materias.length).toBe(1)
        expect(estrategia.anios.length).toBe(2)
    });

    test('Agregar materia repetida', () => {
        let estrategia = new EstrategiaCursada(4,4,2)
        estrategia.CANTIDAD_MAXIMA_MATERIAS_CUATRIMESTRE = 1

        let materia_1 = new Materia("Prueba")
        materia_1.tipo = CargaHoraria.CUATRIMESTRAL

        estrategia.agregarMateria(materia_1)
    
        //expect(estrategia.agregarMateria(materia_1)).toThrow()
    });


})

