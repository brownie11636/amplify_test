export const initialState = {
  login: {
    isRunning: false,
    error: null,
  },
}


export const selectState = (state) => state.api;
export const selectApiLogin = (state) => selectState(state).login;

export const apiLoginStartAction = () => ({
  type: "api/login/start",
});
export const apiLoginFinishAction = (error) => ({
  type: "api/login/finish",
  error,
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "api/login/start": {
      return {
        ...state,
        login: {
          isRunning: true,
          error: null,
        }
      };    
    }
    case "api/login/finish": {
      return {
        ...state,
        login: {
          isRunning: false,
          error: action.error,
        },
      };
    }
  };

  return state;
};