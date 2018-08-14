import React, { Component } from "react";
import { Font, AppLoading } from "expo";
import {
  Container,
  Header,
  Content,
  Tab,
  Tabs,
  Text,
  Left,
  Body,
  Right,
  Title
} from "native-base";
import ListDecks from "./ListDecks";
import NewDeck from "./NewDeck";

export default class TabsPannel extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  render() {
    return {
      ...(this.state.loading ? (
        <Text>Loading</Text>
      ) : (
        <Container>
          <Header hasTabs>
            <Left />
            <Body>
              <Title>FlashCards</Title>
            </Body>
            <Right />
          </Header>
          <Tabs>
            <Tab heading="Decks">
              <ListDecks />
            </Tab>
            <Tab heading="New Deck">
              <NewDeck />
            </Tab>
          </Tabs>
        </Container>
      ))
    };
  }
}
