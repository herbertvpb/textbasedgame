import React, {Component} from 'react'

import { Scene, Router } from 'react-native-router-flux';

import GameScreen from './containers/MainContainer/GameScreen'



class RouterComponent extends Component {
    
    render () {
        return (
            <Router>
              <Scene key='app'>
                <Scene key='auth' initial hideNavBar>
                  <Scene key='gameScreen'
                    component={GameScreen}
                    initial />
                  
                </Scene>
              </Scene>
            </Router>
        )
      };
    }
    
  
export default RouterComponent
  