import React from "react";
import Form from "components/Form/Form.jsx";
import theme from 'theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



const App = () =>
  (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/book">Book Appointment</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/book">
              <Form />
            </Route>
            <Route path="/success">
              <div>Success</div>
            </Route>

            <Route path="/">
              <div>Home</div>
            </Route>

          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );

export default App;
