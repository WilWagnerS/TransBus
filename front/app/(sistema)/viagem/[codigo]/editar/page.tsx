"use client"

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ViagemForm from "../../components/ViagemForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Viagem } from "@/app/types/viagem";


// Define o componente responsável pela edição de uma viagem.
export default function EditarViagem() {

    // Obtém os parâmetros presentes na URL.
    const parametro = useParams();

    // Converte o parâmetro "codigo" da URL para número.
    const codigo = Number(parametro.codigo);

    // Cria o estado que armazenará os dados da viagem.
    // Inicialmente, a viagem ainda não foi carregada, por isso recebe null.
    const [viagem, setViagem] = useState<Viagem | null>(null)

    // Instancia o roteador para permitir redirecionamentos.
    const router = useRouter();

    // Executa a função buscarDados quando o componente é carregado.
    useEffect(() => {

        // Busca os dados da viagem no backend.
        buscarDados();

    }, []);

    // Função responsável por buscar os dados da viagem pelo código.
    const buscarDados = async () => {

        // Faz uma requisição GET para buscar a viagem pelo ID.
        const valorViagemBack = await axios.get<Viagem>('http://localhost:8080/viagem/' + codigo);

        // Verifica se o backend retornou o status 200.
        if (valorViagemBack.status == 200) {

            // Armazena os dados da viagem no estado.
            setViagem(valorViagemBack.data);
        } else {

            // Se a viagem não for encontrada, redireciona para a listagem de viagens.
            router.push("/viagem")
        }
    }

    // Se a viagem ainda não existir no estado, exibe uma mensagem
    // informando que os dados ainda estão sendo carregados.
    if (!viagem) return (<div className="p-8"> Carregando dados...</div>)

    return (
        // Container principal da página de edição.
        <div className="w-full min-h-screen p-6 md:p-10 space-y-6">

            <div>
                {/* Link utilizado para voltar para a listagem de viagens. */}
                <Link
                    href="/viagem"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-orange-500 border border-slate-700/60 hover:border-orange-500/50 shadow-sm transition-all duration-200 group w-fit"
                >

                    {/* Container do ícone utilizado no botão de voltar. */}
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-700/50 group-hover:bg-orange-500/20 text-slate-400 group-hover:text-orange-500 transition-colors">

                        {/* Ícone SVG representando uma seta para voltar. */}
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

                    {/* Texto exibido no botão de retorno. */}
                    <span>Voltar para Listagem</span>
                </Link>
            </div>

            {/* Container que limita a largura do conteúdo. */}
            <div className="max-w-2xl mx-auto">

                {/* Exibe o título informando qual viagem está sendo editada. */}
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Viagem cadastrada {codigo}
                </h1>

                {/* Texto auxiliar informando que os dados podem ser editados. */}
                <p className="text-slate-400 text-sm md:text-base mt-1">
                    Edite os dados da viagem
                </p>
            </div>

            {/* Container do formulário de viagem. */}
            <div className="max-w-2xl mx-auto">

                {/* Renderiza o formulário e passa a viagem existente
                para que seus dados sejam carregados para edição. */}
                <ViagemForm viagemExistente={viagem} />
            </div>
        </div>
    );
}