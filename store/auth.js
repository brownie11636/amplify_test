const initialState = {
  login: false,
};

export const selectState = (state) => state.auth;
export const selectLogin = (state) => selectState(state).login;

export const loginAction = (value) => ({
  type: "auth/login",
  value,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "auth/login": {
      return {
        ...state,
        login: action.value,
      };
    }
  }
  return state;
}