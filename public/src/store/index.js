import { atom } from "recoil";

const IsLogin = atom({
  key: "isLogin", // unique ID (with respect to other atoms/selectors)
  default: { logged: false, user: null }, // default value (aka initial value)
});

export default IsLogin;
