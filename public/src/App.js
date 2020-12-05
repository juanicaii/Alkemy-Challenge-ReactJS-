import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { RecoilRoot } from "recoil";
// ROUTES
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
function App() {
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  return (
    <Router>
      <RecoilRoot>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
          </Switch>
        </div>
      </RecoilRoot>
    </Router>
  );
}

export default App;
