"use client"

import { atualizarVeiculo, salvarVeiculo } from "@/app/services/veiculoService";
import { mensagemDeErro } from "@/app/services/api";
import { Veiculo, VeiculoFormProps } from "@/app/types/veiculo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const estiloInput = "w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors";

export default function VeiculoForm({ veiculoExistente }: VeiculoFormProps) {

    const router = useRouter();

    const [veiculo, setVeiculo] = useState<Veiculo>
        (veiculoExistente || new Veiculo(null, "", "", "", "ONIBUS", "GARAGEM"));

    const handlerChange = (campo: 'placa' | 'modelo' | 'capacidade' | 'tipo', valor: string) => {
        setVeiculo(valorAnterior =>
            new Veiculo(
                valorAnterior.id,
                campo === 'placa' ? valor : valorAnterior.placa,
                campo === 'modelo' ? valor : valorAnterior.modelo,
                campo === 'capacidade' ? valor : valorAnterior.capacidade,
                campo === 'tipo' ? valor : valorAnterior.tipo,
                valorAnterior.status,
            )
        )
    }

    const handlerSalvar = async () => {
        try {
            if (veiculoExistente) {
                await atualizarVeiculo(veiculo);
            } else {
                await salvarVeiculo(veiculo);
            }
            alert("Veículo salvo com sucesso!");
            router.push("/veiculos");
        } catch (error) {
            const msg = mensagemDeErro(error, "Erro ao salvar o veículo!");
            if (msg) alert(msg);
        }
    }

    return (
        <form action={handlerSalvar} className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Tipo:</label>
                    <select
                        name="tipo"
                        value={veiculo.tipo}
                        onChange={(e) => handlerChange('tipo', e.target.value)}
                        className={estiloInput}
                    >
                        <option value="ONIBUS">Ônibus (passageiros)</option>
                        <option value="CAMINHAO">Caminhão (carga)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Placa:</label>
                    <input
                        name="placa"
                        value={veiculo.placa}
                        required
                        onChange={(e) => handlerChange('placa', e.target.value)}
                        type="text"
                        placeholder="ABC-1234 ou ABC1D23"
                        className={estiloInput}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Modelo:</label>
                    <input
                        name="modelo"
                        value={veiculo.modelo}
                        required
                        onChange={(e) => handlerChange('modelo', e.target.value)}
                        type="text"
                        placeholder={veiculo.tipo === "CAMINHAO" ? "Ex: Volvo FH 540" : "Ex: Marcopolo Paradiso 1800 DD"}
                        className={estiloInput}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Capacidade:</label>
                    <input
                        name="capacidade"
                        value={veiculo.capacidade}
                        required
                        onChange={(e) => handlerChange('capacidade', e.target.value)}
                        type="text"
                        placeholder={veiculo.tipo === "CAMINHAO" ? "Ex: 30 toneladas" : "Ex: 44 passageiros"}
                        className={estiloInput}
                    />
                </div>
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-800">
                    <Link
                        href="/veiculos"
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