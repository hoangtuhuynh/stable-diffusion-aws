import { BrowserRouter, NavLink, Route, Switch, Link} from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Service from "./Service";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="header">
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/register">Register</NavLink>
        <NavLink activeClassName="active" to="/login">Login</NavLink>
        <NavLink activeClassName="active" to="/service">Service</NavLink>
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/service" component={Service}/>
        </Switch>
      </div>
      </BrowserRouter>
    </div>
  );
}
export default App;