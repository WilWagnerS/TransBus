import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Veiculo } from "@/app/types/veiculo";
import { buscarListaVeiculos } from "@/app/services/veiculoService";
import { logout } from "./authSlice";

// Estado global da frota de veículos
interface VeiculoState {
    lista: Veiculo[];        // veículos carregados do backend
    filtroStatus: string;    // filtro escolhido na tela (TODOS, GARAGEM, AVARIADO...)
    carregando: boolean;     // true enquanto busca no backend
}

const initialState: VeiculoState = {
    lista: [],
    filtroStatus: "TODOS",
    carregando: false
}

// Ação assíncrona: busca os veículos no backend (via service + interceptor com token)
export const carregarVeiculos = createAsyncThunk("veiculos/carregar", async () => {
    return await buscarListaVeiculos();
});

const veiculoSlice = createSlice({
    name: "veiculos",
    initialState,
    reducers: {
        // Reducer: altera o filtro de status
        setFiltroStatus: (state, action: PayloadAction<string>) => {
            state.filtroStatus = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(carregarVeiculos.pending, (state) => {
                state.carregando = true;
            })
            .addCase(carregarVeiculos.fulfilled, (state, action) => {
                state.carregando = false;
                state.lista = action.payload;
            })
            .addCase(carregarVeiculos.rejected, (state) => {
                state.carregando = false;
            })
            // Ao fazer logout, limpa os veículos (o próximo usuário não vê dados do anterior)
            .addCase(logout, () => initialState);
    }
});

export const { setFiltroStatus } = veiculoSlice.actions;
export default veiculoSlice.reducer;