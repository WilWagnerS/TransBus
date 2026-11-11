"use client"

import { atualizarMotorista, buscarEnderecoPorCep, salvarMotorista } from "@/app/services/motoristaService";
import { mensagemDeErro } from "@/app/services/api";
import { Endereco, Motorista, MotoristaFormProps } from "@/app/types/motorista";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const estiloInput = "w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors";
const estiloSomenteLeitura = "w-full bg-slate-800/50 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-300";

export default function MotoristaForm({ motoristaExistente }: MotoristaFormProps) {

    const router = useRouter();

    const [motorista, setMotorista] = useState<Motorista>
        (motoristaExistente || new Motorista(null, "", "", "", "EM_EXPEDIENTE"));

    // Endereço: o usuário digita só CEP e número; o resto vem do ViaCEP
    const [cep, setCep] = useState(motoristaExistente?.endereco?.cep ?? "");
    const [numero, setNumero] = useState(motoristaExistente?.endereco?.numero ?? "");
    const [endereco, setEndereco] = useState<Endereco | null>(motoristaExistente?.endereco ?? null);
    const [buscandoCep, setBuscandoCep] = useState(false);
    const [erroCep, setErroCep] = useState("");

    const handlerChange = (campo: 'nome' | 'cnh' | 'telefone', valor: string) => {
        setMotorista(valorAnterior =>
            new Motorista(
                valorAnterior.id,
                campo === 'nome' ? valor : valorAnterior.nome,
                campo === 'cnh' ? valor : valorAnterior.cnh,
                campo === 'telefone' ? valor : valorAnterior.telefone,
                valorAnterior.status,
                valorAnterior.endereco
            )
        )
    }

    // Ao completar 8 dígitos, busca o endereço (backend -> ViaCEP)
    const handlerCep = async (valor: string) => {
        setCep(valor);
        const somenteNumeros = valor.replace(/\D/g, "");

        if (somenteNumeros.length !== 8) {
            setEndereco(null);
            setErroCep("");
            return;
        }

        setBuscandoCep(true);
        setErroCep("");
        try {
            const enderecoEncontrado = await buscarEnderecoPorCep(somenteNumeros);
            setEndereco(enderecoEncontrado);
        } catch (error) {
            setEndereco(null);
            const msg = mensagemDeErro(error, "CEP não encontrado!");
            if (msg) setErroCep(msg);
        } finally {
            setBuscandoCep(false);
        }
    }

    const handlerSalvar = async () => {
        try {
            if (motoristaExistente) {
                await atualizarMotorista(motorista, cep, numero);
            } else {
                await salvarMotorista(motorista, cep, numero);
            }
            alert("Motorista foi salvo com sucesso!");
            router.push("/motorista");
        } catch (error) {
            const msg = mensagemDeErro(error, "Erro ao salvar o motorista!");
            if (msg) alert(msg);
        }
    }

    return (
        <form action={handlerSalvar} className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Nome completo:</label>
                    <input
                        name="nome"
                        value={motorista.nome}
                        required
                        onChange={(e) => handlerChange('nome', e.target.value)}
                        type="text"
                        placeholder="Digite o nome completo"
                        className={estiloInput}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">CNH:</label>
                        <input
                            name="cnh"
                            value={motorista.cnh}
                            onChange={(e) => handlerChange('cnh', e.target.value)}
                            type="text"
                            placeholder="00000000000"
                            className={estiloInput}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Telefone:</label>
                        <input
                            name="telefone"
                            value={motorista.telefone}
                            required
                            onChange={(e) => handlerChange('telefone', e.target.value)}
                            type="tel"
                            placeholder="(00) 00000-0000"
                            className={estiloInput}
                        />
                    </div>
                </div>

                {/* ===== ENDEREÇO (ViaCEP) ===== */}
                <div className="pt-4 border-t border-slate-800 space-y-4">
                    <h2 className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                        Endereço (preenchido automaticamente pelo CEP)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-300 mb-2">CEP:</label>
                            <input
                                name="cep"
                                value={cep}
                                onChange={(e) => handlerCep(e.target.value)}
                                type="text"
                                maxLength={9}
                                placeholder="00000-000"
                                className={estiloInput}
                            />
                            {buscandoCep && <p className="text-xs text-slate-400 mt-1">Buscando endereço...</p>}
                            {erroCep && <p className="text-xs text-red-400 mt-1">{erroCep}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Número:</label>
                            <input
                                name="numero"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                type="text"
                                placeholder="Ex: 100"
                                className={estiloInput}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Logradouro:</label>
                        <input value={endereco?.logradouro ?? ""} readOnly placeholder="—" className={estiloSomenteLeitura} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Bairro:</label>
                            <input value={endereco?.bairro ?? ""} readOnly placeholder="—" className={estiloSomenteLeitura} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Cidade:</label>
                            <input value={endereco?.cidade ?? ""} readOnly placeholder="—" className={estiloSomenteLeitura} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">UF:</label>
                            <input value={endereco?.uf ?? ""} readOnly placeholder="—" className={estiloSomenteLeitura} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-800">
                    <Link
                        href="/motorista"
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