import { AsyncStorage } from 'react-native';

export const LocalStorage = {
  save: (key, value) => {
    try {
      AsyncStorage.setItem(key, JSON.stringify({
        value: value,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  load: (key) => {
    return new Promise(async (fulfill, reject) => {
      try {
        const valueStored = await AsyncStorage.getItem(key);

        if (valueStored === null) {
          return;
        }

        valueObject = JSON.parse(valueStored);

        fulfill(valueObject.value);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  },
  unload: (key) => {
    return new Promise(async (fulfill, reject) => {
      try {
        await AsyncStorage.removeItem(key);
        console.log(AsyncStorage.getAllKeys());

        fulfill();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  },
};
