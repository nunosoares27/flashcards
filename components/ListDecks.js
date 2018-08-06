import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { withRouter } from 'react-router-native'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import { getDecksAPI } from './actions/actionsCreators'
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
//import { getDecks } from '../utils/api'

export class ListDecks extends Component {

    componentDidMount(){
      this.props.getDecksAPI().catch(err => err)
    }
    
    render(){
       
        return (
             <Content>
               {
                  this.props.decks !== null ?
                  (
                    <List dataArray={this.props.decks}
            renderRow={(item) =>
              <ListItem key={item} style={{ backgroundColor: 'white', flex: 1, marginLeft: 0, height: 200, 
              justifyContent: 'center',alignItems: 'center', }} onPress={() => this.props.history.push(`/deck/${item.title}`)} >
                <Text style={{fontSize: 20, fontWeight: 'bold' }}>{item.title} ({item.questions.length} Decks)</Text>  
              </ListItem>
            }>
          </List>

                  ) : ''

               }
          
        </Content>
        )

    }
}

const mapStateToProps = (state) => {
       return {decks: state.decks}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getDecksAPI }, dispatch)
  
}

export default ListDeckswithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(ListDecks))