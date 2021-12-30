import { Route, Switch } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register"
import Welcome from "./components/Welcome";
require('dotenv').config();

function App() {
  return (
    <div className="cont">
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/welcome">
          <Welcome/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
