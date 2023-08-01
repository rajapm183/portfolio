import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/css/bootstrap.css";
/*import 'font-awesome/css/font-awesome.min.css';*/
import "assets/scss/zest-admin.css";
import "assets/fonts/simple-line-icons.css";
import "assets/css/app.css";
import indexRoutes from "routes/index.jsx";
import { createStore } from "redux";
import { combine } from "./redux/reducer";
import { Provider } from "react-redux";

const hist = createBrowserHistory();
const store = createStore(combine)

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          console.log(prop);
          if (prop.collapse) {
            return prop.views.map((prop2, key2) => {
              return (
                <Route
                  path={prop2.path}
                  component={prop2.component}
                  key={key2}
                />
              );
            });
          }
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
