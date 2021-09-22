import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import {
  AuthRoute,
  MainPage,
  Register,
  UserLogin,
  PrivateRoute,
  BikeItem,
} from "./components/Components";
import {
  useAppDispatch,
  useAppSelector,
  changeStatus,
  login,
} from "./redux/ReduxComponents";
import { AppStatus, device } from "./models/Models";
import { User } from "firebase/auth";
import {
  firebaseOnUserChange,
  getUserDocument,
} from "./components/firebase/Firebase";
import { ChakraProvider } from "@chakra-ui/react";

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

  @media${device.tablet} {
    font-size: 71.25%;
  } @media${device.laptop} {
    font-size: 81.25%;
  } @media${device.desktop} {
    font-size: 91.25%;
  }
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
`;

function App() {
  const dispatch = useAppDispatch();
  const { app, user } = useAppSelector((state) => state);

  useEffect(() => {
    return firebaseOnUserChange(async (user: User | null) => {
      if (user) {
        const response = await getUserDocument(user.uid);
        if (response) {
          dispatch(
            login({
              id: response.id,
              email: response.email,
              name: response.name,
              isAuth: true,
            })
          );
        }
      } else {
        console.log("User not found");
      }
      dispatch(changeStatus(AppStatus.Idle));
    });
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
      <ChakraProvider>
        <Router>
          {app.status === AppStatus.Loading ? (
            <h2>Loading...</h2>
          ) : (
            <Switch>
              <AuthRoute
                component={UserLogin}
                isSignedIn={!!user.isAuth}
                path="/login"
              />
              <AuthRoute
                component={Register}
                isSignedIn={!!user.isAuth}
                path="/register"
                exact
              />
              <PrivateRoute
                isSignedIn={!!user.isAuth}
                component={MainPage}
                path="/"
                exact
              />
              <PrivateRoute
                isSignedIn={!!user.isAuth}
                component={BikeItem}
                path="/:id"
                exact
              />
            </Switch>
          )}
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
