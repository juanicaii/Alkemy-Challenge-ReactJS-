import styles from "./Button.module.css";
import { Spinner } from "react-bootstrap";
export default function Button({ children, submit, loading, error, type }) {
  return (
    <button
      onClick={submit}
      disabled={error ? true : false}
      type={type}
      className={styles.button}
    >
      {" "}
      {loading ? <Spinner animation="border" variant="dark" /> : children}
    </button>
  );
}
