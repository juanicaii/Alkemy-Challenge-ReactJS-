import axios from "axios";
export default async function useHttp(url, method, body) {
  var res = await axios({
    method: method,
    url: url,
    data: body,
  });

  return res.data.content;
}
