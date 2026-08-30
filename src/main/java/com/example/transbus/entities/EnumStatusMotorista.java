package com.example.transbus.entities;

public enum EnumStatusMotorista {
    FORA_DE_SERVICO, //Fora do horario de trabalho.
    EM_EXPEDIENTE, //Bateu o ponto para trabalhar.
    DIRIGINDO, //Esta em um onibus dirigindo.
    INTERVALO, //Esta na parada de 15 min de descanso para uma proxima viagem.
    INDISPONIVEL, //Esta de ferias, afastado, com atestado ou não pode realizar viagens temporariamente.(add campo de descrição quando colocar esta opção rodar).
    EXCLUIDO //Se o motorista for aposentado ou demitido um dia, colocar como excluido.
}
