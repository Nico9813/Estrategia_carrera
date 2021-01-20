import * as React from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Card, CardItem, Button, Tab, Tabs, Container } from 'native-base'

import { useDispatch } from 'react-redux';
import { eliminarPlan, guardarPlan } from '../data/acciones';
import { Styles } from '../styles/styles';

const PlanGenerado = (props) => {

    const { estrategia, guardado = false } = props.navigation.state.params
    const dispatch = useDispatch()
    const [PlanGuardado, setPlanGuardado] = React.useState(guardado)

    const renderMateria = (materia, color) => 
        <CardItem style={{ backgroundColor: color, margin: 3 }} >
            <Text style={{ color: 'white', textAlign: 'center' }}>{materia.nombre}</Text>
        </CardItem >

    const renderCuatrimestre = (cuatrimestre) => {

        const materias_cuatrimestre = estrategia.materiasCuatrimestre(cuatrimestre)
        const finales_cuatrimestre = estrategia.finalesCuatrimestre(cuatrimestre)

        return (
            (materias_cuatrimestre.length > 0 || finales_cuatrimestre.length > 0) &&
            <View style={{ margin: 10, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'white' }}>
                <Text style={[Styles.titulo]}>Cuatrimestre {(cuatrimestre % 2) + 1}</Text>
                <View>
                    <CardItem style={{ backgroundColor: '#262626' }}>
                        <Text style={Styles.texto}>Materias</Text>
                    </CardItem>
                    <FlatList
                        data={materias_cuatrimestre}
                        renderItem={(item) => renderMateria(item.item, 'black')}
                        keyExtractor={(_, key) => key.toString()}
                        listKey={(_, index) => 'C' + index.toString()}
                    />
                    <FlatList
                        data={finales_cuatrimestre}
                        renderItem={(item) => renderMateria(item.item, 'violet')}
                        keyExtractor={(_, key) => key.toString()}
                        listKey={(_, index) => 'C' + index.toString()}
                    />
                </View>
            </View>
        )
    }

    const renderAnio = (anio) => {

        const materias_anuales = estrategia.materiasAnuales(anio)

        return(
            <ScrollView>
                <View>
                    <Card style={Styles.carta}>
                        <CardItem style={Styles.cartaContenido}>
                            <Text style={Styles.titulo}>Año {anio + 1}</Text>
                        </CardItem>
                        
                        {materias_anuales.length > 0 && 
                            <>
                                <CardItem style={Styles.cartaContenido}>
                                    <Text style={{ color: 'white' }}>Materias anuales</Text>
                                </CardItem>
                                <FlatList
                                    data={materias_anuales}
                                    renderItem={(item) => renderMateria(item.item, 'black')}
                                    keyExtractor={(_, key) => key.toString()}
                                    listKey={(_, index) => 'B' + index.toString()}
                                />
                            </>
                        }
                        {renderCuatrimestre(anio * 2)}
                        {renderCuatrimestre(anio * 2 + 1)}
                    </Card>
                </View>
            </ScrollView>
        )
    }
        
    
    const renderTabs = () => {
        let tabs = []

        const duracion = Math.ceil(estrategia.duracion() / 2) + 1

        for (let i = 0; i < duracion; i++) {
            tabs.push(
                <Tab key={i} heading={(new Date().getFullYear() + i).toString()} style={Styles.container}>
                    {renderAnio(i)}
                </Tab>
            )
        }

        return tabs
    }

    return (
        <View style={Styles.container}>
            <Container>
                <Tabs prerenderingSiblingsNumber={5}>
                    {renderTabs()}
                </Tabs>
            </Container>
            {!PlanGuardado ? 
                <Button
                    style={{ backgroundColor: 'red', borderRadius: 5, margin: 10, padding: 10, width: "95%" }}
                    onPress={() => {
                        dispatch(guardarPlan(estrategia));
                        setPlanGuardado(true)
                    }}
                >
                    <Text style={{ textAlign: 'center', color: 'white' }}>Guardar</Text>
                </Button>
                :
                <Button
                    style={{ backgroundColor: 'blue', borderRadius: 5, margin: 10, padding: 10, width: "95%" }}
                    onPress={() => {
                        dispatch(eliminarPlan(estrategia.id));
                        setPlanGuardado(false)
                    }}
                >
                    <Text style={{ textAlign: 'center', color: 'white' }}>Eliminar</Text>
                </Button>
            }
            
        </View>
    );
}

PlanGenerado.navigationOptions = {
    headerShown: false
};

export default PlanGenerado;