import Axios from "axios";

import { 
  API_BASE_URL,
  SESSION_REQUEST,
  SESION_REGISTER,
  TEST_USER_EMAIL,
  TEST_USER_PASSWD
} from "./config";
import { sessionRegistration, headersConfig } from "./Types";

export async function authenticate(apiKey: string): Promise<string | null> {
    try {
      const tempKey: string = await requestSession(apiKey);
      const access_key: string = await registerSession(tempKey);

      return access_key;
    } catch (error) {
      return null;
    }
  }

export async function requestSession(apiKey: string): Promise<string> {
    const url = API_BASE_URL + SESSION_REQUEST;
    const response = await Axios.post(url, { system_api_key: apiKey });
    return response.data.data.access_key;
  }

export async function registerSession(tempKey: string): Promise<string> {
    const url = API_BASE_URL + SESION_REGISTER;
    const userAuth: sessionRegistration = {
      organization_user: {
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWD
      }
    };
    const requestHeader: headersConfig = {
      headers: { Authorization: "Bearer " + tempKey }
    };

    const response = await Axios.post(url, userAuth, requestHeader);
    return response.data.data.access_key;
  }