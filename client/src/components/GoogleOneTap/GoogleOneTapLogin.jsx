import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { useValue } from "../../context/ContextProvider";
import jwtDecode from "jwt-decode";

const GoogleOneTapLogin = () => {
  const { dispatch } = useValue();
  const [disabled, setDisabled] = useState(false);

// handleResponse is a function that handles the response from Google One Tap login. It expects a response object as its parameter.
// response.credential contains the credential or token received from Google after a successful login.
// jwtDecode(token) is used to decode the JWT (JSON Web Token) received from Google. This JWT contains information about the user.
// const { sub: id, email, name, picture: photoURL } = decodedToken; extracts user information from the decoded JWT. 
// It renames the sub property to id for consistency and stores the user's email, name, and profile picture URL.
// dispatch({ type: 'UPDATE_USER', payload: { ... } }); dispatches an action to update the user's information in the application's state.
//  It includes the user's ID, email, name, photoURL, and the received token. The google property is set to true to indicate that this is a Google login.
// dispatch({ type: 'CLOSE_LOGIN' }); dispatches an action to close the login dialog or form. This is likely used to close the Google One Tap login dialog after a successful login.
  const handleResponse = (response) => {
    const token = response.credential;
    const decodedToken = jwtDecode(token);
    const { sub: id, email, name, picture: photoURL } = decodedToken;
    dispatch({
      type: 'UPDATE_USER',
      payload: { id, email, name, photoURL, token, google: true },
    });
    dispatch({ type: 'CLOSE_LOGIN' });
  };

// handleGoogleLogin is a function that initiates the Google One Tap login process.
// setDisabled(true); sets the disabled state to true. 
// This is likely used to disable the Google login button while the login process is in progress to prevent multiple login attempts.
// window.google.accounts.id.initialize({ ... }); initializes the Google One Tap login with the provided client ID and callback function.
//  When the user logs in or cancels the login process, handleResponse function will be called.
// window.google.accounts.id.prompt((notification) => { ... }); prompts the user with the Google One Tap login dialog. 
// It takes a callback function that handles the notification result.
// The callback function inside prompt checks the notification to determine whether it was displayed, skipped, or dismissed. 
// If it's not displayed, an error is thrown indicating that the user should clear cookies or try again later. If it's skipped or dismissed, the disabled state is set to false, likely to re-enable the login button.
// If any errors occur during the Google One Tap login process, they are caught in the catch block. 
// An error message is dispatched to update the application's state, and the error is logged to the console.

  const handleGoogleLogin = () => {
    setDisabled(true);

    try {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error("Try to clear the cookies or try again later!");
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          setDisabled(false);
        }
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, severity: "error", message: error.message },
      });
      console.log(error);
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<Google />}
      disabled={disabled}
      onClick={handleGoogleLogin}
    >
      Login with Google
    </Button>
  );
};

export default GoogleOneTapLogin;
