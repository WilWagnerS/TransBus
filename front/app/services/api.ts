import axios from "axios";
import type { AppStore } from "../redux/store";
import { logout } from "../redux/slice/authSlice";

// A store é injetada aqui pelo store.ts (evita import circular)
let storeRef: AppStore | null = null;

export function injectStore(store: AppStore) {
    storeRef = store;
}

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

// INTERCEPTOR DE REQUISIÇÃO:
// injeta automaticamente o token JWT (buscado da store do Redux) em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = storeRef?.getState().auth.token;
        if (token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

// INTERCEPTOR DE RESPOSTA:
// se o backend responder 401 (token expirado/inválido), despacha o logout no Redux.
// Com a store sem token, o layout renderiza automaticamente a tela de login.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            storeRef?.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default api;

// Retorna a mensagem de erro do backend para mostrar ao usuário.
// Se for 401, retorna null: o interceptor de resposta já fez o logout.
export function mensagemDeErro(error: unknown, mensagemPadrao: string): string | null {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
            return null;
        }
        if (typeof error.response?.data === "string" && error.response.data) {
            return error.response.data;
        }
    }
    return mensagemPadrao;
}