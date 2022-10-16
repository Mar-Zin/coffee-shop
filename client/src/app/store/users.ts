import { ICatalogItem, IResetPasswordEmail } from './../../models';
import { AppThunk } from './index';
import { ISignUp, IState, IUser } from '../../models';
import { createAction, createSlice} from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utils/generateAuthError";
import history from "../utils/history";


export interface UsersState {
  entities: IUser[]
  isLoading: boolean
  error:string
  auth: {userId : string | null}
  isLoggedIn:boolean
  dataLoaded:boolean
}


const initialState: UsersState = localStorageService.getAccessToken()
  ? {
      entities: [],
      isLoading: true,
      error: '',
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: [],
      isLoading: false,
      error: '',
      auth: { userId: "1" },
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload.message
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;

      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.dataLoaded = false;
      state.auth = { userId: "1" };
    },
    userDataUpdated: (state, action) => {
      const indexUpdateUser = state.entities.findIndex(
        (u) => u._id === action.payload._id
      );
      state.entities[indexUpdateUser] = action.payload;
    },
    userDataUpdatedFailed: (state, action) => {
      state.error = action.payload.message
    },
    authRequested: (state) => {
      state.error = '';
    },
  },
});

const { actions, reducer: usersReducer } = usersSlice;
const {
  usersRequested,
  usersReceved,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userLoggedOut,
  userDataUpdated,
  userDataUpdatedFailed,
  authRequested,
} = actions;

const updateUserRequested = createAction("users/updateUserRequested");

export const logIn =
  ({ payload, redirect }:any):AppThunk =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      history.push(redirect);
    } catch (error:any) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp = (payload:ISignUp, navigate:Function):AppThunk => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    navigate('/', { replace: true })
  } catch (error) {
    dispatch(authRequestFailed(error));
  }
};

export const logOut = (navigate:Function):AppThunk => async (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  navigate('/', { replace: true })
};

export const updateUserData = (payload:IUser):AppThunk => async (dispatch) => {
  dispatch(updateUserRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(userDataUpdated(content));
  } catch (error) {
    dispatch(userDataUpdatedFailed(error));
  }
};

// export const mailToUser = (payload:IResetPasswordEmail):AppThunk => async (dispatch) => {
//   dispatch(updateUserRequested());
//   const { email } = payload
//  try {
//   const { content } = await userService.checkUser(email)
//   console.log(content)
//  } catch (error) {
//   dispatch(userDataUpdatedFailed(error));
//  }
// }

// export const resetUserPassword = (payload:IResetPassword):AppThunk => async (dispatch) => {
//   dispatch(updateUserRequested());
//   try {
//     const { content } = await userService.update(payload);
//   } catch (error) {
//     dispatch(userDataUpdatedFailed(error));
//   }
// }

export const loadUsersList = ():AppThunk => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFailed(error));
  }
};

export const toggleBookmark = (item:ICatalogItem):AppThunk => async (dispatch, getState) => {
  dispatch(updateUserRequested());

  let favorites = [...getCurrentUserData()(getState()).favorites];
    if (favorites.findIndex((catalogItems) => catalogItems._id === item._id) !== -1) {
      favorites = favorites.filter((catalogItems) => catalogItems._id !== item._id);
    } else favorites.push(item);
  
  const payload = {
    ...getCurrentUserData()(getState()),
    favorites: favorites,
  };
  try {
    const { content } = await userService.update(payload);
    dispatch(userDataUpdated(content));
  } catch (error) {
    dispatch(userDataUpdatedFailed(error));
  }
};

export const getUsers = () => (state:IState) => state.users.entities;
export const getUsersLoadingStatus = () => (state:any) => state.users.isLoading;
export const getUserById = (userId:string) => (state:any) => {
  if (state.users.entities) {
    return state.users.entities.find((user:IUser) => user._id === userId);
  }
};
export const getCurrentUserData = () => (state:any) => {
  return state.users.entities
    ? state.users.entities.find((u:IUser) => u._id === state.users.auth.userId)
    : null;
};
export const getIsLoggedIn = () => (state:any) => state.users.isLoggedIn;
export const getRole = () => (state:any) =>  {
  const currentUser  = state.users.entities
    ? state.users.entities.find((u:IUser) => u._id === state.users.auth.userId)
    : null;
  return currentUser && currentUser.roles==='ADMIN'? true : false
}
export const getDataStatus = () => (state:any) => state.users.dataLoaded;
export const getCurrentUserId = () => (state:any) => state.users.auth.userId;
export const getAuthError = () => (state:any) => state.users.error;
export default usersReducer;
