import { UserRole } from "@chindada/panther/typescript/system/user";
import { jwtDecode } from "jwt-decode";

interface JWToken {
  site_account: string;
  role: string;
  username: string;
  user_id: number;
  need_change_password: boolean;
  exp: number;
}

const CheckPasswordIsDefault = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode<JWToken>(token);
    return decodedToken.need_change_password;
  }
  return false;
};

const GetIsLinked = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode<JWToken>(token);
    if (!decodedToken.site_account || !decodedToken.username) {
      return false;
    }
    return decodedToken.site_account !== "" && decodedToken.username !== "";
  }
  return false;
};

const GetSiteAccount = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode<JWToken>(token);
    return decodedToken.site_account;
  }
  return "";
};

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

export {
  CheckPasswordIsDefault,
  GetAvaliableTimeInMinute,
  GetIsLinked,
  GetRole,
  GetSiteAccount,
  GetUserId,
  GetUsername
};
