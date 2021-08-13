import React, { useEffect, useState } from "react";
import {dbService, storageService} from "fBase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);

    useEffect(()=>{
        dbService.collection("nweets").orderBy("createAt","desc").onSnapshot((snapshot)=>{
            const nweetsArray = snapshot.docs.map((doc)=>({
                id: doc.id, 
                ...doc.data(),
            }));
            setNweets(nweetsArray);
        });
    },[]);
    
    return (
        <div className = "container">
            <NweetFactory userObj = {userObj}></NweetFactory>
            <div style = {{marginTop: 30}}>
                {nweets.map((nweet) => (
                    <Nweet 
                    key = {nweet.id} 
                    nweetObj = {nweet} 
                    isOwner = {nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
};
export default Home;