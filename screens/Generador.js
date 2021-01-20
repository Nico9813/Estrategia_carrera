import React, { useState} from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Picker, Item, Form, Input, Container, Label  } from 'native-base'

import { useSelector } from 'react-redux';
import { Styles } from '../styles/styles';

import DetalleMateria from './DetalleMateria';

import { EstadoMateria } from '../domain/EstadoMateria';
import { indiceMaterias } from '../domain/indiceMaterias';
import EstrategiaCursada from '../domain/EstrategiaCursada';

const NO_SELECCIONADO = "NO_SELECCIONADO";

const Generador = (props) => {
    const [materiaSeleccionada, setMateriaSeleccionada] = useState()
    const materias = useSelector( state => state.materias)
    const [maximo_cuatri, setMaximoCuatri] = useState(4)
    const [maximo_anual, setMaximoAnual] = useState(4)
    const [maximo_finales, setMaximoFinales] = useState(4)

    const generarPlan = (rendir) => {
        if (materiaSeleccionada && materiaSeleccionada != NO_SELECCIONADO) {

            let estrategia = new EstrategiaCursada(
                materiaSeleccionada, 
                rendir,
                maximo_anual,
                maximo_cuatri,
                maximo_finales,
                materias
            )

            console.log("--------------------------------------------------------------")
            estrategia.generar()
            props.navigation.navigate('PlanGenerado', {
                estrategia
            })
        }
    }

    const renderGenerador = () => {
        return (
            <View style={[Styles.cartaContenido, { alignContent: "center", justifyContent: "center", marginTop: 20 }]}>
                <Text style={Styles.titulo}>Generador</Text>
                <Form>
                    <Item>
                        <Picker
                            label="materia"
                            placeholder="materia"
                            style={{ color: 'white' }}
                            selectedValue={materiaSeleccionada}
                            onValueChange={(value) => setMateriaSeleccionada(value)}
                        >
                            <Picker.Item label="Elegir materia..." value={NO_SELECCIONADO} />
                            {materias.filter(materia => materia.estado != EstadoMateria.APROBADA).map((materia, key) =>
                                <Picker.Item key={key} label={indiceMaterias[materia.id].nombre} value={materia.id} />
                            )}
                        </Picker>
                    </Item>
                    <Item>
                        <Label style={{ color: 'white', flex: 2 }} >Maximo materias por cuatrimestre:</Label>
                        <Input
                            style={{ flex: 2 }}
                            keyboardType='numeric'
                            placeholderTextColor="white"
                            value={maximo_cuatri.toString()}
                        ></Input>
                    </Item>
                    <Item>
                        <Label style={{ color: 'white', flex: 2 }}>Maximo materias anuales:</Label>
                        <Input
                            style={{ flex: 2 }}
                            keyboardType='numeric'
                            placeholderTextColor="white"
                            value={maximo_anual.toString()}
                        ></Input>
                    </Item>
                    <Item>
                        <Label style={{ color: 'white', flex: 2 }} >Maximo finales por cuatrimestre:</Label>
                        <Input
                            style={{ flex: 2 }}
                            keyboardType='numeric'
                            placeholderTextColor="white"
                            value={maximo_finales.toString()}
                        ></Input>
                    </Item>
                </Form>
            </View>
        )
    }

    return (
        <ScrollView>
            <Container style={{ marginBottom: 50 }}>
                <View style={Styles.container}>
                    {renderGenerador()}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 6 }}>
                            <TouchableOpacity style={Styles.boton} onPress={() => generarPlan(false)}>
                                <Text style={Styles.titulo}>
                                    Cursar
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 6 }}>
                            <TouchableOpacity style={Styles.boton} onPress={() => generarPlan(true)}>
                                <Text style={Styles.titulo}>
                                    Rendir
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {(materiaSeleccionada && materiaSeleccionada != NO_SELECCIONADO) ?
                        <View>
                            <DetalleMateria materia_id={materiaSeleccionada}></DetalleMateria>
                        </View>
                        :
                        <View></View>
                    }
                </View>
            </Container>
        </ScrollView>
    );
}

Generador.navigationOptions = {
    headerShown: false
};

export default Generador;