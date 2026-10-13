// Indica que este componente será executado no lado do cliente.
// É necessário porque o componente utiliza useRouter e outras funcionalidades
// que dependem do navegador.
'use client'

// Importa o Axios, utilizado para fazer requisições HTTP para o backend.
import axios from "axios";

// Importa o hook useRouter do Next.js,
// utilizado para redirecionar o usuário para outra página.
import { useRouter } from "next/navigation";

// Importa a interface LoginResponse,
// que representa o formato da resposta do backend após o login.
import { LoginResponse } from "../types/auth";


// Define o componente da página de Login.
export default function Login(){

    // Instancia o roteador para permitir o redirecionamento
    // do usuário após o login.
    const router = useRouter();

    // Cria a função responsável por realizar o login.
    //
    // A função recebe FormData, que contém os dados preenchidos
    // pelo usuário no formulário.
    const handleLogin = async(formData: FormData) =>{

        // Inicia o bloco para tentar realizar a requisição.
        try {

            // Pausa a execução do código quando o navegador
            // está com as ferramentas de desenvolvedor abertas.
            // É utilizado principalmente para depuração.
            debugger;

            // Pega o valor digitado no campo "email".
            //
            // toString() transforma o valor em texto.
            // ?? "" garante que, caso o campo não exista,
            // será utilizada uma string vazia.
            const emailTela = formData.get("email")?.toString() ?? "";

            // Pega o valor digitado no campo "senha".
            const senhaTela = formData.get("senha")?.toString() ?? "";

            // Faz a requisição para o backend para autenticar o usuário.
            //
            // await faz o código esperar a resposta do backend
            // antes de continuar.
            //
            // LoginResponse informa ao TypeScript que a resposta esperada
            // possui o formato definido na interface LoginResponse.
            var loginResposta = await axios.post<LoginResponse>("http://localhost:8080/auth/login", 
            {email:emailTela,senha:senhaTela});


            // Verifica se o backend respondeu com o status HTTP 200.
            if(loginResposta.status==200){

                // Se o login for realizado com sucesso,
                // redireciona o usuário para a página Home.
                router.push("/home")
            }else{

                // Caso a resposta não seja 200,
                // informa que as credenciais são inválidas.
                alert("Login ou senha Invalido!")
            }

        // Captura qualquer erro ocorrido durante a requisição
        // ou durante o processamento do login.
        } catch (error) {

            // Exibe uma mensagem informando que o login
            // ou a senha são inválidos.
            alert("Login ou senha Invalido!")
        }
    }

    return (
        // Container principal da tela de login.
        // min-h-screen → ocupa no mínimo toda a altura da tela.
        // flex items-center justify-center → centraliza o conteúdo
        // horizontal e verticalmente.
        // bg-gradient-to-r → cria um gradiente da esquerda para a direita.
        // px-4 → adiciona espaçamento horizontal.
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020617] to-[#0d2872] px-4">

            {/* Container do formulário de login. */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-slate-800">

                {/* Área do título e descrição da tela. */}
                <div className="text-center">

                    {/* Título principal da tela. */}
                    <h1 className="text-3xl font-bold text-slate-900">
                        Entrar no sistema
                    </h1>

                    {/* Texto auxiliar explicando que o usuário
                    deve informar suas credenciais. */}
                    <p className="text-sm text-slate-400">Insira suas credenciais para acessar.</p>
                </div>

                {/* Formulário de login.
                Faz com que a função handleLogin
                seja executada quando o formulário for enviado. */}
                <form action={handleLogin} className="flex flex-col space-y-5">

                    {/* Container do campo de e-mail. */}
                    <div className="flex flex-col space-y-1">

                        {/* Texto que identifica o campo de e-mail. */}
                        <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                            E-Mail
                        </label>

                        {/* Campo onde o usuário informa o e-mail.
                        name="email" é importante porque permite que
                        formData.get("email") encontre esse valor. */}
                        <input
                            name="email"
                            type="email"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        > 
                        </input>
                    </div>

                    {/* Container do campo de senha. */}
                    <div className="flex flex-col space-y-1">

                        {/* Texto que identifica o campo de senha. */}
                        <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                            senha
                        </label>

                        {/* Campo onde o usuário informa a senha.
                        type="password" faz com que os caracteres
                        digitados sejam ocultados.
                        name="senha" permite que o valor seja recuperado
                        através de formData.get("senha"). */}
                        <input
                            name="senha"
                            type="password"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                        </input>
                    </div>

                    {/* Botão responsável por enviar o formulário. */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}