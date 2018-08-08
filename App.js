import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route} from 'react-router-native'
import { Constants } from 'expo'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import ReduxPromise from "redux-promise";
import MainReducer from './components/reducers/MainReducer'
import Deck from './components/Deck'
import Tabs from './components/Tabs'
import CardC from './components/CardC'
import CreateCard from './components/CreateCard'
// import {setLocalNotification} from './utils/api'
import { Notifications, Permissions } from 'expo'

export default class App extends React.Component {

  async componentDidMount() {
  let result = await   
  Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.isDevice && result.status === 'granted') {
   console.log('Notification permissions granted.')
  }
}
  
  render() {

    let t = new Date();
    t.setSeconds(t.getSeconds() + 10);
  const schedulingOptions = {
    time: t, 
    repeat: 'hour'
  };

  const localNotification = {
    title: 'You dont\' study today!!! ',
    body: 'Study is very important for your future!!!', // (string) — body text of the notification.
    ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
android: // (optional) (object) — notification configuration specific to Android.
    {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      //icon (optional) (string) — URL of icon to display in notification drawer.
      //color (optional) (string) — color of the notification icon in notification drawer.
      priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    }
  };
Notifications.cancelAllScheduledNotificationsAsync();
  Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);


    const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(
      createStore
    );
    return (<Provider  store={createStoreWithMiddleware(MainReducer)}>
      <NativeRouter>
      <View style={styles.container}>
         <Route exact path="/" component={Tabs}/>
         <Route exact path="/deck/:id" component={Deck} />
         <Route exact path="/quizz/:id"component={CardC} />
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
