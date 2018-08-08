import {AsyncStorage} from 'react-native'
import { Notifications, Permissions } from 'expo'

const FLASHCARDS_STORAGE_KEY = 'flashcards: decks'
const NOTIFICATION_KEY = 'flashcards: notifications'

const initialData = {
    Redux: {
        title: 'Redux',
        questions: [
            {
            question: 'Redux is great for mutating the state?',
            answer: 'Yes, it\'s recomended by the Redux team',
            correctAnswer: 'false'
        },
            {
                question: 'Redux is used to help manage the state?',
                answer: 'Yes, it/s use for managing the state.',
                correctAnswer: 'true'
            },
            {
                question: 'Redux was created by Angular Team?',
                answer: 'That/s true.',
                correctAnswer: 'false'
            }
             ]
    },
   Javascript: {
       title: 'Javascript',
        questions: [
            {
            question: 'In ES5 you can use arrow functions?',
            answer: 'Yes, you must use arrow functions all the time.',
            correctAnswer: 'false'
        },
        {
            question:'ES6 was release in 1998?',
            answer: 'No.',
            correctAnswer: 'true'
        }
        ]
    },
    CSS: {
        title: 'CSS',
        questions: [
            {
                question: 'CSS is used to styling web components?',
                answer: 'Yes, it/s used for styling components',
                correctAnswer: 'true'
        }
        ]
    }
}

export const getData = () => {
    return initialData
}
 
export function getDecks(){
  // return AsyncStorage.clear() // use this to clear AsyncStorage
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(results => {
            if(results === null) {
                AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData))
                return initialData
            } else {
                return JSON.parse(results)
            }
        })
} 

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))
}

export function addCardToDeck(name, card){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => JSON.parse(results)).then(results => {
        results[name].questions.push(card)
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results))
        return results
    })
}

// Notificiation session for notify the user everyday

// export function clearLocalNotification () {
//   return AsyncStorage.removeItem(NOTIFICATION_KEY)
//     .then(Notifications.cancelAllScheduledNotificationAsync)
// }

// function createNotification () {
//   return {
//     title: 'Log your stats!',
//     body: "👋 don't forget to log your stats for today!",
//     ios: {
//       sound: true,
//     },
//     android: {
//       sound: true,
//       priority: 'high',
//       sticky: false,
//       vibrate: true,
//     }
//   }
// }

// export function setLocalNotification () {
//   AsyncStorage.getItem(NOTIFICATION_KEY)
//     .then(JSON.parse)
//     .then((data) => {
//       if (data === null) {
//         Permissions.askAsync(Permissions.NOTIFICATIONS)
//           .then(({ status }) => {
//             if (status === 'granted') {
//               Notifications.cancelAllScheduledNotificationAsync()

//               let tomorrow = new Date()
//               tomorrow.setDate(tomorrow.getDate() + 1)
//               tomorrow.setHours(20)
//               tomorrow.setMintutes(0)

//               Notifications.scheduleLocalNotificationAsync(
//                 createNotification(),
//                 {
//                   time: tomorrow,
//                   repeat: 'day',
//                 }
//               )

//               AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
//             }
//           })
//       }
//     })
// }



// let t = new Date();
// t.setSeconds(t.getSeconds() + 10);
// const schedulingOptions = {
//     time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
//     repeat: 'repeat'
//   };

// function createNotification () {
//   return {
//     title: 'Log your stats!',
//     body: "👋 don't forget to log your stats for today!",
//     ios: {
//       sound: true,
//     },
//     android: {
//       sound: true,
//       priority: 'high',
//       sticky: false,
//       vibrate: true,
//     }
//   }
// }

// export function setLocalNotification() {
//     let result =    
//   Permissions.askAsync(Permissions.NOTIFICATIONS);
//   if (Constants.lisDevice && resut.status === 'granted') {
//    console.log('Notification permissions granted.')
//   }
//     Notifications.scheduleLocalNotificationAsync(createNotification, schedulingOptions);

// }