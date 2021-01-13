import { Card, CardItem, Left, Right } from 'native-base';
import * as React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress-circle';
import { useDispatch, useStore } from 'react-redux';
import { cambiarEstadoMateria } from '../data/acciones';
import { EstadoMateria } from '../domain/EstadoMateria';
import { indiceMaterias } from '../domain/indiceMaterias';
import { Styles } from '../styles/styles';

const Perfil = () => {
  const store = useStore()
  const { plan, materias } = store.getState()

  return(
    <View style={Styles.container}>
      <StatusBar />
      <View style={Styles.carta}>
        <Text style={[{ color: 'white' }, Styles.titulo]}>Plan: {plan}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <GraficoCircularPorcentaje materias={materias} />
        <View style={[Styles.carta, { flex: 9, padding: 5 }]}>
          <BarraPorcentajeEstado materias={materias} estado={EstadoMateria.NO_CURSADA}/>
          <BarraPorcentajeEstado materias={materias} estado={EstadoMateria.CURSADA}/>
          <BarraPorcentajeEstado materias={materias} estado={EstadoMateria.APROBADA}/>
        </View>
      </View>
      <View style={Styles.carta}>
        <View style={[Styles.carta, { backgroundColor: 'grey' }]}>
          <Text style={{ color: 'white' }}>Buscar materia</Text>
        </View>
      </View>
      <FlatList
        data={materias}
        renderItem={(item) => <CartaMateria materia={item.item}/>}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  )
}

const BarraPorcentajeEstado = (props) => {
  const { materias, estado } = props

  let cantidad_estado_requerido = materias.filter(materia => materia.estado == estado).length
  let cantidad_totales = materias.length
  let porcentaje_estado = cantidad_estado_requerido / cantidad_totales

  return (
    <View style={{ padding: 4, flexDirection: 'row' }}>
      <View style={{ flex: 4 }}>
        <Text style={{ color: 'white' }}> {estado} </Text>
      </View>
      <View style={{ flex: 7 }}>
        <Progress.Bar progress={porcentaje_estado} width={120} color='white' />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={{ color: 'white' }}>{cantidad_estado_requerido} / {cantidad_totales} </Text>
      </View>
    </View>
  )
}

const GraficoCircularPorcentaje = (props) => {
  const { materias } = props

  let cantidad_estado_requerido = materias.filter(materia => materia.estado == EstadoMateria.APROBADA).length
  let cantidad_totales = materias.length
  let porcentaje_estado = cantidad_estado_requerido / cantidad_totales

  return (
    <View style={[Styles.carta, { flex: 3, margin: 10, alignContent: 'center', alignItems: 'center' }]}>
      <ProgressCircle
        percent={porcentaje_estado * 100}
        radius={35}
        borderWidth={8}
        color="white"
        shadowColor="black"
        bgColor='#262626'
      >
        <Text style={{ color: 'white', fontSize: 18 }}>{Math.trunc(porcentaje_estado * 100)} %</Text>
      </ProgressCircle>
    </View>
  )
}

const CartaMateria = (props) => {

  const  {id, estado } = props.materia
  const materia = indiceMaterias[id]
  const { nombre } = materia


  const { dispatch } = useDispatch()

  const siguienteEstado = (estado) => {
    switch (estado) {
      case EstadoMateria.NO_CURSADA: return EstadoMateria.CURSADA;
      case EstadoMateria.CURSADA: return EstadoMateria.APROBADA;
      case EstadoMateria.APROBADA: return EstadoMateria.NO_CURSADA;
    }
  }

  const colorSegunEstado = (estado) => {
    switch (estado) {
      case EstadoMateria.APROBADA: return 'white';
      case EstadoMateria.CURSADA: return 'white';
      case EstadoMateria.NO_CURSADA: return 'white';
    }
  }

  return (
    <View>
      <TouchableOpacity activeOpacity={0.75} onPress={() => dispatch(cambiarEstadoMateria(id, siguienteEstado(estado)))}>
        <Card style={Styles.carta}>
          <CardItem style={Styles.cartaContenido}>
            <Left>
              <Text style={{ color: 'white' }}>
                {nombre}
              </Text>
            </Left>
            <Right>
              <View style={[Styles.cartaContenido, { backgroundColor: colorSegunEstado(estado)}]}>
                <Text>
                  {estado}
                </Text>
              </View>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    </View>
  )
}

Perfil.navigationOptions = {
  headerShown: false
};

export default Perfil;