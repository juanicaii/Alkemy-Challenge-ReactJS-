import { useState, useEffect } from "react";
import axios from "axios";
import config from "../react.config";
export default function useHttp(url, method, body) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      method: method,
      url: `${config.URL_HOST}${url}`,
      data: body,
    }).then((res) => {
      setLoading(false);
      setData(res.data.content);
    });
  }, [url]);

  return [data];
}
