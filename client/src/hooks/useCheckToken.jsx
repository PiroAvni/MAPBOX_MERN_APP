// These lines import the necessary dependencies:
// useEffect from React: This is used to perform side effects in function components.
// useValue from a custom context provider (ContextProvider): It's a custom hook for accessing global state.
// jwtDecode from 'jwt-decode': This is a library used to decode JSON Web Tokens (JWTs).

import { useEffect } from 'react';
import { useValue } from '../context/ContextProvider';
import jwtDecode from 'jwt-decode';

// This defines a custom hook named useCheckToken. Custom hooks are a way to reuse stateful logic across components.
const useCheckToken = () => {

    // Here, the code uses the useValue hook to access the global state managed by the context provider. 
    // It extracts the currentUser object from the global state and the dispatch function, which is used to dispatch actions to update the global state.

  const {
    state: { currentUser },
    dispatch,
  } = useValue();


//   This sets up a side effect using the useEffect hook. The side effect will run when the component using this hook mounts.
  useEffect(() => {

    // This condition checks if there is a currentUser object in the global state. It's used to determine if the user is logged in.
    if (currentUser) {

    //   If there is a currentUser, this line decodes the JWT token stored in the currentUser object. jwtDecode is a library that can decode the information contained within a JWT token.    
      const decodedToken = jwtDecode(currentUser.token);
    

    // This part of the code checks if the token has expired. JWT tokens typically have an expiration timestamp (exp) that is measured in seconds since the Unix epoch.
    //  Multiplying it by 1000 converts it to milliseconds, making it compatible with JavaScript's Date object.
      if (decodedToken.exp * 1000 < new Date().getTime())

    //   If the token has expired, this line dispatches an action to update the currentUser in the global state to null. 
    //   This effectively logs the user out by removing their information from the state.
        dispatch({ type: 'UPDATE_USER', payload: null });
    }
    // Finally, this is the closing of the useEffect block. The empty dependency array ([]) means that this effect will only run when the component mounts, not on subsequent renders.

  }, []);
};

export default useCheckToken;
