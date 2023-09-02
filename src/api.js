import { base_url, custom_url, banner_url } from "./redux/config";
import {
  dataToQueryParameter,
  getMessage,
  handleResponse,
  performNetworkRequest,
} from "./redux/Api/HelperFunction";
// import store from "./redux/store";

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
export const getConfigs = (method, body, formData = true) => {
  var headers = {
    Accept: "application/json",
    // 'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/json",
  };
  if (formData == true) {
    headers["Content-Type"] = "multipart/form-data";
  }
  // const data = store.getState()?.user?.userToken; // Access state directly from the Redux store

  const data = localStorage.getItem("token");
  console.log("dataGETCONFIGS ======================>", data);
  if (data) {
    //console.log(data.authReducer?.token, 'authReducer.token');
    console.log("authorization?");
    headers["Authorization"] = "Bearer " + data;
  }
  var configs = {
    method: method,
    headers: headers,
  };
  if (body) {
    if (method == "POST" || method == "PUT") {
      if (formData == true) {
        configs["body"] = jsonToFormdata(body);
      } else {
        configs["body"] = JSON.stringify(body);
      }
    }
  }
  //console.log(configs, 'helloConfigs');
  return configs;
};

export const post = async (endpoint, body, formData, queryParams) => {
  const url = base_url + endpoint + dataToQueryParameter(queryParams);
  // console.log(url, 'the url is here');

  const configs = getConfigs("POST", body, formData);
  //console.log('log configs', configs);
  try {
    const networkResult = await performNetworkRequest(url, configs);
    console.log("log networkResult", networkResult);
    const result = await handleResponse(networkResult);
    //console.log('log  result', result);
    return Promise.resolve(result);
  } catch (e) {
    console.log("e == ", e);
    const message = getMessage(e);
    return Promise.reject(message);
  }
};

export const customPost = async (endpoint, body, formData, queryParams) => {
  //console.log(body, 'body');
  //console.log(queryParams, 'paramsHEre');
  const url = custom_url + endpoint + dataToQueryParameter(body);
  //console.log(url, 'the url is here');

  const configs = getConfigs("POST", body, formData);

  //console.log(configs, 'configsHere');
  try {
    const networkResult = await performNetworkRequest(url, configs);
    const result = await handleResponse(networkResult);

    return Promise.resolve(result);
  } catch (e) {
    //console.log('e == ', e);
    const message = getMessage(e);
    return Promise.reject(message);
  }
};

export const get = async (endpoint, queryParams) => {
  const url = base_url + endpoint + dataToQueryParameter(queryParams);
  const configs = getConfigs("GET");

  //console.log(
  //   'url',
  //   url,
  //   '  dataToQueryParameter(queryParams) ',
  //   dataToQueryParameter(queryParams),
  // );

  try {
    const networkResult = await performNetworkRequest(url, configs);
    const result = await handleResponse(networkResult);

    return Promise.resolve(result);
  } catch (e) {
    const message = getMessage(e);
    return Promise.reject(message);
  }
};

export const customDelete = async (endpoint, queryParams) => {
  const url = base_url + endpoint + dataToQueryParameter(queryParams);
  const configs = getConfigs("DELETE");

  //console.log(
  //   'url',
  //   url,
  //   '  dataToQueryParameter(queryParams) ',
  //   dataToQueryParameter(queryParams),
  // );

  try {
    const networkResult = await performNetworkRequest(url, configs);
    const result = await handleResponse(networkResult);

    return Promise.resolve(result);
  } catch (e) {
    const message = getMessage(e);
    return Promise.reject(message);
  }
};

export const customGet = async (endpoint, queryParams) => {
  const url = banner_url + endpoint + dataToQueryParameter(queryParams);
  const configs = getConfigs("GET");

  //console.log(
  //   'url',
  //   url,
  //   '  dataToQueryParameter(queryParams) ',
  //   dataToQueryParameter(queryParams),
  // );

  try {
    const networkResult = await performNetworkRequest(url, configs);
    const result = await handleResponse(networkResult);

    return Promise.resolve(result);
  } catch (e) {
    const message = getMessage(e);
    return Promise.reject(message);
  }
};

export const put = async (endpoint, body, formData, queryParams) => {
  const url = base_url + endpoint + dataToQueryParameter(queryParams);
  const configs = getConfigs("PUT", body, formData);
  try {
    const networkResult = await performNetworkRequest(url, configs);
    const result = await handleResponse(networkResult);
    return Promise.resolve(result);
  } catch (e) {
    const message = getMessage(e);
    return Promise.reject(message);
  }
};

export const deleteRequest = async (endpoint, queryParams) => {
  const url = base_url + endpoint + dataToQueryParameter(queryParams);
  const configs = getConfigs("DELETE");
  try {
    const networkResult = await performNetworkRequest(url, configs);
    const result = await handleResponse(networkResult);
    return Promise.resolve(result);
  } catch (e) {
    const message = getMessage(e);
    return Promise.reject(message);
  }
};
const Api = {
  post: post,
  get: get,
  put: put,
  delete: deleteRequest,
  customDelete: customDelete,
  customGet: customGet,
};
export default Api;
