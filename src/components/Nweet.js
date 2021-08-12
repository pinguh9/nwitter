import { dbService, storageService } from "fBase";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제할까요?");
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    };
    const toggleEditting = () => setEditing((prev) => !prev);
    const onSubmit = async (event) =>{
        window.event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target : {value},
        } = event;
        setNewNweet(value);
    };
    return(
        <div>
        { editing ? (
            <>
               {isOwner &&
               <> 
                <form onSubmit = {onSubmit}>
                    <input 
                    type ="text" 
                    placeholder="Edit your Nweet" 
                    value ={newNweet} 
                    required
                    onChange = {onChange}
                    />
                    <input type = "submit" value = "Update Nweet"/>
                </form>
                <button onClick = {toggleEditting}>Cancel</button>
                </>
                }
            </>
            ) : (
            <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src = {nweetObj.attachmentUrl} width = "50px" height = "50px" />}
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button onClick={toggleEditting}>Edit Nweet</button>
                </>
            )}
            </>
        )}   
    </div>
    );
};

export default Nweet;