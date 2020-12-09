import React, { useEffect, useState } from "react";

import styles from "./Input.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Input = React.forwardRef(
  (
    { type, name, placeholder, error, icon, messageError, disabled, value },
    ref
  ) => {
    const [color, setColor] = useState("aquamarine");
    const [displayIcon, setDisplayIcon] = useState(icon ? true : false);
    var style = {
      border: `2px solid ${color}`,
    };

    useEffect(() => {
      if (error) {
        setColor("red");
      } else {
        setColor("aquamarine");
      }
    }, [error]);
    return (
      <div>
        {displayIcon ? (
          <FontAwesomeIcon className={styles.formIcon} size="sm" icon={icon} />
        ) : (
          ""
        )}
        <input
          onChange={(e) => {
            if (icon) {
              if (e.target.value.length > 0) {
                setDisplayIcon(false);
              } else {
                setDisplayIcon(true);
              }
            }
          }}
          disabled={disabled}
          defaultValue={value}
          onFocus={() => {}}
          name={name}
          ref={ref}
          type={type}
          style={style}
          placeholder={placeholder}
          className={`${styles.input}`}
        />
        {error ? <p className={styles.errorText}>{messageError}</p> : ""}
      </div>
    );
  }
);

export default Input;
