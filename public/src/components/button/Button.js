import styles from "./Button.module.css";
import { Spinner } from "react-bootstrap";
export default function Button({ children, submit, loading, error }) {
  return (
    <button
      onClick={submit}
      disabled={error ? true : false}
      type="submit"
      className={styles.button}
    >
      {" "}
      {loading ? <Spinner animation="border" variant="dark" /> : children}
    </button>
  );
}
