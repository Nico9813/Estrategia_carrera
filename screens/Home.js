import * as React from 'react';
import { View } from 'react-native';
import { Tabs, Tab} from 'native-base'

import { Styles } from '../styles/styles';
import Generador from './Generador';
import Perfil from './Perfil';

class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={Styles.container}>
                <Tabs prerenderingSiblingsNumber={5} tabBarPosition="bottom" tabContainerStyle={{backgroundColor: 'black'}}>
                    <Tab heading={"Perfil"} style={Styles.container}>
                        <Perfil></Perfil>
                    </Tab>
                    <Tab heading={"Generador"} style={Styles.container}>
                        <Generador navigation={this.props.navigation}></Generador>
                    </Tab>
                </Tabs>
            </View>
        );
    }

}

Home.navigationOptions = {
    headerShown: false
};

export default Home;