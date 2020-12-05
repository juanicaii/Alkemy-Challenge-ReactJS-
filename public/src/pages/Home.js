import Cards from "../components/cards";
import styles from "./Home.module.css";
import Title from "../components/title";
import {
  faMoneyBill,
  faReceipt,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Table from "../components/table";
import useHttp from "../hooks/useHttp";
import { useState } from "react";
import Loading from "../components/Loading";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category] = useHttp("http://localhost:8080/api/category", "get");
  const [exchange, setExchange] = useHttp(
    `http://localhost:8080/api/balance${query}`,
    "get"
  );

  const info = { balance: 1500, ingresos: 3000, egresos: 1500 };
  if (exchange && category) {
    return (
      <>
        <header className={styles.header}>
          <h1>Alkemy Labs Challenge</h1>
        </header>
        <div className={styles.container}>
          <div className={styles.containerCards}>
            <div className={styles.card}>
              <Cards
                name="Income"
                icon={faMoneyBill}
                info={info.ingresos}
                color={"green"}
              />
            </div>
            <div className={styles.balance}>
              <Cards
                name="Balance"
                icon={faCashRegister}
                info={info.balance}
                color={"black"}
              />
            </div>
            <div className={styles.card}>
              <Cards
                name="Outflow"
                icon={faReceipt}
                info={info.egresos}
                color={"red"}
              />
            </div>
          </div>
          {/* TABLE */}
          <section>
            <Title>Money Exchange</Title>

            <div className={styles.moneyexchange}>
              <div className={styles.category}>
                <h6>Categories</h6>
                {category.map((cate) => {
                  return (
                    <p
                      onClick={async () => {
                        setQuery(`/?category=${cate.id}`);
                      }}
                      className={styles.category}
                    >
                      {cate.name}
                    </p>
                  );
                })}
                <p
                  onClick={async () => {
                    setQuery("");
                  }}
                  className={styles.category}
                >
                  All
                </p>
              </div>
              <div className={styles.table}>
                <Table data={exchange.rows} />
              </div>
            </div>
          </section>
        </div>
        <footer className={styles.footer}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faLinkedin}
            size="3x"
          />
          <FontAwesomeIcon className={styles.icon} icon={faGithub} size="3x" />
        </footer>
      </>
    );
  } else {
    return <Loading />;
  }
}
