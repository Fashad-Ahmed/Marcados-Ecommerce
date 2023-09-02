// import store from "../store";
// import Toast from "react-native-toast";
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from "react-native-permissions";
import { EventRegister } from "react-native-event-listeners";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import Toast, {DURATION} from 'react-native-easy-toast'
const TAG = "__API__";
export const LOG = (label, data) => {
  // if (__DEV__) {
  //   //console.log(TAG + `__${label}__ :`, data);
  // }
};

export const showToast = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const infoToast = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
// export const showGlobalToast = (msg) => {};
export const presentToast = (message) => {
  //console.log('=== in  presentToast ', message);
  setTimeout(() => {
    infoToast(message);
  }, 500);

  // EventRegister.emit(events.showToast, getMessage(message))
};
export const handleResponse = ({ response, jsonResponse }) => {
  //console.log('response.status : ', response.status);

  switch (response.status) {
    case 200:
    case 201: {
      if (jsonResponse.hasOwnProperty("error")) {
        if (jsonResponse.error != false) {
          const message = getMessage(jsonResponse);
          return Promise.reject(message);
        } else {
          return Promise.resolve(jsonResponse);
        }
      } else {
        return Promise.resolve(jsonResponse);
      }
      break;
    }
    case 401: {
      // if(logoutEvent != null){
      //   logoutEvent()
      // }
      if (jsonResponse?.error?.email) {
        const message = getMessage(jsonResponse?.error?.email);
        return Promise.reject(message);
      } else {
        const message = getMessage(jsonResponse);
        return Promise.reject(message);
      }
    }
    default: {
      const message = getMessage(jsonResponse);
      return Promise.reject(message);
    }
  }
};
export const performNetworkRequest = async (url, configs) => {
  log("performNetworkRequest", "_______");
  console.log("url", url);
  console.log("configs", configs);
  //console.log('url', url);
  url = encodeURI(url);
  //console.log('url: ', url);
  //console.log('configs', configs);
  try {
    const response = await fetch(url, configs);
    console.log("response", response);
    // log('response', response);
    if (response?.status === 403) {
      EventRegister.emit("force logout");
    }
    const jsonResponse = await response.json();
    console.log("performNetworkRequest response", {
      jsonResponse,
      url,
      configs,
    });
    return Promise.resolve({ response, jsonResponse });
  } catch (e) {
    log("error", e);
    return Promise.reject(e);
  }
};
export const log = (label, data) => {
  // if (__DEV__) {
  //   // //console.log(TAG + `__${label}__ :`, data);
  // }
};
export const message = "Something went wrong";
export const getMessage = (json) => {
  //console.log('getMessage : ', json);
  switch (typeof json) {
    case "string": {
      return json;
    }
    case "object": {
      if (Array.isArray(json)) {
        var data = json[0];
        return getMessage(data);
      } else {
        if (json.errors) {
          const data = json.errors;
          if (typeof data === "object") {
            const values = Object.values(data);
            return getMessage(values);
          } else {
            return getMessage(data);
          }
        } else {
          if (json.message) {
            return getMessage(json.message);
          } else if (json.error) {
            return getMessage(json.error);
          } else {
            return message;
          }
        }
      }
    }
    default: {
      return message;
    }
  }
};

export const jsonToFormdata = (data) => {
  //saadia's form data func //formatData

  var form_data = new FormData();

  for (var key in data) {
    if (Array.isArray(data[key])) {
      var i = 0;

      var datakey = data[key];

      for (var newkey in datakey) {
        if (datakey[newkey].name) {
          form_data.append(key + `[${i}][name]`, datakey[newkey].name);

          i++;
        } else {
          form_data.append(key + `[${i}]`, datakey[newkey]);

          i++;
        }
      }
    } else if (typeof data[key] == "object") {
      form_data.append(key, data[key]);
    } else {
      form_data.append(key, data[key]);
    }
  }

  return form_data;
};

// export const getConfigs = (method, body, formData = true) => {
//   var headers = {
//     Accept: "application/json",
//     // 'X-Requested-With': 'XMLHttpRequest',
//     "Content-Type": "application/json",
//   };
//   if (formData == true) {
//     headers["Content-Type"] = "multipart/form-data";
//   }
//   const data = store.getState()?.auth?.userToken; // Access state directly from the Redux store

//   console.log("dataGETCONFIGS ======================>", data);
//   if (data) {
//     //console.log(data.authReducer?.token, 'authReducer.token');
//     console.log("authorization?");
//     headers["Authorization"] = "Bearer " + data;
//   }
//   var configs = {
//     method: method,
//     headers: headers,
//   };
//   if (body) {
//     if (method == "POST" || method == "PUT") {
//       if (formData == true) {
//         configs["body"] = jsonToFormdata(body);
//       } else {
//         configs["body"] = JSON.stringify(body);
//       }
//     }
//   }
//   //console.log(configs, 'helloConfigs');
//   return configs;
// };
export const dataToQueryParameter = (data) => {
  if (typeof data === "object") {
    if (!Array.isArray(data)) {
      var params = "?";
      const dataArray = Object.entries(data);
      if (dataArray.length > 0) {
        dataArray.forEach((entry, index) => {
          const [key, value] = entry;
          if (typeof value === "object") {
            Object.entries(value).forEach((nestedEntry) => {
              const [nestedKey, nestedValue] = nestedEntry;
              // var amp = index < dataArray.length - 1 ? '&' : '';
              params = `${params}&${key}[${nestedKey}]=${nestedValue}`;
            });
          } else {
            var amp = index < dataArray.length - 1 ? "&" : "";
            params = `${params}&${entry[0]}=${entry[1]}`;
          }
        });
        return params;
      }
    }
  } else if (typeof data === "string") {
    return data;
  }
  return "";
};

export const checkCameraPermission = async () => {
  // try {
  //   const permission =
  //     Platform.OS == "android"
  //       ? PERMISSIONS.ANDROID.CAMERA
  //       : PERMISSIONS.IOS.CAMERA;

  //   await checkPermission(permission);
  //   return;
  // } catch (error) {
  //   // // show toast
  //   // console.log('here itttt ?');
  //   showToast(error);
  //   throw new Error(error);
  // }
};

const checkPermission = async (permission) => {
  const result = await check(permission);

  return new Promise(async (resolve, reject) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        return reject(RESULTS.UNAVAILABLE);

      case RESULTS.DENIED:
        try {
          const request_result = await getPermission(permission);
          return resolve(request_result);
        } catch (error) {
          return reject(error);
        }

      case RESULTS.GRANTED:
        return resolve(RESULTS.GRANTED);

      case RESULTS.BLOCKED:
        setTimeout(() => {
          // Linking(openSettings());
        }, 500);
        return reject(RESULTS.BLOCKED);
    }
  });
};

const getPermission = async (permission) => {
  // console.log('did we reached here ?');
  const result = await request(permission);
  // console.log(result);
  return new Promise(async (resolve, reject) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        return reject(RESULTS.UNAVAILABLE);

      case RESULTS.DENIED:
        return reject(RESULTS.DENIED);

      case RESULTS.GRANTED:
        return resolve(RESULTS.GRANTED);

      case RESULTS.BLOCKED:
        return reject(RESULTS.BLOCKED);
    }
  });
};

export const stringReduce = (text, count) => {
  return text.slice(0, count) + (text.length > count ? "..." : "");
};
