import React, {Component} from 'react';
import { View, Dimensions } from 'react-native';
import { withRouter } from 'react-router-native';
//import { getDecks } from '../utils/api'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import { getDecksAPI } from './actions/actionsCreators'
import { Font, AppLoading } from "expo";
import { Container, Header, Content, Text, Left, Body, Title, Right, Card, CardItem, Button,Icon } from 'native-base';


export class Deck extends Component {
     async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
     }

    async componentDidMount(){
       this.props.getDecksAPI().catch(err => err)
    }
    
    render(){
         var items = ''
         
        return(
            <Container style={{ width: Dimensions.get('window').width,
height: Dimensions.get('window').height}} >
                 <Header >
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
                     <Card>
                        <CardItem header style={{justifyContent: 'center',alignItems: 'center',}}>
                        <Text>  { this.props.decks[this.props.match.params.id] && this.props.decks[this.props.match.params.id].title} </Text>
                        </CardItem>
                        <CardItem>
                        <Body style={{justifyContent: 'center',alignItems: 'center',}}>
                            <Text>
                                { this.props.decks[this.props.match.params.id] && this.props.decks[this.props.match.params.id].questions.length}
                            </Text>
                             <Button block dark style={{ marginTop: 15, marginBottom: 15}} onPress={() => this.props.history.push(`/addcard/${this.props.match.params.id}`)}><Text>Add Card</Text></Button>
                         {this.props.decks[this.props.match.params.id].questions.length > 0 ?
                             <Button block success onPress={() => this.props.history.push(`/quizz/${this.props.match.params.id}`)}><Text>Start Quizz</Text></Button> :
                             <Button block disabled ><Text>Start Quizz</Text></Button>
                         }  
                        </Body>
                        </CardItem>
                     </Card>
                 </Content>
            </Container>
            
        );
    }
}

const mapStateToProps = (state) => {
       return {decks: state.decks}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getDecksAPI }, dispatch)
  
}


export default DeckwithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Deck))