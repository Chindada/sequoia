import { jwtDecode } from "jwt-decode";

import { UserRole } from "@chindada/panther/typescript/system/user";

interface JWToken {
  role: string;
  username: string;
  user_id: number;
  exp: number;
}

const GetUsername = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode<JWToken>(token);
    return decodedToken.username;
  }
  return "";
};

const GetUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode<JWToken>(token);
    return decodedToken.user_id;
  }
  return 0;
};

const GetTokenLifeTimeMinutes = () => {
  const token = localStorage.getItem("token");
  if (!token || token === "") {
    return 0;
  }

  const decodedToken = jwtDecode<JWToken>(token);
  return Math.floor((decodedToken.exp * 1000 - new Date().getTime()) / 1000 / 60);
};

const GetRole = (): UserRole => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode<JWToken>(token);
    switch (decodedToken.role) {
      case "user":
        return UserRole.USER;
      case "admin":
        return UserRole.ADMIN;
      case "root":
        return UserRole.ROOT;
    }
  }
  return UserRole.UNKNOWN;
};

export { GetRole, GetTokenLifeTimeMinutes, GetUserId, GetUsername };
