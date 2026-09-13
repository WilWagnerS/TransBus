'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { LoginResponse } from "../types/auth";
import { catchError } from "next/error";


export default function Login(){
    const router = useRouter();
    const handleLogin = async(formData: FormData) =>{
        try {
            debugger;
            const emailTela = formData.get("email")?.toString() ?? "";
            const senhaTela = formData.get("senha")?.toString() ?? "";

            // Faz a requisição para o backend para autenticar o usuário - Await para aguardar a resposta da requisição
            var loginResposta = await axios.post<LoginResponse>("http://localhost:8080/auth/login", 
            {email:emailTela,senha:senhaTela});


            if(loginResposta.status==200){
                router.push("/home")
            }else{
                alert("Login ou senha Invalido!")
            }
        } catch (error) {
            alert("Login ou senha Invalido!")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#020617] to-[#0d2872] px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-slate-800">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Entrar no sistema
                    </h1>
                    <p className="text-sm text-slate-400">Insira suas credenciais para acessar.</p>
                </div>
                <form action={handleLogin} className="flex flex-col space-y-5">

                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                            E-Mail
                        </label>
                        <input
                            name="email"
                            type="email"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        > 
                        </input>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                            senha
                        </label>
                        <input
                            name="senha"
                            type="password"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                        >
                        </input>
                    </div>
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