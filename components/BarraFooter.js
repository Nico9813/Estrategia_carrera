import React from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';
import Styles from '../styles/styles'

class BarraFooter extends React.Component {

    render() {
        return (
            <Footer >
                <FooterTab style={{
                    padding: 8,
                    backgroundColor: 'black',}}>
                    <Button onPress={() => this.props.navigation.navigate('Perfil')}>
                        <Text>Perfil</Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate('Generador')}>
                        <Text>Generador</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

export default BarraFooter;