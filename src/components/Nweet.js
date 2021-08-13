import { dbService, storageService } from "fBase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
        { editing ? (
            <>
               {isOwner &&
               <> 
                <form onSubmit = {onSubmit} className="container nweetEdit">
                    <input 
                        type ="text" 
                        placeholder="Edit your Nweet" 
                        value ={newNweet} 
                        required
                        autoFocus
                        onChange = {onChange}
                        className="formInput"
                    />
                    <input type = "submit" value = "Update Nweet" className="formBtn" />
                </form>
                <span onClick = {toggleEditting} className="formBtn cancelBtn">
                    Cancel
                </span>
                </>
                }
            </>
            ) : (
            <>
                <h4>{nweetObj.text}</h4>
                {nweetObj.attachmentUrl && <img src = {nweetObj.attachmentUrl} />}
                {isOwner && (
                   <div className = "nweet_actions">
                       <span onClick={onDeleteClick}>
                           <FontAwesomeIcon icon={faTrash}/>
                       </span>
                       <span onClick={toggleEditting}>
                           <FontAwesomeIcon icon={faPencilAlt}/>
                       </span>
                    </div>
                )}
            </>
        )}   
    </div>
    );
};

export default Nweet;