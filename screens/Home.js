import * as React from 'react';
import { Text } from 'react-native';
import { Tabs, Tab, TabHeading} from 'native-base'

import { Styles } from '../styles/styles';
import Generador from './Generador';
import Perfil from './Perfil';
import PlanesGuardados from './PlanesGuardados';

class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tabs tabBarBackgroundColor="white" prerenderingSiblingsNumber={5} tabBarPosition="bottom">
                <Tab 
                    heading={<TabHeading style={{ backgroundColor: 'red' }}>
                        <Text style={{ color: "white" }}>Perfil</Text></TabHeading>}>
                        <Perfil></Perfil>
                </Tab>
                <Tab 
                    heading={<TabHeading style={{ backgroundColor: 'red' }}><Text style={{color:"white"}}>Generar plan</Text></TabHeading>}> 
                    <Generador navigation={this.props.navigation}></Generador>
                </Tab>
                <Tab 
                    heading={<TabHeading style={{ backgroundColor: 'red' }}><Text style={{color:"white"}}>Planes Guardados</Text></TabHeading>}> 
                    <PlanesGuardados navigation={this.props.navigation}></PlanesGuardados>
                </Tab>
                </Tabs>
        );
    }

}

Home.navigationOptions = {
    headerShown: false
};

export default Home;