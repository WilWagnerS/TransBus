"use client"

import { AppDispatch, RootState } from "@/app/redux/store";
import { carregarVeiculos } from "@/app/redux/slice/veiculoSlice";
import { atualizarViagem, salvarViagem } from "@/app/services/viagemService";
import { buscarListaMotoristas } from "@/app/services/motoristaService";
import { mensagemDeErro } from "@/app/services/api";
import { Motorista } from "@/app/types/motorista";
import { Viagem, ViagemFormProps } from "@/app/types/viagem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const estiloInput = "w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors";

// Quem NÃO pode ser escolhido (mesma regra do backend)
const MOTORISTA_INDISPONIVEL = ["INDISPONIVEL", "EXCLUIDO"];
const VEICULO_INDISPONIVEL = ["AVARIADO", "EM_MANUTENCAO", "EXCLUIDO"];

// "2026-11-10T08:00:00" -> "2026-11-10T08:00" (formato do input datetime-local)
function paraInput(data: string) {
    return data ? data.substring(0, 16) : "";
}

export default function ViagemForm({ viagemExistente }: ViagemFormProps) {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // Veículos vêm da STORE do Redux (veiculoSlice)
    const veiculos = useSelector((state: RootState) => state.veiculos.lista);

    const [motoristas, setMotoristas] = useState<Motorista[]>([]);

    useEffect(() => {
        dispatch(carregarVeiculos());
        carregarMotoristas();
    }, [dispatch]);

    const carregarMotoristas = async () => {
        try {
            setMotoristas(await buscarListaMotoristas());
        } catch (error) {
            const msg = mensagemDeErro(error, "Erro ao carregar os motoristas!");
            if (msg) alert(msg);
        }
    }

    const [viagem, setViagem] = useState<Viagem>(
        viagemExistente
            ? new Viagem(
                viagemExistente.id,
                viagemExistente.origem,
                viagemExistente.destino,
                paraInput(viagemExistente.horarioInicio),
                paraInput(viagemExistente.horarioFim),
                viagemExistente.motoristaId,
                viagemExistente.veiculoId,
                viagemExistente.status)
            : new Viagem(null, "", "", "", "", null, null, "AGENDADA")
    );

    const handlerChange = (campo: 'origem' | 'destino' | 'horarioInicio' | 'horarioFim' | 'motoristaId' | 'veiculoId', valor: string) => {
        setViagem(valorAnterior =>
            new Viagem(
                valorAnterior.id,
                campo === 'origem' ? valor : valorAnterior.origem,
                campo === 'destino' ? valor : valorAnterior.destino,
                campo === 'horarioInicio' ? valor : valorAnterior.horarioInicio,
                campo === 'horarioFim' ? valor : valorAnterior.horarioFim,
                campo === 'motoristaId' ? (valor ? Number(valor) : null) : valorAnterior.motoristaId,
                campo === 'veiculoId' ? (valor ? Number(valor) : null) : valorAnterior.veiculoId,
                valorAnterior.status
            )
        )
    }

    const handlerSalvar = async () => {
        try {
            if (viagemExistente) {
                await atualizarViagem(viagem);
            } else {
                await salvarViagem(viagem);
            }
            alert("Viagem salva com sucesso!");
            router.push("/viagem");
        } catch (error) {
            // Mostra a regra de negócio do backend (ex.: "Motorista já possui uma viagem nesse período!")
            const msg = mensagemDeErro(error, "Erro ao salvar a viagem!");
            if (msg) alert(msg);
        }
    }

    // Lista só quem pode ser escolhido (ou o que já está na viagem, na edição)
    const motoristasDisponiveis = motoristas.filter((m) =>
        !MOTORISTA_INDISPONIVEL.includes(m.status) || m.id === viagem.motoristaId);
    const veiculosDisponiveis = veiculos.filter((v) =>
        !VEICULO_INDISPONIVEL.includes(v.status) || v.id === viagem.veiculoId);

    return (
        <form action={handlerSalvar} className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="space-y-6">

                {viagemExistente && viagemExistente.veiculoId == null && (
                    <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        ⚠️ O veículo desta viagem foi marcado como <b>AVARIADO</b> e foi desvinculado.
                        Escolha outro veículo para que a viagem possa ser iniciada.
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Origem:</label>
                        <input
                            name="origem"
                            value={viagem.origem}
                            required
                            onChange={(e) => handlerChange('origem', e.target.value)}
                            type="text"
                            placeholder="Ex: Criciúma"
                            className={estiloInput}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Destino:</label>
                        <input
                            name="destino"
                            value={viagem.destino}
                            required
                            onChange={(e) => handlerChange('destino', e.target.value)}
                            type="text"
                            placeholder="Ex: Florianópolis"
                            className={estiloInput}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Início:</label>
                        <input
                            name="horarioInicio"
                            value={viagem.horarioInicio}
                            required
                            onChange={(e) => handlerChange('horarioInicio', e.target.value)}
                            type="datetime-local"
                            className={estiloInput}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Fim:</label>
                        <input
                            name="horarioFim"
                            value={viagem.horarioFim}
                            required
                            onChange={(e) => handlerChange('horarioFim', e.target.value)}
                            type="datetime-local"
                            className={estiloInput}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Motorista:</label>
                    <select
                        name="motoristaId"
                        value={viagem.motoristaId ?? ""}
                        required
                        onChange={(e) => handlerChange('motoristaId', e.target.value)}
                        className={estiloInput}
                    >
                        <option value="">Selecione o motorista</option>
                        {motoristasDisponiveis.map((motorista) => (
                            <option key={motorista.id} value={motorista.id!}>
                                ID {motorista.id} - {motorista.nome} ({motorista.status})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Veículo:</label>
                    <select
                        name="veiculoId"
                        value={viagem.veiculoId ?? ""}
                        required
                        onChange={(e) => handlerChange('veiculoId', e.target.value)}
                        className={estiloInput}
                    >
                        <option value="">Selecione o veículo</option>
                        {veiculosDisponiveis.map((veiculo) => (
                            <option key={veiculo.id} value={veiculo.id!}>
                                {veiculo.tipo === "CAMINHAO" ? "🚚" : "🚌"} ID {veiculo.id} - {veiculo.placa} ({veiculo.modelo})
                            </option>
                        ))}
                    </select>
                    <p className="text-xs text-slate-500 mt-1">
                        Veículos avariados ou em manutenção não aparecem na lista.
                    </p>
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
                        className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm transition-colors shadow-lg shadow-orange-500/20"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </form>
    );
}