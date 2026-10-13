"use client"

import { Motorista } from "@/app/types/motorista";
import { Onibus } from "@/app/types/onibus";
import { Viagem, ViagemFormProps } from "@/app/types/viagem";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViagemForm({ viagemExistente }: ViagemFormProps) {



    // Hook usado para navegar entre as páginas do sistema.
    const router = useRouter();



    // Estado que armazena a lista de motoristas vindos do backend.
    const [motoristas, setMotoristas] = useState<Motorista[]>([]);

    // Estado que armazena a lista de ônibus vindos do backend.
    const [onibusList, setOnibusList] = useState<Onibus[]>([]);



    // Executa o carregamento dos motoristas e ônibus quando o componente é iniciado.
    useEffect(() => {

        carregarDependencias();

    }, []);



    // Função responsável por buscar os dados necessários para preencher os selects.
    const carregarDependencias = async () => {

        try {

            // Busca motoristas e ônibus cadastrados ao mesmo tempo.
            // Promise.all permite aguardar as duas requisições antes de continuar.
            const [resMotoristas, resOnibus] = await Promise.all([

                // Busca todos os motoristas cadastrados no backend.
                axios.get<Motorista[]>("http://localhost:8080/motoristas"),

                // Busca todos os ônibus cadastrados no backend.
                axios.get<Onibus[]>("http://localhost:8080/onibus")

            ]);



            // Guarda no estado a lista de motoristas recebida do backend.
            setMotoristas(resMotoristas.data);

            // Guarda no estado a lista de ônibus recebida do backend.
            setOnibusList(resOnibus.data);

        } catch (error) {

            // Exibe no console caso aconteça algum erro nas requisições.
            console.error("Erro ao carregar dados auxiliares:", error);

        }

    }



    // Estado que representa os dados da viagem que estão sendo cadastrados ou editados.
    // Se existir uma viagem recebida por parâmetro, ela será usada.
    // Caso contrário, cria uma nova viagem com valores iniciais.
    const [viagem, setViagem] = useState<Viagem>
        (viagemExistente || new Viagem(null, "", "", "", "", 0, 0, "AGENDADA"));



    // Função responsável por alterar um campo específico da viagem.
    // O campo recebido determina qual propriedade será modificada.
    // Os demais campos permanecem com os valores anteriores.
    const handlerChange = (campo: 'origem' | 'destino' | 'horarioInicio' | 'horarioFim' | 'motoristaId' | 'onibusId', valor: string) => {

        // Atualiza o estado da viagem usando os dados anteriores como base.
        setViagem(valorAnterior =>

            // Cria uma nova instância de Viagem mantendo a ordem do construtor.
            new Viagem(

                // Mantém o ID da viagem.
                valorAnterior.id,

                // Altera a origem somente se esse for o campo selecionado.
                campo === 'origem' ? valor : valorAnterior.origem,

                // Altera o destino somente se esse for o campo selecionado.
                campo === 'destino' ? valor : valorAnterior.destino,

                // Altera o horário de início somente se esse for o campo selecionado.
                campo === 'horarioInicio' ? valor : valorAnterior.horarioInicio,

                // Altera o horário de fim somente se esse for o campo selecionado.
                campo === 'horarioFim' ? valor : valorAnterior.horarioFim,

                // Converte o valor do motorista de string para número.
                campo === 'motoristaId' ? Number(valor) : valorAnterior.motoristaId,

                // Converte o valor do ônibus de string para número.
                campo === 'onibusId' ? Number(valor) : valorAnterior.onibusId,

                // Mantém o status atual da viagem.
                valorAnterior.status

            )

        )

    }



    // Função executada quando o formulário é enviado.
    const handlerSalvar = async (formData: FormData) => {



        // Verifica se existe uma viagem recebida anteriormente.
        // Se existir, significa que estamos editando uma viagem.
        if (viagemExistente) {

            // Envia os dados atualizados da viagem para o endpoint PUT.
            var dadosRetorno = await axios.put<number>('http://localhost:8080/viagem/' + viagem.id, viagem);



            // Verifica se o backend retornou status 200, indicando sucesso.
            if (dadosRetorno.status == 200) {

                // Informa ao usuário que a viagem foi salva.
                alert("Viagem foi salvo com sucesso!");



            } else {

                // Exibe a mensagem retornada pelo backend caso algo dê errado.
                alert(dadosRetorno.data);



                // Interrompe a execução da função.
                return

            }



        } else {

            // Caso seja uma nova viagem, envia os dados através do método POST.
            var dadosRetorno = await axios.post<number>('http://localhost:8080/viagem', viagem);



            // Verifica se o cadastro foi realizado com sucesso.
            if (dadosRetorno.status == 200) {

                // Informa ao usuário que a viagem foi salva.
                alert("Viagem foi salvo com sucesso!");



            } else {

                // Exibe a mensagem retornada pelo backend.
                alert(dadosRetorno.data);



                // Interrompe a execução da função.
                return

            }



        }

        // Após salvar a viagem, retorna para a página de listagem.
        router.push("/viagem");

    }



    // Retorna a estrutura visual do formulário.
    return (

        // Formulário responsável pelo cadastro ou edição da viagem.
        <form action={handlerSalvar} className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">

            <div className="space-y-6">

                {/* Campo responsável pela origem da viagem. */}
                <div>

                    <label className="block text-sm font-medium text-slate-300 mb-2">

                        Origem:

                    </label>

                    <input

                        // Nome utilizado para identificar o campo do formulário.
                        name="origem"

                        // Mostra no input o valor atual da origem.
                        value={viagem.origem}

                        // Torna o preenchimento obrigatório.
                        required

                        // Quando o usuário digita, chama handlerChange para atualizar a origem.
                        onChange={(e) => handlerChange('origem', e.target.value)}

                        // Define que o campo recebe texto.
                        type="text"

                        // Texto exibido quando o campo está vazio.
                        placeholder="Bairro A"

                        // Classes Tailwind responsáveis pela aparência do campo.
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"

                    />

                </div>



                {/* Campo responsável pelo destino da viagem. */}
                <div>

                    <label className="block text-sm font-medium text-slate-300 mb-2">

                        Destino:

                    </label>

                    <input

                        // Nome utilizado para identificar o campo do formulário.
                        name="destino"

                        // Mostra no input o destino atual.
                        value={viagem.destino}

                        // Torna o preenchimento obrigatório.
                        required

                        // Atualiza o destino sempre que o usuário digita.
                        onChange={(e) => handlerChange('destino', e.target.value)}

                        // Define que o campo recebe texto.
                        type="text"

                        // Exemplo exibido quando o campo está vazio.
                        placeholder="Bairro B"

                        // Classes responsáveis pela aparência do campo.
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"

                    />

                </div>



                {/* Organiza os campos de horário em duas colunas. */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>

                        <label className="block text-sm font-medium text-slate-300 mb-2">

                            Horário Início:

                        </label>

                        <input

                            // Nome do campo de horário inicial.
                            name="horarioInicio"

                            // Mostra o horário de início armazenado na viagem.
                            value={viagem.horarioInicio}

                            // Torna o preenchimento obrigatório.
                            required

                            // Atualiza o horário de início no estado.
                            onChange={(e) => handlerChange('horarioInicio', e.target.value)}

                            // Campo específico para data e hora.
                            type="datetime-local"

                            // Classes responsáveis pela aparência do campo.
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors [color-scheme:dark]"

                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium text-slate-300 mb-2">

                            Horário Fim:

                        </label>

                        <input

                            // Nome do campo de horário final.
                            name="horarioFim"

                            // Mostra o horário final armazenado na viagem.
                            value={viagem.horarioFim}

                            // Torna o preenchimento obrigatório.
                            required

                            // Atualiza o horário final no estado.
                            onChange={(e) => handlerChange('horarioFim', e.target.value)}

                            // Campo específico para data e hora.
                            type="datetime-local"

                            // Classes responsáveis pela aparência do campo.
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors [color-scheme:dark]"

                        />

                    </div>

                </div>



                {/* Área responsável pela seleção do motorista e do ônibus. */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Seleção do motorista responsável pela viagem. */}
                    <div>

                        <label className="block text-sm font-medium text-slate-300 mb-2">

                            Motorista (ID):

                        </label>

                        <select

                            // Nome utilizado para identificar o motorista selecionado.
                            name="motoristaId"

                            // Mostra o motorista atualmente selecionado.
                            value={viagem.motoristaId || viagem.motorista?.id || ""}

                            // Torna a seleção obrigatória.
                            required

                            // Quando selecionado, atualiza o motorista da viagem.
                            onChange={(e) => handlerChange('motoristaId', e.target.value)}

                            // Classes responsáveis pela aparência do select.
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"

                        >

                            {/* Opção inicial exibida antes da seleção de um motorista. */}
                            <option value="">Selecione o motorista</option>

                            {/* Filtra somente motoristas em expediente ou o motorista que já pertence à viagem. */}
                            {motoristas.filter((motorista) => motorista.status === "EM_EXPEDIENTE" || motorista.id === viagem.motorista?.id).map((motorista) => (

                                // Cada opção recebe uma chave baseada no ID do motorista.
                                <option key={motorista.id} value={motorista.id!}>

                                    {/* Exibe o ID e o nome do motorista. */}
                                    ID {motorista.id} - {motorista.nome}

                                </option>

                            ))}

                        </select>

                    </div>



                    {/* Seleção do ônibus responsável pela viagem. */}
                    <div>

                        <label className="block text-sm font-medium text-slate-300 mb-2">

                            Ônibus (ID):

                        </label>

                        <select

                            // Nome utilizado para identificar o ônibus selecionado.
                            name="onibusId"

                            // Mostra o ônibus atualmente selecionado.
                            value={viagem.onibusId || viagem.onibus?.id || ""}

                            // Torna a seleção obrigatória.
                            required

                            // Quando selecionado, atualiza o ônibus da viagem.
                            onChange={(e) => handlerChange('onibusId', e.target.value)}

                            // Classes responsáveis pela aparência do select.
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"

                        >

                            {/* Opção inicial exibida antes da seleção de um ônibus. */}
                            <option value="">Selecione o ônibus</option>

                            {/* Filtra somente ônibus na garagem ou o ônibus que já pertence à viagem. */}
                            {onibusList.filter((onibus) => onibus.status === "GARAGEM" || onibus.id === viagem.onibus?.id).map((onibus) => (

                                // Cada opção recebe uma chave baseada no ID do ônibus.
                                <option key={onibus.id} value={onibus.id!}>

                                    {/* Exibe ID, placa e modelo do ônibus. */}
                                    ID {onibus.id} - {onibus.placa} ({onibus.modelo})

                                </option>

                            ))}

                        </select>

                    </div>

                </div>



                {/* Área que contém os botões de cancelar e salvar. */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-800">

                    <Link

                        // Ao clicar, retorna para a tela de viagens.
                        href="/viagem"

                        // Classes responsáveis pela aparência do botão cancelar.
                        className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white font-medium text-sm transition-colors"

                    >

                        Cancelar

                    </Link>

                    <button

                        // Define que o botão envia o formulário.
                        type="submit"

                        // Classes responsáveis pela aparência do botão salvar.
                        className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm transition-colors shadow-lg shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"

                    >

                        Salvar

                    </button>

                </div>

            </div>

        </form>

    );

}