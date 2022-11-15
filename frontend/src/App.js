import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./components/LoginFormModal/LoginForm";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from './store/session'
import Navigation from "./components/Navigation";
import { getSpots } from "./store/spots";
import SpotsPage from "./components/Spots/Spots";
import AddSpotForm from "./components/AddSpotForm";
import SingleSpot from "./components/SingleSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(sessionActions.loadCurrentUserThunk()).then(()=> setIsLoaded(true))

    dispatch(getSpots())
  },[dispatch])


  return isLoaded && (
   <>
    <Navigation isLoaded={isLoaded} />
    <Switch>
      <Route exact path="/">
        <SpotsPage />
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path='/spots/:spotId'>
        <SingleSpot />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route path="/addspot">
        <AddSpotForm />
      </Route>
    </Switch>
   </>
  );
}

export default App;
