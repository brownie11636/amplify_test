const initialState = {
  isLogin: false,
  id: "",
  nickname: "",
};

export const selectState = (state) => state.auth;
export const selectIslogin = (state) => selectState(state).isLogin;
export const selectId = (state) => selectState(state).id;
export const selectNickname = (state) => selectState(state).nickname;

export const isLoginAction = (value) => ({
  type: "auth/isLogin",
  value,
});
export const idAction = (value) => ({
  type: "auth/id",
  value,
});
export const nicknameAction = (value) => ({
  type: "auth/nickname",
  value,
});
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "auth/isLogin": {
      return {
        ...state,
        isLogin: action.value,
      };
    }

    case "auth/id": {
      return {
        ...state,
        id: action.value,
      };
    }

    case "auth/nickname": {
      return {
        ...state,
        nickname: action.value,
      };
    }
  }
  return state;
}