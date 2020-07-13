import EstrategiaCursada from './EstrategiaCursada';
import { k08_sistemas } from '../planes_actuales/sistemas_k08'
import Plan from './Plan';
import Materia from './Materia';
import GeneradorEstrategia from './GeneradorEstrategia';

describe(('Estrategia cursada'), () => {

    test('Materia sin correlativas', () => {
        let plan_prueba = new Plan()
        let materia = new Materia("Prueba_generador")
        plan_prueba.agregar_materia(materia)
        let generador = new GeneradorEstrategia(plan_prueba, 4,4,2)
        let estrategia = generador.generarPlanCursada(materia.id)
        expect(estrategia.existeMateria(materia.id)).toBeTruthy()
    });
})