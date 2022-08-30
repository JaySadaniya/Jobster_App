// import lang from "../lang/en";
// import { login, me } from "../apis/auth";
import axios from "axios";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../utils/constants";

type loginData = {
  email: string;
  password: string;
};

export default class Auth {
  static async login(userData: loginData) {
    const { data } = await axios.post("/api/user/login", userData);
    if (!data) throw new Error("Authentication is failed");
    Auth.setToken(data.id);
    // Auth.setAppExpiredTime(generateExprireTime(EXPIRED_TIMEOUT));
    return data;
  }

  static async me() {
    const { data } = await axios.get(`/api/user/${Auth.getToken()}`);
    return data;
  }

  static logout() {
    const caches = window.caches || {};

    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });

    // Auth.removeAppExpiredTime();
    Auth.removeToken();
  }

  static setToken(userId: number) {
    const token = jwt.sign({ userId }, TOKEN_KEY);
    localStorage.setItem("token", token);
  }

  static getToken() {
    const token = localStorage.getItem("token");
    if (!token) return;
    const { userId } = jwt.decode(token) as { userId: string };
    return userId;
  }

  static removeToken() {
    localStorage.removeItem("token");
  }

  // static getAppExpiredTime() {
  //   return localStorage.getItem("_appExpiredTime");
  // }

  // static removeAppExpiredTime() {
  //   localStorage.removeItem("_appExpiredTime");
  // }

  // static setAppExpiredTime(time: string) {
  //   localStorage.setItem("_appExpiredTime", time);
  // }
}
