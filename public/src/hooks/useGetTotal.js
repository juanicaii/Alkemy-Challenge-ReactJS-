import { useState, useEffect } from "react";
import axios from "axios";
import config from "../react.config";
export default function useHttp(url, method, body, reload) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios({
      method: method,
      url: `${config.URL_HOST}${url}`,
      data: body,
    }).then((res) => {
      setData(res.data.content.total[0]);
    });
  }, [reload]);

  return [data];
}
