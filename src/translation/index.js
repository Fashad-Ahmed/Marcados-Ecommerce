// export const translation_base_url = 'https://spreadsheets.google.com/feeds/cells'
// export const translation_endpoint = 'public/full?alt=json'
export const translation_base_url =
  "https://sheets.googleapis.com/v4/spreadsheets";
export const translation_endpoint = "values";
// export const translation_hex = '1wYwTnfDQ9FPYY94Lf4gfyYmdZnG1DJhWMOGuhedq6KU';
export const translation_hex = "1juDdicd7lBkoKwWwwTnmKnXltrBnGAVAedljyTc6mMY";
export const translation_key = "AIzaSyASQNFBZ28tnBDSlrMNsAlVk8K7hkHwbMc";
export const translation_sheets = {
  label: "labels",
  messages: "messages",
};
export const translation_not_filled = "not_filled";
import i18n from "i18n-js";
import { I18nManager, Platform } from "react-native";
import locales from "./localeString.json";
import toasts from "./toastMessages.json";
var toastMessages = toasts;
var localeString = locales;

export const requestWithSheetNumber = async number => {
  const url = `${translation_base_url}/${translation_hex}/${translation_endpoint}/${number}?key=${translation_key}`;
  try {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    if (jsonResponse.values) {
      const entries = jsonResponse.values;
      return Promise.resolve(entries);
    }
    return Promise.reject(false);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getFormattedTranslationObjects = async (target, source) => {
  try {
    for (var i = 1; i < source.length; i++) {
      if (source[i]?.length % 4 != 0) {
        break;
      }
      var keyEntry = source[i][0]; // objects from excel sheet
      var enEntry = source[i][1]; // objects from excel sheet
      var arEntry = source[i][2]; // objects from excel sheet
      var frEntry = source[i][3]; // objects from excel sheet
      var key = keyEntry; // will store values from excel objects
      var en = enEntry; // will store values from excel objects
      var ar = arEntry; // will store values from excel objects
      var fr = frEntry; // will store values from excel objects
      var targetObject = target[key];
      if (targetObject) {
        if (en === translation_not_filled) {
          if (targetObject.en) {
            en = targetObject.en;
          }
        }
        if (ar === translation_not_filled) {
          if (targetObject.en != translation_not_filled) {
            ar = en;
          }
        }
        if (fr === translation_not_filled) {
          if (targetObject.fr != translation_not_filled) {
            fr = en;
          }
        }
        var translationObject = {
          ar,
          en,
          fr,
        };
        target[key] = translationObject;
      } else {
        break;
      }
    }

    return Promise.resolve(target);
  } catch (e) {
    return Promise.reject(false);
  }
};
export const initializeTranslation = async () => {
  try {
    const labelSheet = await requestWithSheetNumber(translation_sheets.label);
    localeString = await getFormattedTranslationObjects(
      localeString,
      labelSheet,
    );
    const messageSheet = await requestWithSheetNumber(
      translation_sheets.messages,
    );
    toastMessages = await getFormattedTranslationObjects(
      toastMessages,
      messageSheet,
    );
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};
export const getTranslatedMessage = () => {
  return toastMessages;
};
export const getLocalizedString = () => {
  return localeString;
};
export const setI18nConfig = (languageTag = "en", isRTL = false) => {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  i18n.locale = languageTag;
};
export const setLanguage = (languageTag, isRTL) => {
  // AppState.removeEventListener('change');
  // RNLocalize.removeEventListener('change');
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  i18n.locale = languageTag;
};

export const getLocale = () => {
  return i18n.locale;
};
export const radius = (vertical, horizontal) => {
  if (vertical.toUpperCase() === "TOP") {
    vertical = "Top";
  } else if (vertical.toUpperCase() === "BOTTOM") {
    vertical = "Bottom";
  }
  if (I18nManager.isRTL && Platform.OS === "android") {
    if (horizontal.toUpperCase() === "LEFT") {
      horizontal = "Right";
    } else if (horizontal.toUpperCase() === "RIGHT") {
      horizontal = "Left";
    }
  } else {
    if (horizontal.toUpperCase() === "LEFT") {
      horizontal = "Left";
    } else if (horizontal.toUpperCase() === "RIGHT") {
      horizontal = "Right";
    }
  }
  return `border${vertical}${horizontal}Radius`;
};
export const swapRightLeft = () => {
  if (I18nManager.isRTL) {
    return "Left";
  } else {
    return "Right";
  }
};

export const swapLeftRight = () => {
  if (!I18nManager.isRTL) {
    return "Left";
  } else {
    return "Right";
  }
};
export const isRTL = () => I18nManager.isRTL;
