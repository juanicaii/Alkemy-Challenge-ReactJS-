import { useState, useEffect } from "react";
import axios from "axios";

export default function useHttp(url, method, body) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      method: method,
      url: url,
      data: body,
    }).then((res) => {
      console.log(res);
      setLoading(false);
      setData(res.data.content);
    });
  }, [url]);

  return [data];
}
