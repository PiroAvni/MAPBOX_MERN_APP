import fetchData from "./utils/fetchData";
// import { v4 as uuidv4 } from 'uuid';
// import uploadFile from '../firebase/uploadFile';

const url = import.meta.env.VITE_REACT_APP_SERVER_URL + "/user";

// register
export const register = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    { url: url + "/register", body: user },
    dispatch
  );
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Your account has been created successfully",
      },
    });
  }
  dispatch({ type: "END_LOADING" });
};

// login 
export const login = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData({ url: url + "/login", body: user }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
  }

  dispatch({ type: "END_LOADING" });
};
