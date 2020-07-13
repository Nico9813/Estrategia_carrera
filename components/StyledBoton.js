import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Styles } from '../styles/styles';

export function MonoText(props) {
    return (
        <TouchableOpacity style={Styles.boton} onPress={() => this.props.onPress()}>
            <Text>
                {this.props.titulo}
            </Text>
        </TouchableOpacity>
    )
}
