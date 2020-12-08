import styles from "./Login.module.css";
import Input from "../components/input";
import Button from "../components/button";
import { Redirect, Link, useHistory } from "react-router-dom";
import { faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import isLogin from "../store/";
import { useState } from "react";
import config from "../react.config";
import Axios from "axios";

import Alert from "../components/Alert/success";

export default function RegisterPage() {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm({ mode: "onSubmit" });
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useRecoilState(isLogin);
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (data) => {
    const userLogin = { email: data.email, password: data.password };

    if (data.email != undefined && data.password != undefined) {
      Axios({
        method: "post",
        url: `${config.URL_HOST}/api/users/register`,
        data: userLogin,
      }).then((res) => {
        if (res.data.content.created) {
          console.log(res);
          setDataUser({ logged: true, user: res.data.content.user });
          Alert("success", "Login System", res.data.message);

          setTimeout(() => {
            setRedirect(true);
          }, 1550);
        } else {
          Alert("error", "Login System", `${res.data.message}`);
        }
      });
    }
  };

  if (redirect) {
    return <Redirect to="/home" />;
  } else {
    return (
      <div>
        <div
          style={{
            background: ` linear-gradient(
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.5)
        ), linear-gradient(-1800.87deg, rgba(255, 255, 255, 5) 1.87%, rgba(196, 196, 196, 0) 20.33%),url(./loginFondo.jpg)`,
          }}
          className={styles.back}
        ></div>

        <div className={styles.login}>
          <div className={styles.titleLogin}>
            <h4>Sign Up</h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.body}>
              <div className={styles.bodyForm}>
                <div style={{ margin: "20px 0" }}>
                  <Input
                    ref={register({
                      required: {
                        value: true,
                        message: "The Email cannot be emty",
                      },
                    })}
                    type="email"
                    name="email"
                    icon={faEnvelope}
                    placeholder="Email"
                    error={errors.email ? errors.email : false}
                    messageError={errors.email && errors.email.message}
                  />
                </div>
                <div style={{ margin: "20px 0" }}>
                  <Input
                    ref={register({
                      minLength: {
                        value: 6,
                        message: "The password is to shoort",
                      },
                      required: {
                        value: true,
                        message: "The Email cannot be emty",
                      },
                    })}
                    type="password"
                    name="password"
                    icon={faKey}
                    placeholder="Password"
                    error={errors.password ? errors.password : false}
                    messageError={errors.password && errors.password.message}
                  />
                </div>
              </div>

              <div className={styles.button}>
                <Button loading={loading} submit={onSubmit}>
                  Sign Up
                </Button>
              </div>
              <div>
                <p>
                  Alredy have an account <Link to="/login"> Log in</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
