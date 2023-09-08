// This code imports three functions from the 'react' library: createContext, useContext, and useReducer.
// These are necessary for creating and using React contexts and reducers.
import { createContext, useContext, useEffect, useReducer } from "react";

// It also imports a reducer function from a local module named 'reducer'.
//This reducer is expected to define how the state should be updated in response to different actions.
import reducer from "./reducer";

// Here, an initialState object is defined. This object represents the initial state of the context.
// In this case, it has a single property currentUser initialized to null.

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: "info", message: "" },
  profile: { open: false, file: null, photoURL: "" },
  images:[],
};

// The createContext function is used to create a new context. It takes the initialState as an argument and creates a context object called Context.
// This context will be used to share and access the global state within the application.
const Context = createContext(initialState);

// A custom hook named useValue is defined. This hook allows components to easily access the context's state and dispatch function.
//  It uses useContext to get the current context value, which includes both the state and the dispatch function.
export const useValue = () => {
  return useContext(Context);
};

// The ContextProvider component is defined. This component is responsible for providing the context value to its child components.
// Inside the component, the useReducer hook is used to create a state and a dispatch function.
// It takes the reducer function (imported earlier) and the initialState as arguments. This sets up the global state and the mechanism for updating it.
// The <Context.Provider> component is used to wrap the children of ContextProvider. It sets the value of the context to an object containing state
// (the current state) and dispatch (the dispatch function). This allows any child components to access and modify the global state.
// The children prop is passed as the content of the provider, allowing any components nested within ContextProvider to access the context.

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      dispatch({ type: "UPDATE_USER", payload: currentUser });
    }
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;

// Finally, the ContextProvider component is exported as the default export of this module.
// This allows you to use it in your application to manage global state and provide access to the state and dispatch function via the defined context.
