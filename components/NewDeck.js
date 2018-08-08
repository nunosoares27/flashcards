import React, { Component } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import { Container, Header, Text, Content, Form, Item, Input, Label, Button } from 'native-base';
// import {saveDeckTitle} from '../utils/api';
import { withRouter } from 'react-router-native'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import { addDeckAPI } from './actions/actionsCreators'

export class NewDeck extends Component {
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
                <Button dark style={{ marginLeft: 15, marginRight: 15}} onPress={() => this.setState({ title: '' })} ><Text>Cancel</Text></Button>
                {this.state.title !== ''? 
                 <Button success onPress={async() => 
                   {
                     const decktitle = this.state.title
              await this.props.addDeckAPI(this.state.title).catch(err => err); 
                  this.setState({
                      title: '',
                  })
                 this.props.history.push(`/deck/${decktitle}`)
                   }
                  
                    }><Text>Send</Text></Button> :
                   <Button disabled><Text>Send</Text></Button>
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
    { addDeckAPI },
    dispatch
  );
}

export default NewDeckwithRouter = withRouter(connect(null, mapDispatchToProps)(NewDeck))