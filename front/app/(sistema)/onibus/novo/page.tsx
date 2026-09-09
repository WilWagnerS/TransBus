"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function NovoOnibus() {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("");

    try {
      const response = await fetch("http://localhost:8080/onibus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placa,
          modelo,
          capacidade,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar ônibus");
      }

      setMensagem("Ônibus cadastrado com sucesso!");

      setPlaca("");
      setModelo("");
      setCapacidade("");
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao cadastrar ônibus.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#020617] to-[#0d2872] p-6 md:p-10">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">

        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Cadastrar Ônibus
        </h1>

        <Link
          href="/onibus"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm rounded-lg transition"
        >
          Voltar
        </Link>

      </div>

      <div className="mt-8 max-w-3xl bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-6">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PLACA */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Placa
            </label>

            <input
              type="text"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              placeholder="Ex: ABC-1234"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* MODELO */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Modelo
            </label>

            <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              placeholder="Ex: Marcopolo Torino"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* CAPACIDADE */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Capacidade
            </label>

            <input
              type="text"
              value={capacidade}
              onChange={(e) => setCapacidade(e.target.value)}
              placeholder="Ex: 45 passageiros"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* MENSAGEM */}
          {mensagem && (
            <p className="text-sm font-semibold text-white">
              {mensagem}
            </p>
          )}

          {/* BOTÃO */}
          <div className="flex justify-end pt-4">

            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition"
            >
              Cadastrar Ônibus
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}