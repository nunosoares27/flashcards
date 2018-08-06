import React, { Component } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import { Container, Header, Text, Content, Form, Item, Input, Label, Button, Left, Body, Title, Right, Icon } from 'native-base';
// import {saveDeckTitle} from '../utils/api';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import {}  from './actions/actionsCreators'

class CreateCard extends Component {
  state = {
    question: '',
    answer:'',
    correctAnswer: '',
  }
  
    render() {
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
             <Item rounded style={{ marginTop: 15, marginBottom: 15}}>
              <Input placeholder='Insert Correct Answer Here...' value={this.state.correctAnswer} onChangeText={(correctAnswer) => this.setState({correctAnswer: correctAnswer}) } />
            </Item>
             <View style={{ flex: 1, flexDirection: 'row'}}>
                <Button dark style={{ marginLeft: 15, marginRight: 15}} ><Text>Cancel</Text></Button>
                <Button success onPress={() => this.props.addDeckAPI(this.state.title).catch(err => err)}><Text>Send</Text></Button>
              </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators(
    { },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(CreateCard)