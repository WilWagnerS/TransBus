package com.example.transbus.entities;

public enum EnumStatusOnibus {
    GARAGEM, //Está parado e disponível para uso.
    EM_SERVICO, //Está realizando uma viagem/rota.
    AVARIADO, //Apresentou um problema e não pode operar.
    EM_MANUTENCAO, //Está sendo consertado ou passando por manutenção.(add campo de descrição quando colocar esta opção rodar).
    EXCLUIDO //Se o onibus for aposentado um dia, colocar como excluido.
}
