import React, { useEffect, useState } from "react";
import AppRouter from "components/Router"
import {authService} from "fBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        if(user.displayName===null){
          user.updateProfile({
            displayName:"Nwitter",
          });
        }
        setUserObj(user);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
    {init? (
    <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}></AppRouter>
    ) : (
       "Initializing..."
    )}
    </>
  );
}

export default App;
