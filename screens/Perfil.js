import { Card, CardItem, Left, Right } from 'native-base';
import * as React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress-circle';
import { connect } from 'react-redux';
import { cambiarEstadoMateria } from '../data/acciones';
import { EstadoMateria } from '../domain/EstadoMateria';
import { indiceMaterias } from '../domain/indiceMaterias';
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
      case EstadoMateria.APROBADA: return '#7040ff';
      case EstadoMateria.CURSADA: return '#3d54ff';
      case EstadoMateria.NO_CURSADA: return '#0084ff';
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
                  <View style={[Styles.cartaContenido, {backgroundColor: this.colorSegunEstado(materia.estado)}]}>
                    <Text>
                      {materia.estado}
                    </Text>
                  </View>
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    )
  }

  renderCirculoPorcentaje(){

    let cantidad_estado_requerido = this.props.materias.filter(materia => materia.estado == EstadoMateria.APROBADA).length
    let cantidad_totales = this.props.materias.length
    let porcentaje_estado = cantidad_estado_requerido / cantidad_totales

    return(
      <View style={[Styles.carta, { flex: 3, margin: 10, alignContent: 'center', alignItems: 'center' }]}>
        <ProgressCircle
          percent={porcentaje_estado * 100}
          radius={35}
          borderWidth={8}
          color="#3399FF"
          shadowColor="black"
          bgColor='#262626'
        >
          <Text style={{ color: 'white', fontSize: 18 }}>{Math.trunc(porcentaje_estado * 100)} %</Text>
        </ProgressCircle>
      </View>
    )
  }

  renderBarraPorcentaje(estado){

    let cantidad_estado_requerido = this.props.materias.filter(materia => materia.estado == estado).length
    let cantidad_totales = this.props.materias.length
    let porcentaje_estado = cantidad_estado_requerido / cantidad_totales

    return(
      <View style={{ padding: 4, flexDirection: 'row' }}>
        <View style={{ flex: 4 }}>
          <Text style={{ color: 'white' }}> {estado} </Text>
        </View>
        <View style={{ flex: 7 }}>
          <Progress.Bar progress={porcentaje_estado} width={120} color={this.colorSegunEstado(estado)}/>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: 'white' }}>{cantidad_estado_requerido} / {cantidad_totales} </Text>
        </View>
      </View>
    )
  }

  render(){
    return (
      <View style={Styles.container}>
        <StatusBar />
        <View style={Styles.carta}>
          <Text style={[{ color: 'white'}, Styles.titulo]}>Plan: {this.props.plan}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.renderCirculoPorcentaje()}
          <View style={[Styles.carta, { flex: 9, padding: 5}]}>
            {this.renderBarraPorcentaje(EstadoMateria.NO_CURSADA)}
            {this.renderBarraPorcentaje(EstadoMateria.CURSADA)}
            {this.renderBarraPorcentaje(EstadoMateria.APROBADA)}
          </View>
        </View>
        <View style={Styles.carta}>
          <View style={[Styles.carta, {backgroundColor: 'grey'}]}>
            <Text style={{color: 'white'}}>Buscar materia</Text>
          </View>
        </View>
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
    plan : state.plan,
    materias: state.materias
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    _cambiarEstadoMateria: (id, estado) => dispatch(cambiarEstadoMateria(id, estado)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Perfil);