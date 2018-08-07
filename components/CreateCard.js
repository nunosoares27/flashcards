import React, { Component } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import { Container, Header, Text, Content, Form, Item, Input, Label, Button, Left, Body, Title, Right, Icon , Picker} from 'native-base';
// import {saveDeckTitle} from '../utils/api';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import {addCardAPI}  from './actions/actionsCreators'

class CreateCard extends Component {
  state = {
    question: '',
    answer:'',
    correctAnswer: 'notValid',
  }

  submitCard = (deck) => {
      const { question, answer, correctAnswer} = this.state
    this.props.addCardAPI({question, answer, correctAnswer, deck
    }).catch(err => err)
    this.setState({
        question: '', answer: '', correctAnswer: ''
    })
  }
  
//    onValueChange(value) {
//     this.setState({
//       selected: value
//     });
//   }

    render() {
        const deckName = this.props.match.params.deck
    return (
      <Container style={{ width: Dimensions.get('window').width,
height: Dimensions.get('window').height}}>
                 <Header hasTabs>
                       <Left>
                            <Button transparent onPress={() => this.props.history.push('/')}>
                            <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>FlashCards</Title>
                        </Body>
                        <Right />
                 </Header>    
        <Content>
          <Form>
            <Item rounded style={{ marginTop: 15, marginBottom: 15}}>
              <Input placeholder='Insert Question Here...' value={this.state.question} onChangeText={(question) => this.setState({question: question}) } />
            </Item>
             <Item rounded style={{ marginTop: 15, marginBottom: 15}}>
              <Input placeholder='Insert Answer Here...' value={this.state.answer} onChangeText={(answer) => this.setState({answer: answer}) } />
            </Item>
             <Picker
              note
              mode="dropdown"
              style={{ width: Dimensions.get('window').width, marginBottom: 25 }}
              selectedValue={this.state.correctAnswer}
              onValueChange={(correctAnswer) => this.setState({correctAnswer: correctAnswer})}
            >
              <Picker.Item label="Select Correct Answer..." value="notValid" />
              <Picker.Item label="Correct" value="true" />
              <Picker.Item label="InCorrect" value="false" />
            </Picker>


             <View style={{ flex: 1, flexDirection: 'row'}}>
                <Button dark style={{ marginLeft: 15, marginRight: 15}} onPress={() => this.setState({
                    question: '',answer:'',correctAnswer: 'notValid', })} ><Text>Cancel</Text></Button>
             { this.state.correctAnswer !== 'notValid' && this.state.question !== '' && this.state.question !== ''?
              <Button success onPress={() => this.submitCard(deckName)}><Text>Send</Text></Button> : 
               <Button success disabled><Text>Send</Text></Button>
              }
               
              </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators(
    { addCardAPI },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(CreateCard)