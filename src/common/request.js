import axios from 'axios';
import qs from 'qs';

export const SUCCESS_BIZ_CODE = 0;

const BASE = '';
const FORMAT_ENCODE = 'RFC3986';
const WITH_BODY_REQUESTS = ['put', 'post', 'patch'];

const fetch = (options) => {
  let {
    url,
    method = 'get',
  } = options;
  const {
    data,
    ...restOptions
  } = options;

  url = BASE + url;
  method = method.toLowerCase();

  if (WITH_BODY_REQUESTS.includes(method)) {
    return axios({
      url,
      method,
      data,
      transformRequest: [(data) => {
        if (!(data instanceof FormData)) {
          return qs.stringify(data, { format: FORMAT_ENCODE });
        }
        return data;
      }],
      ...restOptions,
    });
  }
  return axios({
    url,
    method,
    params: data,
    paramsSerializer(params) {
      return qs.stringify(params, { format: FORMAT_ENCODE });
    },
    ...restOptions,
  });
};

export default function request(options) {
  return fetch(options)
    .then((response) => {
      const { status: statusCode, statusText, data: resData } = response;
      const { status: bizCode, msg, data } = resData;
      const meta = {
        success: SUCCESS_BIZ_CODE === bizCode,
        message: msg || statusText,
        statusCode,
        bizCode,
      };
      return {
        ...meta,
        data,
      };
    })
    .catch((error) => {
      const { response } = error;
      let msg;
      let statusCode;
      if (response && response instanceof Object) {
        const { status, statusText, data } = response;
        const { message } = data;
        statusCode = response.status;
        msg = message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }
      return {
        success: false,
        message: msg,
        statusCode,
      };
    });
}
