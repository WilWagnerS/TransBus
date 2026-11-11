import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import veiculoReducer from "./slice/veiculoSlice";
import { injectStore } from "../services/api";

export const store = configureStore({
    reducer: {
        auth: authReducer,       // autenticação (token + usuário)
        veiculos: veiculoReducer // frota de veículos (lista + filtro)
    }
});

// Entrega a store para os interceptors do Axios
injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;