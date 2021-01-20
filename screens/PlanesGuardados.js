import React from 'react';

import { Container, Text, Title, View } from "native-base"
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { indiceMaterias } from '../domain/indiceMaterias';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PlanesGuardados = (props) => {

    const planes = useSelector( state => state.planes_guardados)

    return(
        <Container style={{backgroundColor:'black'}}>
            <Text style={{ backgroundColor: '#333333', borderRadius: 5, margin: 10, padding: 10, color:'white', textAlign:'center'}}>Planes guardados</Text>
            <Container style={{ backgroundColor: '#333333', borderRadius: 5, margin: 10, padding: 10 }}>
                {!planes.length && 
                <>
                    <Text style={{ color: 'white', textAlign: 'center' }}>No hay planes guardados todavia</Text>
                </>
                }
                <FlatList
                    data={planes}
                    keyExtractor={(_,index) => index.toString()}
                    renderItem={(item) =>
                        <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, margin: 10, padding: 10, color: 'white' }}
                            onPress={() => props.navigation.navigate('PlanGenerado', {
                                estrategia: item.item,
                                guardado:true
                            })}
                        >
                            <Title style={{color: 'white', marginBottom:10}}>
                                Objetivo: {item.item.rendir ? "Rendir " : "Cursar "}{indiceMaterias[item.item.materia_objetivo].nombre}
                            </Title>
                            <Text style={{color: 'white' }}>
                                Finalizacion estimada: {(new Date).getFullYear() +  item.item.duracion()}
                            </Text>
                        </TouchableOpacity>
                    }
                />
            </Container>
        </Container>
    )
}

export default PlanesGuardados