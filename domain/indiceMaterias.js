import { k08_sistemas } from '../planes_actuales/sistemas_k08'

const keyBy = (arr = []) => arr.reduce((acc, el) => {
    acc[el.id] = el
    return acc
}, {})

export const indiceMaterias = keyBy(k08_sistemas.materias)