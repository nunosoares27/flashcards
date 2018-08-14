import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import { Constants } from "expo";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import MainReducer from "./components/reducers/MainReducer";
import Deck from "./components/Deck";
import Tabs from "./components/Tabs";
import CardC from "./components/CardC";
import CreateCard from "./components/CreateCard";
import { setLocalNotification } from "./utils/api";
import { Notifications, Permissions } from "expo";

export default class App extends React.Component {
  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === "granted") {
      return setLocalNotification();
    }
  }
  render() {
    const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(
      createStore
    );
    return (
      <Provider store={createStoreWithMiddleware(MainReducer)}>
        <NativeRouter>
          <View style={styles.container}>
            <Route exact path="/" component={Tabs} />
            <Route exact path="/deck/:id" component={Deck} />
            <Route exact path="/quizz/:id" component={CardC} />
            <Route exact path="/addcard/:deck" component={CreateCard} />
          </View>
        </NativeRouter>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
