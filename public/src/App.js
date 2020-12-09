import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { Redirect } from "react-router-dom";
import isLogin from "./store/";
// ROUTES
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

function App() {
  const [loading, setLoading] = useState(false);

  let history = useHistory();
  return (
    <Router history={history}>
      <RecoilRoot>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
          </Switch>
        </div>
      </RecoilRoot>
    </Router>
  );
}

export default App;
