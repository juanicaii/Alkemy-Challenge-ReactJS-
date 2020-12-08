import styles from "./cards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Cards({ name, info, icon, color }) {
  return (
    <div className={`${styles.card} ${styles.flip}`}>
      <div className={styles.flipInner}>
        <div
          style={{ backgroundColor: color }}
          className={`${styles.flipfront}`}
        >
          <FontAwesomeIcon
            className={` ${styles.icon}`}
            icon={icon}
            size="3x"
            color={"white"}
          />
          <h4>{name}</h4>
        </div>
        <div style={{ backgroundColor: color }} className={styles.flipback}>
          Total {name} : ${info}
        </div>
      </div>
    </div>
  );
}
