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

import { useState, useEffect, React } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import isLogin from "../store/";
import config from "../react.config";
import Toast from "../components/Alert/toast";
import Loading from "../components/Loading";

export default function HomePage() {
  const [logged, setLogged] = useRecoilState(isLogin);
  const [reload, setReload] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    axios.get(`${config.URL_HOST}/api/users/islogin`).then((res) => {
      if (res.data.content.logged) {
        setLogged(res.data.content);
      }
    });
  }, []);
  const [exchange] = useHttp(
    `/api/balance${logged.logged ? `?userId=${logged.user.id} &` : ""}${query}`,
    "get",
    {},
    reload
  );

  const [totalIncome] = useGetTotal(
    `/api/moneyExchange/total/1${
      logged.logged ? `?userId=${logged.user.id}` : ""
    }`,
    "get",
    {},
    reload
  );
  const [totalOutflow] = useGetTotal(
    `/api/moneyExchange/total/2${
      logged.logged ? `?userId=${logged.user.id}` : ""
    }`,
    "get",
    {},
    reload
  );

  if (exchange && totalIncome && totalOutflow) {
    return (
      <div>
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
                      setReload(true);
                      axios
                        .get(`${config.URL_HOST}/api/users/logout`)
                        .then((res) => {
                          if (res.data.content.logout) {
                            setLogged({ logged: false, user: null });
                            Toast("See you soon");
                          }
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
                info={totalIncome.TotalIncome ? totalIncome.TotalIncome : 0}
                color={"green"}
              />
            </div>
            <div className={styles.balance}>
              <Cards
                name="Balance"
                icon={faCashRegister}
                info={totalIncome.TotalIncome - totalOutflow.TotalOutflow}
                color={"black"}
              />
            </div>
            <div className={styles.card}>
              <Cards
                name="Outflow"
                icon={faReceipt}
                info={totalOutflow.TotalOutflow ? totalOutflow.TotalOutflow : 0}
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
                {exchange.categories.map((cate, i) => {
                  console.log();
                  return (
                    <p
                      key={i}
                      onClick={async () => {
                        if (logged.logged) {
                          setQuery(`category=${cate["category.id"]}`);
                        } else {
                          setQuery(`/?category=${cate["category.id"]}`);
                        }
                      }}
                      className={styles.category}
                    >
                      {cate["category.name"]}
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
                <Table
                  logged={logged}
                  query={setReload}
                  data={exchange.exchange.rows}
                />
              </div>
            </div>
          </section>
        </div>
        <footer className={styles.footer}>
          <FontAwesomeIcon
            className={styles.icon}
            icon={faLinkedin}
            size="3x"
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/juanignacioseijas/",
                "_blank"
              );
            }}
          />
          <FontAwesomeIcon
            onClick={() => {
              window.open("https://github.com/juaniseijas00", "_blank");
            }}
            className={styles.icon}
            icon={faGithub}
            size="3x"
          />
        </footer>
      </div>
    );
  } else {
    return <Loading />;
  }
}
