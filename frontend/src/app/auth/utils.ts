// src/app/auth/utils.ts
import wretch from "wretch";
import Cookies from "js-cookie";

// Base API setup for making HTTP requests
const api = wretch("http://127.0.0.1:8000").accept("application/json");


////////////////////////////////////////////////////

/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
const storeToken = (token: string, type: "access" | "refresh") => {
  Cookies.set(type + "Token", token);
};

/**
 * Retrieves a token from cookies.
 * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | undefined} The token, if found.
 */
const getToken = (type: string) => {
  return Cookies.get(type + "Token");
};

/**
 * Removes both access and refresh tokens from cookies.
 */
const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

// With the cookies methods set,
// we can write the different methods for login,
// registration, logout, and password reset logic.

const register = (email: any, username: any, first_name: any, last_name: any, password: any ) => {
    return api.post({ email, username, first_name, last_name, password }, "/auth/users/");
  };
  
const login = (email: string, password: string) => {
    return api.post({ username: email, password }, "/auth/jwt/create");
};
  
const logout = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/auth/logout/");
};
  
const handleJWTRefresh = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/auth/jwt/refresh");
};
  
const resetPassword = (email: string) => {
    return api.post({ email }, "/auth/users/reset_password/");
};
  
const resetPasswordConfirm = (
    new_password: string,
    re_new_password: string,
    token: string,
    uid: string
) => {
    return api.post(
      { uid, token, new_password, re_new_password },
      "/auth/users/reset_password_confirm/"
    );
};


// importing functions into AuthActions function.

export const AuthActions = () => {
    return {
      login,
      resetPasswordConfirm,
      handleJWTRefresh,
      register,
      resetPassword,
      storeToken,
      getToken,
      logout,
      removeTokens,
    };
};