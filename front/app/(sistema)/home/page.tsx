"use client"

import { AppDispatch, RootState } from "@/app/redux/store";
import { carregarVeiculos } from "@/app/redux/slice/veiculoSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

    const dispatch = useDispatch<AppDispatch>();

    // Mesma store usada na tela de veículos (veiculoSlice)
    const veiculos = useSelector((state: RootState) => state.veiculos.lista);

    useEffect(() => {
        dispatch(carregarVeiculos());
    }, [dispatch]);

    const ativos = veiculos.filter((v) => v.status !== "EXCLUIDO");

    const indicadores = [
        { titulo: "Veículos ativos", valor: ativos.length, cor: "text-white" },
        { titulo: "Na garagem", valor: ativos.filter((v) => v.status === "GARAGEM").length, cor: "text-green-400" },
        { titulo: "Em serviço", valor: ativos.filter((v) => v.status === "EM_SERVICO").length, cor: "text-purple-400" },
        { titulo: "Avariados / Manutenção", valor: ativos.filter((v) => v.status === "AVARIADO" || v.status === "EM_MANUTENCAO").length, cor: "text-red-400" },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-6 space-y-10">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight text-center">
                    Bem-vindo ao <span className="text-orange-500">TransBus</span>
                </h1>
                <p className="mt-4 text-base md:text-lg text-slate-400 text-center tracking-wide">
                    Gestão inteligente para um transporte eficiente.
                </p>
            </div>

            {/* Indicadores lidos da store do Redux (veiculoSlice) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                {indicadores.map((item) => (
                    <div key={item.titulo} className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center shadow-lg">
                        <p className={`text-4xl font-extrabold ${item.cor}`}>{item.valor}</p>
                        <p className="mt-2 text-xs uppercase tracking-wider text-slate-400">{item.titulo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}