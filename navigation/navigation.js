import Perfil from '../screens/Perfil'
import Generador from '../screens/Generador'
import PlanGenerado from '../screens/PlanGenerado'
import Home from '../screens/Home';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const Navegador = createStackNavigator({
    Home: {screen: Home},
    Perfil: { screen: Perfil },
    Generador: {screen: Generador},
    PlanGenerado: {screen: PlanGenerado}
},
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5b52ae',
            },

            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },

    }
);

export default createAppContainer(Navegador);