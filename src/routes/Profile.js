import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default({ refreshUser, userObj}) => {
   const history = useHistory();
   const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    
   const OnLogOutClick = () =>{
        authService.signOut();
        history.push("/");
   };

    const getMyNweets = async() => {
        const nweets = await dbService
        .collection("nweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt", "desc")
        .get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };

   useEffect(()=>{
    getMyNweets()
   },[])

   const onChange = (event) => {
       const{
           target:{value},
       } = event;
       setNewDisplayName(value);
   };

   const onSubmit = async (event) => {
       window.event.preventDefault();
       if(userObj.displayName !== newDisplayName){
           await userObj.updateProfile({
               displayName : newDisplayName,
           });
           refreshUser();
       }
   }

    return (
                <div className="container">
                    <form onSubmit = {onSubmit} className="profileForm">
                    <input
                        onChange = {onChange} 
                        type = "text" 
                        autoFocus
                        placeholder = "DisplayName"
                        value = {newDisplayName}
                        className = "formInput"
                    />
                    <input 
                        type = "submit" 
                        value = "Update profile"
                        className="formBtn"
                        style={{
                            marginTop:10,
                        }}
                    />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={OnLogOutClick}>
                Log Out
            </span>
        </div>
    );
};