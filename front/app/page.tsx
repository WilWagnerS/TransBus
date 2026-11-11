import Link from "next/link";

// Ícones (SVG) dos valores
const valores = [
  {
    titulo: "Organização",
    icone: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
  },
  {
    titulo: "Eficiência",
    icone: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
  },
  {
    titulo: "Confiabilidade",
    icone: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
  },
  {
    titulo: "Segurança",
    icone: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
  },
  {
    titulo: "Desempenho",
    icone: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
  },
];

function Icone({ caminho, className }: { caminho: string; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d={caminho} />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-300 antialiased">

      {/* ===== CABEÇALHO (igual ao da área logada) ===== */}
      <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40 px-6 py-4">
        <div className="w-full flex items-center justify-between">
          <Link href="/" className="flex items-center shrink-0">
            <img src="/transbus-logo.svg" alt="TransBus Logo" className="h-10 w-auto object-contain" />
          </Link>
          <Link
            href="/login"
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg shadow-md shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            Login
          </Link>
        </div>
      </header>

      <main className="flex-1">

        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#020617] to-[#0d2872]">
          {/* Brilhos decorativos */}
          <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-24 w-[28rem] h-[28rem] rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36 text-center">
            {/* Marca TransBus (maior que a frase) */}
            <p className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
              Trans<span className="text-orange-500">Bus</span>
            </p>

            <h1 className="mt-6 text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Mais controle para sua{" "}
              <span className="text-orange-500">Frota!</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Centralize informações, gerencie e otimize em uma única plataforma confiável e segura.
            </p>
          </div>
        </section>

        {/* ===== QUEM SOMOS / NOSSA MISSÃO ===== */}
        <section className="bg-slate-950 py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl hover:border-orange-500/40 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                  <Icone className="w-6 h-6" caminho="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Quem Somos</h2>
              </div>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>O TransBus é um sistema criado para tornar a gestão de frotas de ônibus mais organizada e eficiente. A plataforma centraliza informações sobre veículos, motoristas e viagens, facilitando o controle da operação e contribuindo para um transporte de passageiros mais eficiente.</p>
                <p>Nosso objetivo é oferecer uma solução que simplifique a rotina de gestão, facilite a tomada de decisões e contribua para um transporte de passageiros mais eficiente.</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl hover:border-orange-500/40 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                  <Icone className="w-6 h-6" caminho="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Nossa Missão</h2>
              </div>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>A principal motivação do sistema é centralizar essas informações em uma única plataforma, facilitando o gerenciamento da frota e auxiliando na organização das operações.</p>
                <p>No futuro, buscamos evoluir para uma solução cada vez mais completa. O objetivo final é entregar ao cliente mais controle sobre ônibus, motoristas e viagens, contribuindo para melhores decisões e uma operação mais qualificada.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ===== NOSSOS VALORES ===== */}
        <section className="bg-gradient-to-r from-[#020617] to-[#0d2872] py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Nossos Valores</h2>
              <div className="mx-auto mt-4 w-16 h-1.5 rounded-full bg-orange-500" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {valores.map((valor) => (
                <div
                  key={valor.titulo}
                  className="group bg-slate-900 border border-slate-800 border-b-4 border-b-orange-500 rounded-xl px-4 py-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-orange-500/10 hover:shadow-2xl"
                >
                  <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <Icone className="w-7 h-7" caminho={valor.icone} />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-white">{valor.titulo}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ===== RODAPÉ ===== */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-3">
          Trans<span className="text-orange-500">Bus</span>
        </h2>
        <p className="text-sm text-slate-500">
          &copy; 2026 TransBus Gestão de Frota. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}