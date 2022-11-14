import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from './store/session'
import Navigaion from "./components/Navigation";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.loadCurrentUserThunk()).then(()=> setIsLoaded(true))
  },[dispatch])
  return isLoaded && (
   <>
    <Navigaion isLoaded={isLoaded} />
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
   </>
  );
}

export default App;
