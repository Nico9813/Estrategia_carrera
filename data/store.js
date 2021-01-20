import { createStore } from 'redux';
import { rootReducer } from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { k08_sistemas } from '../planes_actuales/sistemas_k08'
import { EstadoMateria } from '../domain/EstadoMateria'

let materiasIniciales = k08_sistemas.materias.map( materia => {
    return {
        id: materia.id,
        estado: EstadoMateria.NO_CURSADA
    }
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['plan','materias', 'planes_guardados'],
    stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, { plan: k08_sistemas.nombre, materias: materiasIniciales, planes_guardados: []});
export const persistor = persistStore(store);