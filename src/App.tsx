import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {UserLogin} from "./components/Components";
import {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    width: 100%;
    height: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    letter-spacing: 1.4px;
  }
`

function App() {
    return (
        <>
            <GlobalStyles/>
            <Router>
                <Switch>
                    <Route path='/login'>
                        <UserLogin/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
