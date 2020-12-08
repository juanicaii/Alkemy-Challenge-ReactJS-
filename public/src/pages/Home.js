import Cards from "../components/cards";
import styles from "./Home.module.css";
import Title from "../components/title";
import {
  faMoneyBill,
  faReceipt,
  faCashRegister,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import Table from "../components/table";
import useHttp from "../hooks/useHttp";
import useGetTotal from "../hooks/useGetTotal";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import isLogin from "../store/";
import config from "../react.config";

import Loading from "../components/Loading";

export default function HomePage() {
  const [logged, setLogged] = useRecoilState(isLogin);
  const [query, setQuery] = useState("");
  const [category] = useHttp(
    `/api/category${logged.logged ? `?userId=${logged.user.id} &` : ""}`,
    "get"
  );
  const [exchange] = useHttp(
    `/api/balance${logged.logged ? `?userId=${logged.user.id} &` : ""}${query}`,
    "get"
  );
  console.log(logged);
  const [totalBalance] = useGetTotal(
    `/api/balance/total${logged.logged ? `?userId=${logged.user.id}` : ""}`,
    "get"
  );
  const [totalIncome] = useGetTotal(
    `/api/moneyExchange/total/1${
      logged.logged ? `?userId=${logged.user.id}` : ""
    }`,
    "get"
  );
  const [totalOutflow] = useGetTotal(
    `/api/moneyExchange/total/2${
      logged.logged ? `?userId=${logged.user.id}` : ""
    }`,
    "get"
  );

  var info = {};

  if (exchange && category && totalBalance && totalIncome && totalOutflow) {
    info = {
      balance: totalBalance.TotalBalance ? totalBalance.TotalBalance : 0,
      ingresos: totalIncome.TotalIncome ? totalIncome.TotalIncome : 0,
      egresos: totalOutflow.TotalOutflow ? totalOutflow.TotalOutflow : 0,
    };
    return (
      <>
        <header className={styles.header}>
          <div>
            {" "}
            <h1>Alkemy Labs Challenge</h1>
            {!logged.logged ? (
              <div className={styles.login}>
                <div className={styles.iconLogin}>
                  <FontAwesomeIcon icon={faUser} />
                  <Link to={"/login"}> Log in</Link>
                </div>
                <div className={styles.iconLogin}>
                  <FontAwesomeIcon icon={faUserPlus} />
                  <Link to={"/register"}> Register</Link>
                </div>
              </div>
            ) : (
              <div className={styles.login}>
                <div className={styles.iconLogin}>
                  <FontAwesomeIcon icon={faUser} />
                  <a
                    onClick={() => {
                      axios
                        .get(`${config.URL_HOST}/api/users/logout`)
                        .then((res) => {
                          console.log(res);
                        });
                    }}
                  >
                    {" "}
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
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
                {category.map((cate, i) => {
                  return (
                    <p
                      key={i}
                      onClick={async () => {
                        if (logged.logged) {
                          setQuery(`category=${cate.id}`);
                        } else {
                          setQuery(`/?category=${cate.id}`);
                        }
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
                <Table query={setQuery} data={exchange.rows} />
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
