// reducer is a function that takes two arguments: state and action.
// state represents the current state of the application or a specific part of the state.
// action is an object that describes what kind of change should be made to the state.
// It typically has a type property to identify the action and may include additional data, often under a payload property.

const reducer = (state, action) => {
  // Inside the switch statement, the action.type is checked to determine which action is being performed.
  // The reducer reacts differently based on the action type.

  // In the provided code, there is one case:

  // "UPDATE_USER": When this action is dispatched, the reducer creates a new state object by spreading the existing state (...state)
  // and updating the currentUser property with the value from action.payload.
  // This is a common pattern for updating a specific part of the state in an immutable way.

  switch (action.type) {
    // Different cases based on action type
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };
    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };

    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };

    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };

    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };

    case "UPDATE_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      // Reducer logic for the "UPDATE_USER" action
      return { ...state, currentUser: action.payload };
    // If none of the cases match the action type, the default case is executed, which throws an error indicating that there's
    // no matched action. This can be helpful for debugging and catching unexpected actions.

    case "UPDATE_IMAGES":
      return { ...state, images: [...state.images, action.payload] };
      
    case "DELETE_IMAGE":
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };

    case "UPDATE_DETAILS":
      return { ...state, details: { ...state.details, ...action.payload } };

    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };

    default:
      // Default case, in case no matching action is found
      throw new Error("No matched action!");
  }
};
export default reducer;

// The reducer function is exported as the default export of this module.
// This allows other parts of your application to import and use this reducer to manage state.
