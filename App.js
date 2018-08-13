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
import {setLocalNotification} from './utils/api'
import { Notifications, Permissions } from 'expo'

export default class App extends React.Component {

  async componentDidMount() {
  let result = await   
  Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (Constants.isDevice && result.status === 'granted') {
   return setLocalNotification()
// console.log(result.status)
  }
 //  setLocalNotification
}
  
  render() {

//     // let t = new Date();
//     // t.setSeconds(t.getSeconds() + 10);
//     let tomorrow = new Date()
//             //  tomorrow.setDate(tomorrow.getDate() + 1)
//        tomorrow.setDate(tomorrow.getDate())
//        tomorrow.setHours(18)
//        tomorrow.setMinutes(6)
 
//       console.log(tomorrow)
//   const schedulingOptions = {
//     time: tomorrow, 
//     repeat: 'hour'
//   };

//   const localNotification = {
//     title: 'You dont\' had study today!!! why',
//     body: 'Study is very important for your future!!!', 
//     ios: { 
//       sound: true 
//     },
// android: 
//     {
//       sound: true, 
//       priority: 'high', 
//       sticky: false, 
//       vibrate: true
//     }
//   };
//    Notifications.cancelAllScheduledNotificationsAsync();
//     Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);


 
//   const schedulingOptions = {
//     time: t, 
//     repeat: 'hour'
//   };

//   const localNotification = {
//     title: 'You dont\' had study today!!! ',
//     body: 'Study is very important for your future!!!', 
//     ios: { 
//       sound: true 
//     },
// android: 
//     {
//       sound: true, 
//       priority: 'high', 
//       sticky: false, 
//       vibrate: true
//     }
//   };
//    Notifications.cancelAllScheduledNotificationsAsync();
//     Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);

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
