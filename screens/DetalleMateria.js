import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, CardItem } from 'native-base'

import { Styles } from '../styles/styles';
import { indiceMaterias } from '../domain/indiceMaterias';

const DetalleMateria = (props) => {

    const { materia_id } = props
    const materia = indiceMaterias[materia_id]

    return (
        <Card style={[Styles.carta, { borderRadius: 7, paddingBottom: 20 }]}>
            <CardItem style={Styles.cartaContenido}>
                <Text style={{ color: 'white' }}>{materia.nombre}</Text>
            </CardItem>

            <CardItem style={Styles.cartaContenido}>
                <Text style={{ color: 'white' }}>Cursadas correlativas</Text>
            </CardItem>
            {(materia.id_correlativas_cursar.length) ?
                <FlatList
                    data={materia.id_correlativas_cursar}
                    renderItem={(item) => <Text style={{ color: 'white', paddingLeft: 20 }}>- {indiceMaterias[item.item].nombre}</Text>}
                    keyExtractor={(_, key) => key.toString()}
                    listKey={(_, index) => 'B' + index.toString()}
                />
                :
                <Text style={{ color: 'white', paddingLeft: 20 }}> -Sin correlativas</Text>}
            <CardItem style={Styles.cartaContenido}>
                <Text style={{ color: 'white' }}>Finales correlativos</Text>
            </CardItem>
            {(materia.id_correlativas_rendir.length) ?
                <FlatList
                    data={materia.id_correlativas_rendir}
                    renderItem={(item) => <Text style={{ color: 'white', paddingLeft: 20 }}>- {indiceMaterias[item.item].nombre}</Text>}
                    keyExtractor={(value, key) => key.toString()}
                    listKey={(item, index) => 'B' + index.toString()}
                />
                :
                <Text style={{ color: 'white', paddingLeft: 20 }}> -Sin correlativas</Text>}

        </Card>
    );
}

DetalleMateria.navigationOptions = {
    headerShown: false
};

export default DetalleMateria;