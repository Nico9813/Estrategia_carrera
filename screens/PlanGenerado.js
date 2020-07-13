import * as React from 'react';
import { Image, Platform, StyleSheet, Text, ActivityIndicator, View, FlatList, ScrollView } from 'react-native';
import { Card, CardItem, Left, Right, Header, Picker, Item, Button, Tab, Tabs, Container, Title } from 'native-base'

import { connect } from 'react-redux';
import { cambiarEstadoMateria } from '../data/acciones';
import { Styles } from '../styles/styles';
import { AppLoading } from 'expo';

import BarraFooter from '../components/BarraFooter';

import { EstadoMateria } from '../domain/EstadoMateria';
import { indiceMaterias } from '../domain/indiceMaterias';
import GeneradorEstrategia from '../domain/GeneradorEstrategia'
import { k08_sistemas } from '../planes_actuales/sistemas_k08';

class PlanGenerado extends React.Component {

    state={
        isReady: false,
        plan: {}
    }

    constructor(props) {
        super(props)
    }

    componentDidMount(){
        let datosPlanAGenerar = this.props.navigation.state.params

        let generador = new GeneradorEstrategia(
            datosPlanAGenerar.plan,
            this.props.materias,
            datosPlanAGenerar.maximo_anual,
            datosPlanAGenerar.maximo_cuatri,
            datosPlanAGenerar.maximo_finales
        )

        const estrategia = generador.generarPlan(datosPlanAGenerar.materiaSelecionada, datosPlanAGenerar.rendir)
        this.setState({ plan: estrategia, isReady: true })
    }

    renderMateria(id_materia) {
        return (
            <CardItem style={{ backgroundColor: 'black', margin: 3 }} >
                <Text style={{ color: 'white', textAlign:'center' }}>{indiceMaterias[id_materia].nombre}</Text>
            </CardItem >
        )
    }

    renderFinal(id_materia) {
        return (
            <CardItem style={{ backgroundColor: 'violet', margin: 3 }} >
                <Text style={{ color: 'white' }}>{indiceMaterias[id_materia].nombre}</Text>
            </CardItem >
        )
    }

    renderCuatrimestre(cuatrimestre, indice) {
        return (
            (cuatrimestre.id_materias.length == 0 && cuatrimestre.id_finales.length == 0) ? null :
                <View style={{margin:10,padding:10,borderRadius:5, borderWidth:1, borderColor:'white'}}>
                    <Text style={[Styles.titulo]}>Cuatrimestre {indice + 1}</Text>
                    {(!cuatrimestre.id_materias.length) ? null :
                        <View>
                            <CardItem style={{ backgroundColor: '#262626'}}>
                                <Text style={Styles.texto}>Materias</Text>
                            </CardItem>
                                <FlatList
                                    data={cuatrimestre.id_materias}
                                    renderItem={(item) => this.renderMateria(item.item)}
                                    keyExtractor={(value, key) => key.toString()}
                                    listKey={(item, index) => 'C' + index.toString()}
                                />
                        </View>
                    }
                    {(!cuatrimestre.id_finales.length) ? null :
                    <View>
                        <CardItem style={{ backgroundColor: '#262626'}}>
                            <Text style={Styles.texto}>Finales</Text>
                        </CardItem>
                            <FlatList
                                data={cuatrimestre.id_finales}
                                renderItem={(item) => this.renderFinal(item.item)}
                                keyExtractor={(value, key) => key.toString()}
                                listKey={(item, index) => 'C' + index.toString()}
                            />
                    </View>  
                    }
                </View>
        )
    }

    renderAnio(anio, indice) {
        return (
            <ScrollView>
                <View>
                    <Card style={Styles.carta}>
                        <CardItem style={Styles.cartaContenido}>
                            <Text style={Styles.titulo}>Año {indice + 1}</Text>
                        </CardItem>
                        <CardItem style={Styles.cartaContenido}>
                            <Text style={{ color: 'white' }}>Materias anuales</Text>
                        </CardItem>
                        <FlatList
                            data={anio.id_materia_anuales}
                            renderItem={(item) => this.renderMateria(item.item)}
                            keyExtractor={(value, key) => key.toString()}
                            listKey={(item, index) => 'B' + index.toString()}
                        />
                        <CardItem style={Styles.cartaContenido}>
                            <FlatList
                                data={anio.cuatrimestres}
                                renderItem={(item) => this.renderCuatrimestre(item.item, item.index)}
                                keyExtractor={(value, key) => key.toString()}
                                listKey={(item, index) => 'A' + index.toString()}
                            />
                        </CardItem>
                    </Card>
                </View>
            </ScrollView>
        )
    }

    render() {
        if (!this.state.isReady) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }else{
            return (
                <View style={Styles.container}>
                    <Container>
                        <Tabs prerenderingSiblingsNumber={5}>
                            {this.state.plan.anios.map((anio, key) =>
                                <Tab key={key} heading={(new Date().getFullYear() + key).toString()} style={Styles.container}>
                                    {this.renderAnio(anio, key)}
                                </Tab>
                            )}
                        </Tabs>
                    </Container>
                </View>
            );
        }
    }

}

PlanGenerado.navigationOptions = {
    headerShown: false
};

const mapStateToProps = (state) => {
    return {
        materias: state.materias
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanGenerado);