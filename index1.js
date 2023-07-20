const axios = require("axios");
const redux = require("redux");
const thunk = require("redux-thunk").default;
const applymiddleware = redux.applyMiddleware;
const USER_FETCHED = "USER_FETCHED";
const USER_FETCHED_PENDING = "USER_FETCHED_PENDING";
const USER_FETCHED_FAILED = "USER_FETCHED_FAILED";
const USERFetched = (data) => {
  return {
    type: USER_FETCHED,
    payload: data,
  };
};
const UserFetchedFailed = (error) => {
  return {
    type: USER_FETCHED_FAILED,
    error,
  };
};
const intialState = {
  users: [],
  loading: false,
  error: "",
};
const USERFETCHEDPENDING = () => {
  return { type: USER_FETCHED_PENDING };
};
//action but special async task
const fetchUser = () => {
  return async (dispatch, getState) => {
    //getstate basically a function to get the state of the store at anygiven instance of time
    try {
      dispatch(USERFETCHEDPENDING());
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      dispatch(USERFetched(res.data));
    } catch (err) {
      dispatch(UserFetchedFailed(err.message));
    }
  };
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case USER_FETCHED_PENDING:
      return {
        ...state,
        loading: true,
      };
    case USER_FETCHED:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case USER_FETCHED_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const store = redux.createStore(userReducer, applymiddleware(thunk));
//store
store.subscribe(() => console.log("Update State", store.getState()));

store.dispatch(fetchUser());
