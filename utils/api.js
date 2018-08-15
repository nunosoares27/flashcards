import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const FLASHCARDS_STORAGE_KEY = "flashcards: decks";
// const NOTIFICATION_KEY = "flashcards: notifications";

const initialData = {
  Redux: {
    title: "Redux",
    background: "#013243",
    questions: [
      {
        question: "Redux is great for mutating the state?",
        answer: "Yes, it's recomended by the Redux team",
        correctAnswer: "false"
      },
      {
        question: "Redux is used to help manage the state?",
        answer: "Yes, it/s use for managing the state.",
        correctAnswer: "true"
      },
      {
        question: "Redux was created by Angular Team?",
        answer: "That/s true.",
        correctAnswer: "false"
      }
    ]
  },
  Javascript: {
    title: "Javascript",
    background: "#8E44AD",
    questions: [
      {
        question: "In ES5 you can use arrow functions?",
        answer: "Yes, you must use arrow functions all the time.",
        correctAnswer: "false"
      },
      {
        question: "ES6 was release in 1998?",
        answer: "No.",
        correctAnswer: "true"
      }
    ]
  },
  CSS: {
    title: "CSS",
    background: "#4183D7",
    questions: [
      {
        question: "CSS is used to styling web components?",
        answer: "Yes, it/s used for styling components",
        correctAnswer: "true"
      }
    ]
  }
};

export const getData = () => {
  return initialData;
};

export function getDecks() {
  // return AsyncStorage.clear() // use this to clear AsyncStorage
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    if (results === null) {
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    } else {
      return JSON.parse(results);
    }
  });
}

export function saveDeckTitle(title, background) {
  return AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        background: background,
        questions: []
      }
    })
  );
}

export function addCardToDeck(name, card) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(results => {
      results[name].questions.push(card);
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results));
      return results;
    });
}

// Notificiation session for notify the user everyday

// export function clearLocalNotification() {
//   console.log("notifications canceled with success");
//   return Notifications.cancelAllScheduledNotificationsAsync();
// }

function createNotification() {
  return {
    title: "You need to study!",
    body: "👋 don't forget to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
    console.log('remove previous notification timer')
  Notifications.cancelAllScheduledNotificationsAsync();

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  tomorrow.setHours(19);
  tomorrow.setMinutes(12);

  console.log("add notification timer " + tomorrow);

  Notifications.scheduleLocalNotificationAsync(createNotification(), {
    time: tomorrow,
    repeat: "day"
  });
}
