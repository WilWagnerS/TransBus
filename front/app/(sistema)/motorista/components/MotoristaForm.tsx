"use client"

import { Motorista, MotoristaFormProps } from "@/app/types/motorista";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MotoristaForm({ motoristaExistente }: MotoristaFormProps) {

    const router = useRouter();

    const [motorista, setMotorista] = useState<Motorista>
        (motoristaExistente || new Motorista(null, "", "", "", "EM_EXPEDIENTE"));

    const handlerChange = (campo: 'nome' | 'cnh' | 'telefone', valor: string) => {
        setMotorista(valorAnterior =>
            new Motorista(
                valorAnterior.id,
                campo === 'nome' ? valor : valorAnterior.nome,
                campo === 'cnh' ? valor : valorAnterior.cnh,
                campo === 'telefone' ? valor : valorAnterior.telefone,
                valorAnterior.status,
            )
        )
    }

    const handlerSalvar = async (formData: FormData) => {

        if (motoristaExistente) {
            var dadosRetorno = await axios.put<number>('http://localhost:8080/motoristas/' + motorista.id, motorista);

            if (dadosRetorno.status == 200) {
                alert("Motorista foi salvo em sucesso!");
            } else {
                alert(dadosRetorno.data);

                return;
            }
        } else {
            var dadosRetorno = await axios.post<number>('http://localhost:8080/motoristas', motorista);

            if (dadosRetorno.status == 200) {
                alert("Motorista foi salvo om sucesso!");
            } else {
                alert(dadosRetorno.data);

                return;
            }
        }
        router.push("/motorista");
    }


    return (
        <form action={handlerSalvar} className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="space-y-6">
                {/* Nome Completo */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Nome completo:
                    </label>
                    <input
                        name="nome"
                        value={motorista.nome}
                        required
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        type="text"
                        placeholder="Digite o nome completo"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                {/* CNH */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        CNH:
                    </label>
                    <input
                        name="cnh"
                        value={motorista.cnh}
                        onChange={(e) => handlerChange('cnh', e.target.value)}
                        type="text"
                        placeholder="00000000000"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                {/* Telefone */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Telefone:
                    </label>
                    <input
                        name="telefone"
                        value={motorista.telefone}
                        required
                        onChange={(e) => handlerChange('telefone', e.target.value)}
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-800">
                    <Link
                        href="/motorista"
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