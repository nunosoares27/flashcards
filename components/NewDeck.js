import React, { Component } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import { Container, Header, Text, Content, Form, Item, Input, Label, Button } from 'native-base';
// import {saveDeckTitle} from '../utils/api';
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import { addDeckAPI } from './actions/actionsCreators'

class NewDeck extends Component {
  state = {
    title: ''
  }
  // SaveDeck = () => {
  //   saveDeckTitle(this.state.title)
  //   this.setState({
  //     title: ''
  //   })
  // }
    render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item rounded style={{ marginTop: 15, marginBottom: 15}}>
              <Input placeholder='Insert Title Here...' value={this.state.title} onChangeText={(title) => this.setState({title: title}) } />
            </Item>
             <View style={{ flex: 1, flexDirection: 'row'}}>
                <Button dark style={{ marginLeft: 15, marginRight: 15}} ><Text>Cancel</Text></Button>
                <Button success onPress={() => {
                  this.props.addDeckAPI(this.state.title).catch(err => err); 
                  this.setState({
                      title: '',
                  })} }><Text>Send</Text></Button>
              </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators(
    { addDeckAPI },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(NewDeck)