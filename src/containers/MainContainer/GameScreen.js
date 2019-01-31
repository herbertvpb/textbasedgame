
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions,ToastAndroid } from 'react-native';
import { Header, ButtonGroup,Button } from 'react-native-elements';
import { Card, CardItem, Body } from 'native-base';

import * as data from '../../questions/chapter1.json';

var {height, width} = Dimensions.get('window');

export default class GameScreen extends Component<Props> {
  constructor () {
    super()
    this.state = {
        chapter: 'C1',
        decision: 'D0',
        title: data.C1.Title,
        choice: -1,
        textDecision: data.C1.D0.txtDec,
        option1: data.C1.D0.op1,
        option2: data.C1.D0.op2
    }
  }      

  updateChoice = (choice) => {
    this.setState({choice});
  }    

  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: 'light-content', backgroundColor: 'black'}}
          outerContainerStyles={{ backgroundColor: '#3A393E', height:56 }}
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: this.state.title, style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Card style={{ height: height * 0.4, width: width * 0.9, alignSelf: 'center', marginTop: width * 0.05, marginBottom: width * 0.05  }}>
            <CardItem>
              <Body>
                <Text style={{ fontSize: 20}}>
                    {this.state.textDecision}
                </Text>
              </Body>
            </CardItem>
         </Card>
        <ButtonGroup
            onPress={this.updateChoice}
            selectedIndex={this.state.choice}
            buttons={[<Text>{this.state.option1}</Text>, <Text>{this.state.option2}</Text>]}
            containerStyle={{width: width * 0.9, alignSelf: 'center', height: 50,marginBottom:20}}
            selectedButtonStyle={{backgroundColor: 'gray'}}
            selectedTextStyle={{color: 'white'}} />
        <Button
          onPress={()=> this.nextDecision()}
          title='Seguir' 
          rounded/>

        <View style={{height:20}}></View>  
        <Button
          onPress={()=> this.reset()}
          title='Reset' 
          rounded/>  

        <Text >decision: {this.state.decision}</Text>
        <Text >choice: {this.state.choice}</Text>

      </View>
    );
  }

  reset(){
    this.setState({
      decision: 'D0',
      choice: -1,
      textDecision: data.C1.D0.txtDec,
      option1: data.C1.D0.op1,
      option2: data.C1.D0.op2,
    });
  }

  updateScreen(indexDecision){

    let chapter = this.state.chapter;

    this.setState({
      textDecision: data[chapter][indexDecision].txtDec,
      option1: data[chapter][indexDecision].op1,
      option2: data[chapter][indexDecision].op2
    })
  }

  nextDecision(){
    let decision = this.state.decision;
    let choice = this.state.choice;
    let newDecision = '';
    let newChoice = choice + 1; //Incrementa index (0 ou 1)
    if(this.state.option1!='-'){
      if (choice==-1){
        ToastAndroid.show('Selecione uma opção!', ToastAndroid.SHORT);
      }
      if (decision == 'D0'){
        newDecision = 'D' + newChoice.toString(); 
      } else {
        newDecision = decision + '_' + newChoice.toString();
      }
      this.setState({decision:newDecision, choice:-1});
      this.updateScreen(newDecision);  
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
