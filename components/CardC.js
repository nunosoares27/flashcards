import React, {Component} from 'react';
import { View, Dimensions, Alert, Animated } from 'react-native';
import { withRouter} from 'react-router-native'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import { getDecksAPI } from './actions/actionsCreators'
import {clearLocalNotification} from '../utils/api'
import { Font, AppLoading } from "expo";
import { Container, Header, Content, Text, Left, Body, Title, Right, Card, CardItem, Button, Icon, } from 'native-base';


export class CardC extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showAnswer: true,
            questionNumber: 0,
            correct: 0,
            incorrect: 0,
        }
         this.onShowAnswer = this.onShowAnswer.bind(this)
          this.rotateAnimation = new Animated.Value(0)
          this.fadeAnimation = new Animated.Value(1)
          this.rotateText = new Animated.Value(0)
    }

    onShowAnswer() {
        this.setState({
            showAnswer: !this.state.showAnswer,
            fadeAnimation: !this.fadeAnimation,
            rotateText: !this.rotateText
        })

     Animated.sequence([
            Animated.timing(this.fadeAnimation, {
          toValue: 0,
          duration: 50
      }), 
         Animated.timing(this.rotateAnimation, {
          toValue: !this.state.showAnswer,
          duration: 500
      }),
         
    //    Animated.timing(this.rotateText, {
    //       toValue: 0,
    //       duration: 1500
    //   }),
       Animated.timing(this.fadeAnimation, {
          toValue: 1,
          duration: 50
      }), 

     ]).start()
    

    }
   
     async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  //this.position = new Animated.Value(0)

     }

      async componentDidMount(){
       this.props.getDecksAPI().catch(err => err)
    }

    submitAnswer = (answer) => {
        const questionNumber = this.state.questionNumber
        const decks = this.props.decks
        const deck = this.props.match.params.id
        const correct = decks[deck].questions[questionNumber].correctAnswer.toLowerCase()

        if(answer === correct) {
            this.setState({
                correct: this.state.correct + 1
            })
        }
        else {
            this.setState({
                incorrect: this.state.incorrect + 1
            })
        }

        this.setState({
            questionNumber: this.state.questionNumber + 1,

        })

        this.setState({
            showAnswer: !this.state.showAnswer
        })


          Animated.sequence([
            Animated.timing(this.fadeAnimation, {
          toValue: 0,
          duration: 50
      }), 
         Animated.timing(this.rotateAnimation, {
          toValue: !this.state.showAnswer,
          duration: 500
      }),
         
    //    Animated.timing(this.rotateText, {
    //       toValue: 0,
    //       duration: 1500
    //   }),
       Animated.timing(this.fadeAnimation, {
          toValue: 1,
          duration: 50
      }), 

     ]).start()

    }
    
    render(){
        console.log('correct',this.state.correct)
        console.log('incorrect',this.state.incorrect)
      //  console.log('card',this.props.match.params.id)
        const interpolateRotation = this.rotateAnimation.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '180deg'],
        })
        const animatedStyle = {
            transform: [{
                rotateY: interpolateRotation
            }]
        }
        const fadeStyle = {
            opacity: this.fadeAnimation
        }
        const rotateTextStyle = {
             transform: [{
                rotateY: interpolateRotation
            }]
        }

        const questionNumber = this.state.questionNumber
        const decks = this.props.decks
        const deck = this.props.match.params.id
        const number = this.state.questionNumber + 1


        if(questionNumber === decks[deck].questions.length){
            clearLocalNotification()
            const QuestionPercentage = 100 / decks[deck].questions.length
            const AnswerPercentage = Math.floor(this.state.correct * QuestionPercentage)
            console.log(QuestionPercentage)
            return (
                <View>
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
                  <Content contentContainerStyle={{width: Dimensions.get('window').width,
height: Dimensions.get('window').height/2, justifyContent: 'center',alignItems: 'center'}}> 
                    {
                        this.state.correct > this.state.incorrect ? <Text style={{fontSize: 90}}>😁</Text>:<Text style={{fontSize: 90}}>😩</Text>
                    }

                   <Text style={{ fontSize: 20}}>{ AnswerPercentage } %</Text>
                    <Text style={{ fontSize: 20}}>You got {this.state.correct} out of {decks[deck].questions.length}</Text>
                    </Content>
                    </Container>
                </View>
            )
        }

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

    {this.state.showAnswer ? (
         <Content>
                     <Animated.View style={[animatedStyle]} >
                     <Card>
                        <CardItem header style={{justifyContent: 'center',alignItems: 'center'}}>
                         <Animated.Text style={[rotateTextStyle]}>{decks[deck].title}</Animated.Text>
                        </CardItem>
                        <CardItem>
                        <Body style={{justifyContent: 'center',alignItems: 'center',}}>
                            <Animated.Text style={[fadeStyle, rotateTextStyle]}>
                                    {decks[deck].questions[questionNumber].question}
                            </Animated.Text>
                            <Animated.View  style={[rotateTextStyle, fadeStyle]}>
                             <Button block dark style={{ marginTop: 15, marginBottom: 15}} onPress={this.onShowAnswer}>
                                 <Text>Show Answer</Text>
                                 </Button>
                             </Animated.View>
                        </Body>
                        </CardItem>
                         <Animated.View  style={[rotateTextStyle, fadeStyle]}>
                         <CardItem footer>
                            <Text>{number} | {decks[deck].questions.length}</Text>
                        </CardItem>
                        </ Animated.View>
                     </Card>
                     </Animated.View>
                 </Content>
    ): (
         <Content>
                     <Animated.View style={[animatedStyle]} >
                     <Card>
                        <CardItem header style={{justifyContent: 'center',alignItems: 'center',}}>
                        <Animated.Text style={[ rotateTextStyle]}>{decks[deck].title}</Animated.Text>
                        </CardItem>
                        <CardItem>
                        <Body style={{justifyContent: 'center',alignItems: 'center',}}>
                            <Animated.Text style={[fadeStyle, rotateTextStyle]}>
                                    {decks[deck].questions[questionNumber].answer}
                            </Animated.Text>
                     <Animated.View  style={[rotateTextStyle, fadeStyle, {flex: 1, flexDirection: 'row'}]}>
                             <Button block danger style={{ marginTop: 15, marginBottom: 15, marginRight: 15}} onPress={()=> this.submitAnswer('false')}>
                                  <Text>Incorrect</Text>
                                 </Button>
                                 <Button block success style={{ marginTop: 15, marginBottom: 15 }} onPress={()=> this.submitAnswer('true')}>
                                  <Text>Correct</Text>
                                 </Button>
                                  {/*<Button block dark style={{ marginTop: 15, marginBottom: 15}} onPress={this.onShowAnswer}>
                                 <Text>Show Answer</Text>
                                 </Button>*/}
                          </Animated.View>
                        </Body>
                        </CardItem>
                         <Animated.View  style={[rotateTextStyle, fadeStyle]}>
                        <CardItem footer>
                            <Text>{number} | {decks[deck].questions.length}</Text>
                        </CardItem>
                        </Animated.View>
                     </Card>
                     </Animated.View>
                 </Content>

    )}

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

export default CardCwithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(CardC))