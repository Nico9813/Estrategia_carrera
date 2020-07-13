import * as React from 'react';
import { Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Picker, Item, Form, Input, Container, Right, Left, Row, Label  } from 'native-base'

import { connect } from 'react-redux';
import { cambiarEstadoMateria } from '../data/acciones';
import { Styles } from '../styles/styles';

import DetalleMateria from './DetalleMateria';

import { StyledBoton } from '../components/StyledBoton'

import { EstadoMateria } from '../domain/EstadoMateria';
import { indiceMaterias } from '../domain/indiceMaterias';
import GeneradorEstrategia from '../domain/GeneradorEstrategia'
import { k08_sistemas } from '../planes_actuales/sistemas_k08';
import { Dimensiones } from '../constants/Layout'

const NO_SELECCIONADO = "NO_SELECCIONADO";

class Generador extends React.Component {

    constructor(props) {
        super(props)
    }

    state={
        materiaSelecionada: undefined,
        maximo_cuatri: 4,
        maximo_anual: 4,
        maximo_finales: 4
    }

    cambiarMateriaSeleccionada(materia){
        this.setState({
            ...this.state,
            materiaSelecionada: materia,
        })

    }
    
    generarPlan(rendir){
        if (this.state.materiaSelecionada && this.state.materiaSelecionada != NO_SELECCIONADO){
            this.props.navigation.navigate('PlanGenerado', {
                plan: k08_sistemas,
                maximo_anual: this.state.maximo_anual,
                maximo_cuatri: this.state.maximo_cuatri,
                maximo_finales: this.state.maximo_finales,
                materiaSelecionada: this.state.materiaSelecionada,
                rendir: rendir
            })
        }
    }

    renderGenerador(){
        return(
            <View style={[Styles.cartaContenido, {alignContent:"center", justifyContent: "center", marginTop:20}]}>
                <Text style={Styles.titulo}>Generador</Text>
                    <Form>
                        <Item>
                        <Picker
                            label="materia"
                            placeholder="materia"
                            style={{ color: 'white' }}
                            selectedValue={this.state.materiaSelecionada}
                            onValueChange={(value) => this.cambiarMateriaSeleccionada(value)}
                        >
                            <Picker.Item label="Elegir materia..." value={NO_SELECCIONADO} />
                            {this.props.materias.filter(materia => materia.estado != EstadoMateria.APROBADA).map((materia, key) =>
                                <Picker.Item key={key} label={indiceMaterias[materia.id].nombre} value={materia.id} />
                            )}
                        </Picker>
                        </Item>
                        <Item>
                        <Label style={{ color: 'white', flex: 2 }} >Maximo materias por cuatrimestre:</Label>
                            <Input 
                                style={{flex: 2}}
                                keyboardType='numeric' 
                                placeholderTextColor="white"
                                onChange={(value) => this.setState({...this.state, maximo_cuatri: value })}
                            ></Input>
                        </Item>
                        <Item>
                            <Label style={{ color: 'white', flex: 2 }}>Maximo materias anuales:</Label>
                            <Input 
                                style={{flex: 2}}
                                keyboardType='numeric' 
                                placeholderTextColor="white"
                                onChange={(value) => this.setState({ ...this.state, maximo_anual: value })}
                            ></Input>
                        </Item>
                        <Item>
                        <Label style={{ color: 'white', flex: 2 }} >Maximo finales por cuatrimestre:</Label>
                            <Input 
                                style={{flex: 2}}
                                keyboardType='numeric' 
                                placeholderTextColor="white"
                                onChange={(value) => this.setState({ ...this.state, maximo_finales: value })}
                            ></Input>
                        </Item>
                    </Form>
            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                <Container style={{ marginBottom: 50 }}>
                    <View style={Styles.container}>
                        {this.renderGenerador()}
                        <View style={{flexDirection: 'row'}}>
                            <View style={{ flex: 6 }}>
                                <TouchableOpacity style={Styles.boton} onPress={() => this.generarPlan(false)}>
                                    <Text style={Styles.titulo}>
                                        Cursar
                                </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 6 }}>
                                <TouchableOpacity style={Styles.boton} onPress={() => this.generarPlan(true)}>
                                    <Text style={Styles.titulo}>
                                        Rendir
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {(this.state.materiaSelecionada && this.state.materiaSelecionada != NO_SELECCIONADO) ?
                            <View>
                                <DetalleMateria materia={this.state.materiaSelecionada}></DetalleMateria>
                            </View>
                            :
                            <View></View>
                        }
                    </View>
            </Container>
            </ScrollView>
        );
    }

}

Generador.navigationOptions = {
    headerShown: false
};

const mapStateToProps = (state) => {
    return {
        materias: state.materias
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        _cambiarEstadoMateria: (id, estado) => dispatch(cambiarEstadoMateria(id, estado)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Generador);