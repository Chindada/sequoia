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

const GetAvaliableTimeInMinute = (token: string | null) => {
  if (!token || token === "") {
    return 0;
  }

  const decodedToken = jwtDecode<JWToken>(token);
  const now = new Date();
  const exp = new Date(decodedToken.exp * 1000);
  return Math.floor((exp.getTime() - now.getTime()) / 60000);
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

export { GetAvaliableTimeInMinute, GetRole, GetUserId, GetUsername };
