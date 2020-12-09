import axios from "axios";
import config from "../react.config";
export default async function useHttp(url, method, body) {
  return axios({
    method: method,
    url: `${config.URL_HOST}${url}`,
    data: body,
    headers: { "content-type": "application/x-www-form-urlencoded" },
  }).then((res) => {
    console.log(res);
    return res.data.content;
  });
}
