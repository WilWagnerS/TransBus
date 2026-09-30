"use client"

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import MotoristaForm from "../../components/MotoristaForm";
import { useEffect, useState } from "react";
import { Motorista } from "@/app/types/motorista";
import axios from "axios";

export default function EditarMotorista() {
    const parametro = useParams();
    const codigo = Number(parametro.codigo);

    const [motorista, setMotorista] = useState<Motorista | null>(null);

    const router = useRouter();

    useEffect(() => {

        buscarDados();

    }, []);

    const buscarDados = async () => {

        const valorMotoristaBack = await axios.get<Motorista>('http://localhost:8080/motoristas/' + codigo);

        if (valorMotoristaBack.status == 200) {
            setMotorista(valorMotoristaBack.data);
        } else {

            router.push("/motorista");
        }

    }

    // Se o motorista não existir, ele dará um outro retorno (retorno ambíguo).
    if (!motorista) return (<div className="p-8"> Carregando dados... </div>);


    return (
        <div className="w-full min-h-screen p-6 md:p-10 space-y-6">
            {/* Botão "voltar" fica no canto esquerdo da página */}
            <div>
                <Link
                    href="/motorista"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-orange-500 border border-slate-700/60 hover:border-orange-500/50 shadow-sm transition-all duration-200 group w-fit"
                >
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-700/50 group-hover:bg-orange-500/20 text-slate-400 group-hover:text-orange-500 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="w-3 h-3 transition-transform group-hover:-translate-x-0.5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                    <span>Voltar para Listagem</span>
                </Link>
            </div>

            {/* Título e Subtítulo centralizados e alinhados com o formulário */}
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Motorista cadastrado {codigo}
                </h1>
                <p className="text-slate-400 text-sm md:text-base mt-1">
                    Edite os dados do motorista
                </p>
            </div>

            {/* Formulário centralizado */}
            <div className="max-w-2xl mx-auto">
                <MotoristaForm motoristaExistente={motorista} />
            </div>
        </div>
    );
}