"use client"

import { Motorista } from "@/app/types/motorista";
import { Onibus } from "@/app/types/onibus";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ViagemForm() {
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);
    const [onibusList, setOnibusList] = useState<Onibus[]>([]);

    useEffect(() => {
        carregarDependencias();
    }, []);

    const carregarDependencias = async () => {
        try {
            // Buscando motoristas e ônibus cadastrados para preencher os selects
            const [resMotoristas, resOnibus] = await Promise.all([
                axios.get<Motorista[]>("http://localhost:8080/motoristas"),
                axios.get<Onibus[]>("http://localhost:8080/onibus")
            ]);

            setMotoristas(resMotoristas.data);
            setOnibusList(resOnibus.data);
        } catch (error) {
            console.error("Erro ao carregar dados auxiliares:", error);
        }
    };

    return (
        <form className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="space-y-6">
                {/* Origem */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Origem:
                    </label>
                    <input
                        name="origem"
                        type="text"
                        placeholder="Ex: São Paulo - SP"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                {/* Destino */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Destino:
                    </label>
                    <input
                        name="destino"
                        type="text"
                        placeholder="Ex: Rio de Janeiro - RJ"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                {/* Horários em grid de 2 colunas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Horário de Início:
                        </label>
                        <input
                            name="horarioInicio"
                            type="datetime-local"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors [color-scheme:dark]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Horário de Fim:
                        </label>
                        <input
                            name="horarioFim"
                            type="datetime-local"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors [color-scheme:dark]"
                        />
                    </div>
                </div>

                {/* Seleção de Motorista e Ônibus */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Motorista */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Motorista (ID):
                        </label>
                        <select
                            name="motoristaId"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                        >
                            <option value="">Selecione o motorista</option>
                            {motoristas.map((motorista) => (
                                <option key={motorista.id} value={motorista.id!}>
                                    ID {motorista.id} - {motorista.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ônibus */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Ônibus (ID):
                        </label>
                        <select
                            name="onibusId"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                        >
                            <option value="">Selecione o ônibus</option>
                            {onibusList.map((onibus) => (
                                <option key={onibus.id} value={onibus.id!}>
                                    ID {onibus.id} - {onibus.placa} ({onibus.modelo})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-800">
                    <Link
                        href="/viagem"
                        className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-medium text-sm transition-colors"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm transition-colors shadow-lg shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </form>
    );
}