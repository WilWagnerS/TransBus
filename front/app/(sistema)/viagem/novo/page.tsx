"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

interface Motorista {
  id: number;
  nome: string;
  status: string;
}

interface Onibus {
  id: number;
  placa: string;
  modelo: string;
  capacidade: string;
  status: string;
}

export default function NovaViagem() {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");

  const [motorista, setMotorista] = useState("");
  const [onibus, setOnibus] = useState("");

  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [onibusList, setOnibusList] = useState<Onibus[]>([]);

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const respostaMotoristas = await fetch(
          "http://localhost:8080/motoristas"
        );

        const respostaOnibus = await fetch(
          "http://localhost:8080/onibus"
        );

        if (!respostaMotoristas.ok || !respostaOnibus.ok) {
          throw new Error("Erro ao buscar dados");
        }

        const dadosMotoristas = await respostaMotoristas.json();
        const dadosOnibus = await respostaOnibus.json();

        /*
         * O backend só aceita motorista com status EM_EXPEDIENTE.
         * Por isso mostramos somente esses motoristas.
         */
        setMotoristas(
          dadosMotoristas.filter(
            (item: Motorista) => item.status === "EM_EXPEDIENTE"
          )
        );

        /*
         * O backend só aceita ônibus com status GARAGEM.
         * Por isso mostramos somente esses ônibus.
         */
        setOnibusList(
          dadosOnibus.filter(
            (item: Onibus) => item.status === "GARAGEM"
          )
        );

      } catch (error) {
        console.error(error);
        setMensagem("Erro ao carregar motoristas e ônibus.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("");

    try {
      const response = await fetch(
        "http://localhost:8080/viagem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            origem,
            destino,
            horarioInicio,
            horarioFim,

            motorista: {
              id: Number(motorista),
            },

            onibus: {
              id: Number(onibus),
            },
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(
            "O motorista ou ônibus não está disponível para esta viagem."
          );
        }

        if (response.status === 404) {
          throw new Error(
            "Motorista ou ônibus não encontrado."
          );
        }

        throw new Error("Erro ao cadastrar viagem.");
      }

      setMensagem("Viagem cadastrada com sucesso!");

      setOrigem("");
      setDestino("");
      setHorarioInicio("");
      setHorarioFim("");
      setMotorista("");
      setOnibus("");

    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setMensagem(error.message);
      } else {
        setMensagem("Erro ao cadastrar viagem.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#020617] to-[#0d2872] p-6 md:p-10">

      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">

        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Cadastrar Viagem
        </h1>

        <Link
          href="/viagem"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm rounded-lg transition"
        >
          Voltar
        </Link>

      </div>

      {/* FORMULÁRIO */}
      <div className="mt-8 max-w-3xl bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-6">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ORIGEM */}
          <div className="flex flex-col space-y-2">

            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Origem
            </label>

            <input
              type="text"
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              placeholder="Ex: Terminal Central"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

          {/* DESTINO */}
          <div className="flex flex-col space-y-2">

            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Destino
            </label>

            <input
              type="text"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Ex: Bairro São Luiz"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

          {/* HORÁRIOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* INÍCIO */}
            <div className="flex flex-col space-y-2">

              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                Horário de início
              </label>

              <input
                type="datetime-local"
                value={horarioInicio}
                onChange={(e) => setHorarioInicio(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

            </div>

            {/* FIM */}
            <div className="flex flex-col space-y-2">

              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                Horário de fim
              </label>

              <input
                type="datetime-local"
                value={horarioFim}
                onChange={(e) => setHorarioFim(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

            </div>

          </div>

          {/* MOTORISTA */}
          <div className="flex flex-col space-y-2">

            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Motorista
            </label>

            <select
              value={motorista}
              onChange={(e) => setMotorista(e.target.value)}
              required
              disabled={carregando}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >

              <option value="">
                {carregando
                  ? "Carregando motoristas..."
                  : "Selecione um motorista"}
              </option>

              {motoristas.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}

            </select>

            {!carregando && motoristas.length === 0 && (
              <p className="text-sm text-orange-400">
                Nenhum motorista em expediente disponível.
              </p>
            )}

          </div>

          {/* ÔNIBUS */}
          <div className="flex flex-col space-y-2">

            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
              Ônibus
            </label>

            <select
              value={onibus}
              onChange={(e) => setOnibus(e.target.value)}
              required
              disabled={carregando}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >

              <option value="">
                {carregando
                  ? "Carregando ônibus..."
                  : "Selecione um ônibus"}
              </option>

              {onibusList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.modelo} - {item.placa}
                </option>
              ))}

            </select>

            {!carregando && onibusList.length === 0 && (
              <p className="text-sm text-orange-400">
                Nenhum ônibus disponível na garagem.
              </p>
            )}

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
              disabled={carregando}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition"
            >
              Cadastrar Viagem
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}