import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies"
import { seesionExpired } from "../context/AuthContext";

export let statusCode =0;
export let errorMessage =""
export let isExpired =false
let isRefreshing = false;//Para verificar se estou ou nao actualizando o  token.
let failedRequest: { refreshHasSucceded: (token: string) => void; refreshHasFaile: (error: AxiosError<unknown, any>) => void; }[] = [] //Armazena todas as requisicoes que falharam.


export const URL ="https://2d6e-105-172-15-190.ngrok-free.app";

let cookies = parseCookies()



export const api = axios.create(
    {
        baseURL: URL+"/api",
        headers: {
            Authorization: `Bearer ${cookies['token.Onschool']}`
        }
    }
)





api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<any>) => {

        statusCode = error?.response?.status!
        errorMessage =error?.response?.data.message!
      if (error.response?.status === 401) {
        if (
          error.response.data.message === "token expirado" ||
          error.response.data.message === "Token invalido"
        ) {
          // Fazendo refresh token
          cookies = parseCookies();
          const { "refresh_token.Onschool": refresh_token } = cookies;
          const originalConfig: any = error.config;
  
          if (!isRefreshing) {
            isRefreshing = true;
  
            if (window.location.pathname !== "/") {
              seesionExpired();
            }
  
            axios
              .post(
                `${URL}/refresh`,
                    {
                  headers: {
                    Authorization: `Bearer ${refresh_token}`,
                  },
                }
              )
              .then((response) => {
                const { access_token } = response.data;
                setCookie(undefined, "token.Onschool", access_token, {
                  maxAge: 60 * 60 * 24,
                  path: "/",
                });
                api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  
               failedRequest.forEach((request) =>
                  request.refreshHasSucceded(access_token)
                );
               failedRequest = [];
              })
              .catch((err) => {
                console.error(err);
               failedRequest.forEach((request) =>
                  request.refreshHasFaile(err)
                );
               failedRequest = [];
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
  
          return new Promise((resolve, reject) => {
           failedRequest.push({
              refreshHasSucceded: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;
                resolve(api(originalConfig));
              },
              refreshHasFaile: (error: AxiosError) => {
                reject(error);
              },
            });
          });
        } else {
          // Deslogar usuário ou tomar a ação apropriada
          // api.post("/logout");
        }
      }
      return Promise.reject(error);
    }
  );