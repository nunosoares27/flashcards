import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route} from 'react-router-native'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import ReduxPromise from "redux-promise";
import MainReducer from './components/reducers/MainReducer'
import Deck from './components/Deck'
import Tabs from './components/Tabs'
import CardC from './components/CardC'
import CreateCard from './components/CreateCard'

export default class App extends React.Component {
  
  render() {
    const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(
      createStore
    );
    return (<Provider  store={createStoreWithMiddleware(MainReducer)}>
      <NativeRouter>
      <View style={styles.container}>
         <Route exact path="/" component={Tabs}/>
         <Route exact path="/deck/:id" component={Deck} />
         <Route exact path="/quizz"component={CardC} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
