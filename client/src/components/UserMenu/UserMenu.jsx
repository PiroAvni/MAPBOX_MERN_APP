import { Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import useCheckToken from "../../hooks/useCheckToken";
import Profile from "../Profile/Profile";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken();
  const {
    dispatch,
    state: { currentUser },
  } = useValue();

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  // const testAuthorization = async () => {
  //   const url = import.meta.env.VITE_REACT_APP_SERVER_URL + "/office";
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${currentUser.token}`,
  //       },
  //     });
  //     const data = await response.json();

  //     console.log(data);

  //     if (!data.success) {

  //       // This line is checking if the HTTP response status code is equal to 401. In HTTP, the status code 401 typically means "Unauthorized."
  //       // It indicates that the user is not authenticated or doesn't have the necessary credentials to access the requested resource.

  //       // dispatch({ type: "UPDATE_USER", payload: null });:
  //       // If the response status code is 401, this line of code dispatches an action to update the user's state or context.
  //       //  It appears to be using a state management system like Redux or React context to manage user authentication state.

  //       // dispatch: This is a function used in state management libraries like Redux or when working with React context. It's used to dispatch actions that trigger state updates.

  //       // { type: "UPDATE_USER", payload: null }: This is the action being dispatched. It specifies a type, which is typically a string that describes the action to be performed.
  //       //  In this case, it's "UPDATE_USER." It also includes a payload, which is the data associated with the action. Here, the payload is set to null,
  //       //   indicating that the user's data should be cleared or set to an initial state.

  //       if (response.status === 401)
  //         dispatch({ type: "UPDATE_USER", payload: null });

  //         // So, in summary, if the HTTP response status code is 401 (Unauthorized),
  //         // this code dispatches an action to update the user's state,
  //         // effectively logging them out or clearing their user data from the application's state management system.

  //       throw new Error(data.message);
  //     }
  //   } catch (error) {
  //     dispatch({
  //       type: "UPDATE_ALERT",
  //       payload: { open: true, severity: "error", message: error.message },
  //     });
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {!currentUser.google && (
          <MenuItem
            onClick={() =>
              dispatch({
                type: "UPDATE_PROFILE",
                payload: {
                  open: true,
                  file: null,
                  photoURL: currentUser?.photoURL,
                },
              })
            }
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        )}

        <MenuItem
          onClick={() => dispatch({ type: "UPDATE_USER", payload: null })}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  );
};

export default UserMenu;
