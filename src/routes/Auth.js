import { authService, firebaseInstance } from "fBase";
import React from "react";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () =>{ 
  const onSocialClick = async (event) => {
      const {
          target:{name},
    } = event;
    let provider;
    if(name === "Google"){
        provider = new firebaseInstance.auth.GoogleAuthProvider();
    }else if(name === "Github"){
        provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return(
    <div className="authContainer">
        <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="3x"
            style={{marginBottom:30}}
        />
        <AuthForm />
            <div className ="authBtns">
                <button onClick={onSocialClick} name = "Google" className="authBtn">
                    Continue with Google<FontAwesomeIcon icon = {faGoogle}/>
                </button>
                <button onClick={onSocialClick} name = "Github" className="authBtn">
                    Continue with Github<FontAwesomeIcon icon = {faGithub}/>
                </button>
            </div>
    </div>
    );
};

export default Auth;