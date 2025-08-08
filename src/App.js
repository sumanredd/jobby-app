import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/Login";
import Home from "./components/Home";
import JobsPage from "./components/Jobs";
import NotFound from "./components/NotFound";
import IndividualApi from "./components/IndividualApi";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/" component={Home} />
      <Route exact path="/jobs" component={JobsPage} />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact path="/jobs/:id" component={IndividualApi} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
);

export default App;
