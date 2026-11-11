import { AuthState } from "@/app/types/auth";
import { Usuario } from "@/app/types/usuario";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// O token JWT e os dados do usuário ficam EXCLUSIVAMENTE aqui na store do Redux
// (sem cookie e sem localStorage). Ao recarregar a página (F5), a store zera.
const initialState: AuthState = {
    usuario: null,
    token: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reducer de login: guarda token + usuário na store
        login: (state, action: PayloadAction<{ token: string, usuario: Usuario }>) => {
            state.token = action.payload.token;
            state.usuario = action.payload.usuario;
        },
        // Reducer de logout: limpa a store -> o layout renderiza a tela de login
        logout: (state) => {
            state.token = "";
            state.usuario = null;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;