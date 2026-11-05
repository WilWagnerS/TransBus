"use client"

import { atualizarOnibus, salvarOnibus } from "@/app/services/onibusService";
import { Onibus, OnibusFormProps } from "@/app/types/onibus";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnibusForm({ onibusExistente }: OnibusFormProps) {

    const router = useRouter();

    const [onibus, setOnibus] = useState<Onibus>
        (onibusExistente || new Onibus(null, "", "", "", "GARAGEM"));

    const handlerChange = (campo: 'placa' | 'modelo' | 'capacidade', valor: string) => {
        setOnibus(valorAnterior =>
            new Onibus(
                valorAnterior.id,
                campo === 'placa' ? valor : valorAnterior.placa,
                campo === 'modelo' ? valor : valorAnterior.modelo,
                campo === 'capacidade' ? valor : valorAnterior.capacidade,
                valorAnterior.status,
            )
        )
    }

    const handlerSalvar = async (formData: FormData) => {
        if (onibusExistente) {
            var dadosRetorno = await atualizarOnibus(onibus);
            if (dadosRetorno) {
                alert("Onibus foi salvo com sucesso!");
            } else {
                alert("Erro ao atualizar Onibus!");
                return
            }

        } else {
            var dadosRetorno = await salvarOnibus(onibus);
            if (dadosRetorno) {
                alert("Onibus foi salvo com sucesso!");
            } else {
                alert("Erro ao salvar Onibus!");
                return
            }
        }
        router.push("/onibus");
    }

    return (
        <form action={handlerSalvar} className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Placa:
                    </label>
                    <input
                        name="placa"
                        value={onibus.placa}
                        required
                        onChange={(e) => handlerChange('placa', e.target.value)}
                        type="text"
                        placeholder="ABC-1234 ou ABC1D23"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Modelo:
                    </label>
                    <input
                        name="modelo"
                        value={onibus.modelo}
                        required
                        onChange={(e) => handlerChange('modelo', e.target.value)}
                        type="text"
                        placeholder="Ex: Marcopolo Paradiso 1800 DD"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Capacidade (passageiros):
                    </label>
                    <input
                        name="capacidade"
                        value={onibus.capacidade}
                        required
                        onChange={(e) => handlerChange('capacidade', e.target.value)}
                        type="number"
                        placeholder="Ex: 44"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                </div>
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-800">
                    <Link
                        href="/onibus"
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