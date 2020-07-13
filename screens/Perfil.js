import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Card, CardItem, Left, Right } from 'native-base'

import { connect } from 'react-redux';
import { indiceMaterias } from '../domain/indiceMaterias'
import { EstadoMateria } from '../domain/EstadoMateria'
import { k08_sistemas } from '../planes_actuales/sistemas_k08'
import { cambiarEstadoMateria } from '../data/acciones';
import BarraFooter from '../components/BarraFooter';
import { Styles } from '../styles/styles';

class Perfil extends React.Component{

  colores = ['red', 'yellow', 'green']

  constructor(props){
    super(props)
  }

  siguienteEstado(estado){
    switch (estado) {
      case EstadoMateria.NO_CURSADA: return EstadoMateria.CURSADA ;
      case EstadoMateria.CURSADA: return EstadoMateria.APROBADA ;
      case EstadoMateria.APROBADA: return EstadoMateria.NO_CURSADA;
    } 
  }

  colorSegunEstado(estado){
    switch(estado){
      case EstadoMateria.APROBADA: return 'green';
      case EstadoMateria.CURSADA: return 'yellow';
      case EstadoMateria.NO_CURSADA: return 'red';
    }
  }

  renderCartaMateria(materia){
    return(
      <View>
        <TouchableOpacity activeOpacity={0.75} onPress={ () => this.props._cambiarEstadoMateria(materia.id, this.siguienteEstado(materia.estado))}>
          <Card style={Styles.carta}>
            <CardItem style={Styles.cartaContenido}>
              <Left>
                <Text style={{color: 'white'}}>
                  {indiceMaterias[materia.id].nombre}
                </Text>
              </Left>
              <Right>
                <Card style={Styles.carta}>
                  <CardItem style={[Styles.cartaContenido, {backgroundColor: this.colorSegunEstado(materia.estado)}]}>
                    <Text>
                      {materia.estado}
                    </Text>
                  </CardItem>
                </Card>
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    )
  }

  render(){
    return (
      <View style={Styles.container}>
          <StatusBar />
          <FlatList
            data={this.props.materias}
            renderItem={(item) => this.renderCartaMateria(item.item)}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>
    );
  }
  
}

Perfil.navigationOptions = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);