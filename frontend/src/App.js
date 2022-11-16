import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session'
import Navigation from "./components/Navigation";
import { getSpots } from "./store/spots";
import SpotsPage from "./components/Spots/Spots";
import AddSpotForm from "./components/AddSpotForm";
import SingleSpot from "./components/SingleSpot";
import EditSpotForm from "./components/EditSpotForm";
import ItIsNotHere from "./components/FourOhFour/fourOhFour";
import ReviewPage from "./components/ReviewPage";
import AddReviewForm from "./components/AddReviewForm";


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
      <Route path='/spots/:spotId'>
        <SingleSpot />
      </Route>
      <Route path='/spot/edit/:spotId'>
        <EditSpotForm />
      </Route>
      <Route path="/addspot">
        <AddSpotForm />
      </Route>
      <Route path="/reviews/:spotId/add">
        <AddReviewForm />
      </Route>
      <Route path="/reviews/:spotId">
        <ReviewPage />
      </Route>
      <Route>
        <ItIsNotHere />
      </Route>
    </Switch>
   </>
  );
}


export default App;
