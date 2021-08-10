import { authService } from "fBase";
import React from "react";

export default() => {
   const OnLogOutClick = () => authService.signOut();

   
    return (
        <>
            <button onClick = {OnLogOutClick}>Log Out</button>
        </>
    );
};