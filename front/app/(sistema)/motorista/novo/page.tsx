"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function NovoMotorista() {
  const [nome, setNome] = useState("");
  const [cnh, setCnh] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("");

    try {
      const response = await fetch(
        "http://localhost:8080/motoristas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            cnh,
            telefone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao cadastrar motorista.");
      }

      setMensagem("Motorista cadastrado com sucesso!");

      setNome("");
      setCnh("");
      setTelefone("");

    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setMensagem(error.message);
      } else {
        setMensagem("Erro ao cadastrar motorista.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#020617] to-[#0d2872] p-6 md:p-10">

      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">

        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Cadastrar Motorista
        </h1>

        <Link
          href="/motoristas"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm rounded-lg transition"
        >
          Voltar
        </Link>

      </div>

      {/* FORMULÁRIO */}
      <div className="mt-8 max-w-3xl bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* NOME */}
          <div className="flex flex-col space-y-2">

            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Nome
            </label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do motorista"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

          {/* CNH */}
          <div className="flex flex-col space-y-2">

            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              CNH
            </label>

            <input
              type="text"
              value={cnh}
              onChange={(e) => setCnh(e.target.value)}
              placeholder="Digite o número da CNH"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

          {/* TELEFONE */}
          <div className="flex flex-col space-y-2">

            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Telefone
            </label>

            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(48) 99999-9999"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

          {/* MENSAGEM */}
          {mensagem && (
            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">

              <p className="text-sm font-semibold text-white">
                {mensagem}
              </p>

            </div>
          )}

          {/* BOTÃO */}
          <div className="flex justify-end pt-4">

            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition"
            >
              Cadastrar Motorista
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}