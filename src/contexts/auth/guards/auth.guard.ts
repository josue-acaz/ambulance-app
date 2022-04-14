import React from "react";
import axios from "axios";
import AuthService from "../auth.service";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

class AuthGuard {
  authService: AuthService = new AuthService();

  async checkAuthentication(): Promise<boolean> {
    const token = this.authService.getAuthToken();
    
    try {
      await api.get<any>('/AuthUsers/CheckAuthStatus', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default AuthGuard;