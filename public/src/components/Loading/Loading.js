import { useState, useEffect } from "react";
export default function Loading(props) {
  const [dimesions, setDimensions] = useState({});
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  useEffect(() => {
    const dimesions = getWindowDimensions();
    setDimensions(dimesions);
  }, []);
  const styles = {
    height: dimesions.height,
    width: "100%",
    display: "table",
  };

  return (
    <div className=" text-center " style={styles} role="status">
      <div
        style={{
          display: "table-cell",
          verticalAlign: "middle",
          textAlign: "center",
          margin: "0 auto",
          width: "1em",
          heigth: "1em",
        }}
      >
        <img src="./loading.svg" />
      </div>
    </div>
  );
}
