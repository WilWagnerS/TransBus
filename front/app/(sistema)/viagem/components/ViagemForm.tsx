"use client"

import { atualizarViagem, salvarViagem } from "@/app/services/viagemService";
import { Motorista } from "@/app/types/motorista";
import { Onibus } from "@/app/types/onibus";
import { Viagem, ViagemFormProps } from "@/app/types/viagem";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViagemForm({ viagemExistente }: ViagemFormProps) {

    const router = useRouter();

    const [motoristas, setMotoristas] = useState<Motorista[]>([]);

    const [onibusList, setOnibusList] = useState<Onibus[]>([]);
    useEffect(() => {
        carregarDependencias();
    }, []);

    const carregarDependencias = async () => {
        try {
            const [resMotoristas, resOnibus] = await Promise.all([
                axios.get<Motorista[]>("http://localhost:8080/motoristas"),
                axios.get<Onibus[]>("http://localhost:8080/onibus")
            ]);
            setMotoristas(resMotoristas.data);
            setOnibusList(resOnibus.data);
        } catch (error) {
            console.error("Erro ao carregar dados auxiliares:", error);
        }
    }

    const [viagem, setViagem] = useState<Viagem>
        (viagemExistente || new Viagem(null, "", "", "", "", 0, 0, "AGENDADA"));

    const handlerChange = (campo: 'origem' | 'destino' | 'horarioInicio' | 'horarioFim' | 'motoristaId' | 'onibusId', valor: string) => {
        setViagem(valorAnterior =>
            new Viagem(
                valorAnterior.id,
                campo === 'origem' ? valor : valorAnterior.origem,
                campo === 'destino' ? valor : valorAnterior.destino,
                campo === 'horarioInicio' ? valor : valorAnterior.horarioInicio,
                campo === 'horarioFim' ? valor : valorAnterior.horarioFim,
                campo === 'motoristaId' ? Number(valor) : valorAnterior.motoristaId,
                campo === 'onibusId' ? Number(valor) : valorAnterior.onibusId,
                valorAnterior.status
            )
        )
    }

    const handlerSalvar = async (formData: FormData) => {
        if (viagemExistente) {
            var dadosRetorno = await atualizarViagem(viagem);
            if (dadosRetorno) {
                alert("Viagem foi salvo com sucesso!");
            } else {
                alert("Erro ao salvar o viagem!");
                return
            }

        } else {
            var dadosRetorno = await salvarViagem(viagem);
            if (dadosRetorno) {
                alert("Viagem foi salvo com sucesso!");
            } else {
                alert("Erro ao salvar o viagem!");
                return
            }
        }
        router.push("/viagem");
    }
    return (

        <form action={handlerSalvar} className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Origem:
                    </label>
                    <input
                        name="origem"
                        value={viagem.origem}
                        required
                        onChange={(e) => handlerChange('origem', e.target.value)}
                        type="text"
                        placeholder="Bairro A"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Destino:
                    </label>
                    <input
                        name="destino"
                        value={viagem.destino}
                        required
                        onChange={(e) => handlerChange('destino', e.target.value)}
                        type="text"
                        placeholder="Bairro B"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Horário Início:
                        </label>
                        <input
                            name="horarioInicio"
                            value={viagem.horarioInicio}
                            required
                            onChange={(e) => handlerChange('horarioInicio', e.target.value)}
                            type="datetime-local"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors [color-scheme:dark]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Horário Fim:
                        </label>
                        <input
                            name="horarioFim"
                            value={viagem.horarioFim}
                            required
                            onChange={(e) => handlerChange('horarioFim', e.target.value)}
                            type="datetime-local"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors [color-scheme:dark]"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Motorista (ID):
                        </label>
                        <select
                            name="motoristaId"
                            value={viagem.motoristaId || viagem.motorista?.id || ""}
                            required
                            onChange={(e) => handlerChange('motoristaId', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                        >
                            <option value="">Selecione o motorista</option>
                            {motoristas.filter((motorista) => motorista.status === "EM_EXPEDIENTE" || motorista.id === viagem.motorista?.id).map((motorista) => (
                                <option key={motorista.id} value={motorista.id!}>
                                    ID {motorista.id} - {motorista.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Ônibus (ID):
                        </label>
                        <select
                            name="onibusId"
                            value={viagem.onibusId || viagem.onibus?.id || ""}
                            required
                            onChange={(e) => handlerChange('onibusId', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                        >
                            <option value="">Selecione o ônibus</option>
                            {onibusList.filter((onibus) => onibus.status === "GARAGEM" || onibus.id === viagem.onibus?.id).map((onibus) => (
                                <option key={onibus.id} value={onibus.id!}>
                                    ID {onibus.id} - {onibus.placa} ({onibus.modelo})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
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