import React, {Component} from 'react';
import { View, Dimensions, Alert, Animated } from 'react-native';
import { withRouter} from 'react-router-native'
import { Font, AppLoading } from "expo";
import { Container, Header, Content, Text, Left, Body, Title, Right, Card, CardItem, Button, Icon, } from 'native-base';


export class CardC extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showAnswer: true,
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
    
    render(){
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

      var data = {
      deck: 'Redux',
      question: 'Redux is responsabile to Manage the State?',
      answer: 'No, it\'s used for funny moments',
      currentQuestion: 1,
      remainingQuestions:4
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
                         <Animated.Text style={[rotateTextStyle]}>{data.deck}</Animated.Text>
                        </CardItem>
                        <CardItem>
                        <Body style={{justifyContent: 'center',alignItems: 'center',}}>
                            <Animated.Text style={[fadeStyle, rotateTextStyle]}>
                                    {data.question}
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
                            <Text>{data.currentQuestion} | {data.remainingQuestions}</Text>
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
                        <Animated.Text style={[ rotateTextStyle]}>{data.deck}</Animated.Text>
                        </CardItem>
                        <CardItem>
                        <Body style={{justifyContent: 'center',alignItems: 'center',}}>
                            <Animated.Text style={[fadeStyle, rotateTextStyle]}>
                                    {data.answer}
                            </Animated.Text>
                     <Animated.View  style={[rotateTextStyle, fadeStyle, {flex: 1, flexDirection: 'row'}]}>
                             <Button block danger style={{ marginTop: 15, marginBottom: 15, marginRight: 15}} onPress={this.onShowAnswer}>
                                  <Text>Incorrect</Text>
                                 </Button>
                                 <Button block success style={{ marginTop: 15, marginBottom: 15 }} onPress={this.onShowAnswer}>
                                  <Text>Correct</Text>
                                 </Button>
                          </Animated.View>
                        </Body>
                        </CardItem>
                         <Animated.View  style={[rotateTextStyle, fadeStyle]}>
                        <CardItem footer>
                            <Text>{data.currentQuestion} | {data.remainingQuestions}</Text>
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

export default CardCwithRouter = withRouter(CardC)