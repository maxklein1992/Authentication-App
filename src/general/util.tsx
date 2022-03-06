import * as SecureStore from "expo-secure-store";

export const getData = async (key: string) => {
  try {
    const localToken = (await SecureStore.getItemAsync(key)) as string;
    return localToken;
  } catch (e) {
    // saving error
  }
};

export const deleteData = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (e) {
    // saving error
  }
};

export const storeData = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    // saving error
  }
};
