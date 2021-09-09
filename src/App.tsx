import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {HomePage, Register, UserLogin} from "./components/Components";
import {createGlobalStyle} from 'styled-components'
import {auth, getUserDocument} from "./components/Auth/Firebase";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {login, changeStatus} from './redux/slice/Slices'
import {AppStatus} from "./models/Models";
import {PrivateRoute} from "./components/Auth/routes/PrivateRoute";

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

  :root {
    --color-background: #F2F0D5;
    --color-button-primary: #A6BF4B;
    --color-button-secondary: #668C4A;
  }

  body {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    letter-spacing: 1.4px;
  }
`

function App() {
    const dispatch = useAppDispatch();
    const {app, user} = useAppSelector(state => state);

    useEffect(() => {
            return auth.onAuthStateChanged(async user => {
                if (user) {
                    const response = await getUserDocument(user.uid);
                    if (response) {
                        dispatch(login({id: response.id, email: response.email, name: response.name, isAuth: true}))
                        console.log(`User is auth /app`, response)
                    }
                } else {
                    console.log('User not found');
                }
                dispatch(changeStatus(AppStatus.Idle))
            });
    }, [dispatch]);

    return (
        <>
            <GlobalStyles/>
            <Router>
                {app.status === AppStatus.Loading ? <h2>Loading...</h2> :
                    <Switch>
                        <Route path='/login'>
                            <UserLogin/>
                        </Route>
                        <Route path='/register' exact>
                            <Register/>
                        </Route>
                        <PrivateRoute isSignedIn={!!user.isAuth} component={HomePage} path='/' exact/>
                    </Switch>
                }
            </Router>
        </>
    );
}

export default App;
